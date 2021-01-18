const { NodeSSH } = require('node-ssh');
const mysql = require('mysql2');
const { Builder, By, Key, until } = require('selenium-webdriver');

const nodemailer = require('nodemailer');
const smtpTrans = require('nodemailer-smtp-transport');

require('dotenv').config();

var startdt = new Date();
var startyear = startdt.getFullYear();
var startmonth = startdt.getMonth() + 1 < 10 ? '0' + (startdt.getMonth() + 1) : startdt.getMonth() + 1;
var startday = startdt.getDate() < 10 ? '0' + startdt.getDate() : startdt.getDate();
var starthour = startdt.getHours() < 10 ? '0' + startdt.getHours() : startdt.getHours();
var startmin = startdt.getMinutes() < 10 ? '0' + startdt.getMinutes() : startdt.getMinutes();
var startsec = startdt.getSeconds() < 10 ? '0' + startdt.getSeconds() : startdt.getSeconds();

var updateResult1, updateResult2;

var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: '3306',
    password: process.env.MYSQL_PASS,
    database: 'trk_admin'
});

getLezhinResult().then(async () => {

    var cusNum, loggerId, idx;

    var sql1 = `SELECT * FROM trk_excel_rpt WHERE ingFlag = 'Y' AND rptStr REGEXP '1629|1646' AND cusNum != '14413' AND loggerId != '18669' AND cusNum != '35338'`;

    var sql2 = sql1 + ` AND cusNum != '101875'`;

    var updateSql = `UPDATE trk_excel_rpt SET ingFlag = 'N' WHERE cusNum = ? AND loggerId = ? AND idx = ? LIMIT 1`;

    var [rows, fields] = await connection.promise().query(sql1);
    if (rows.length > 0) {
        console.log(`Select sql1 result exist`);
        cusNum = rows[0]['cusNum'];
        loggerId = rows[0]['loggerId'];
        idx = rows[0]['idx'];

        console.log(`update query...`);
        updateResult1 = await connection.promise().query(updateSql, [cusNum, loggerId, idx]);
        updateResult1 = updateResult1[0]['info'];
    }

    [rows, fields] = await connection.promise().query(sql2);
    if (rows.length > 0) {
        console.log(`Select sql2 result exist`);
        cusNum = rows[0]['cusNum'];
        loggerId = rows[0]['loggerId'];
        idx = rows[0]['idx'];

        console.log(`update query...`);
        updateResult2= await connection.promise().query(updateSql, [cusNum, loggerId, idx]);
        updateResult2 = updateResult2[0]['info'];
    }

    connection.end();
}).then(() => {

    const ssh = new NodeSSH()
    console.log('ssh 생성');

    ssh.connect({
        host: process.env.CTS_HOST,
        username: process.env.CTS_USER,
        port: 22,
        password: process.env.CTS_PASS,
        tryKeyboard: true
    }).then(() => {
        console.log('ssh connect...');
        ssh.execCommand('ps -ef|grep php', {}).then(async (result) => {
            var grep = result.stdout;

            if (!grep.includes('cronDaily_cts.sh')) {
                console.log('cronDaily_cts command execute...');
                await ssh.execCommand('/bin/bash /home/a2n9soft/www/html/excelreport/cronDaily_cts.sh', {}).then(result => {
                    console.log('cronDaily_cts result : ' + result.stdout);
                    console.log('cronDaily_cts error : ' + result.stderr);
                });
            }

            if (!grep.includes('cronDaily_lezhin.sh')) {
                console.log('cronDaily_lezhin command execute...');
                await ssh.execCommand('/bin/bash /home/a2n9soft/www/html/excelreport/cronDaily_lezhin.sh', {}).then(result => {
                    console.log('cronDaily_lezhin result : ' + result.stdout);
                    console.log('cronDaily_lezhin error : ' + result.stderr);
                });
            }
        }).then(() => {
            console.log('ssh connections end...');
            ssh.dispose();
        }).then(() => {

            getLezhinResult().then(result => {
                var startdate = startyear + '-' + startmonth + '-' + startday + ' ' + starthour + ':' + startmin + ':' + startsec;

                var finishdt = new Date();
                var finishyear = finishdt.getFullYear();
                var finishmonth = finishdt.getMonth() + 1 < 10 ? '0' + (finishdt.getMonth() + 1) : finishdt.getMonth() + 1;
                var finishday = finishdt.getDate() < 10 ? '0' + finishdt.getDate() : finishdt.getDate();
                var finishhour = finishdt.getHours() < 10 ? '0' + finishdt.getHours() : finishdt.getHours();
                var finishmin = finishdt.getMinutes() < 10 ? '0' + finishdt.getMinutes() : finishdt.getMinutes();
                var finishsec = finishdt.getSeconds() < 10 ? '0' + finishdt.getSeconds() : finishdt.getSeconds();
                var finishdate = finishyear + '-' + finishmonth + '-' + finishday + ' ' + finishhour + ':' + finishmin + ':' + finishsec;

                if (result == true) {
                    console.log('생성 완료');

                    sendMail(startdate, finishdate, true);
                } else {
                    console.log('생성 실패');
                    sendMail(startdate, finishdate, false);
                }
            });
        });
    });
});

/*
 * functions
*/
async function getLezhinResult() {

    //Chromedriver DevToolsActivePort file doesn't exist 해결 -->
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();

    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disabled-dev-shm-usage');
    // <--

    let driver = await new Builder().forBrowser('chrome').build();

    var date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    var today = year + '' + month + '' + day;

    await driver.get('https://ncpej.logger.co.kr/login/login.tsp');
    await driver.findElement(By.name('cusId')).sendKeys(process.env.LOGGER_USER, Key.RETURN);
    await driver.findElement(By.name('password')).sendKeys(process.env.LOGGER_PASS, Key.RETURN);
    await driver.findElement(By.name('sdate')).sendKeys(today, Key.RETURN);

    await driver.switchTo().alert().accept();

    await driver.get('https://ncpej.logger.co.kr/admUserN/userExcelRptList.tsp');
    await driver.findElement(By.css('body > div.contents > form > input[type=text]:nth-child(2)')).sendKeys('레진', Key.RETURN);
    var status = await driver.findElement(By.css('body > div.contents > table > tbody > tr:nth-child(2) > td:nth-child(8)')).getText();

    await driver.close();

    console.log(status.length)
    if (status.length == 0) {
        return false;
    } else {
        return true;
    }
}

function sendMail(startdate, finishdate, status) {

    var mailTitle;
    var mailText;
    if (status) {
        mailTitle = '[CTS01_CRON ' + finishdate + '] SOLVED ERROR SUCCESS';
        mailText = `레진 통합 리포트 생성 확인 완료\n 
                        시작 시간 : ${ startdate }\n
                        종료 시간 : ${ finishdate }`;
    } else {
        mailTitle = '[CTS01_CRON ' + finishdate + '] SOLVED ERROR FAIL';
        mailText = '레진 통합 리포트 생성 실패 수동 확인 바람';
    }

    var transporter = nodemailer.createTransport(smtpTrans({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }));

    var mailOptions = {
        from: 'khasui@bizspring.co.kr',
        to: 'khasui@bizspring.co.kr, wonjin@bizspring.co.kr, jiseon@bizspring.co.kr',
        subject: mailTitle,
        text: mailText
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log('mail sent!')
        }
    });
}