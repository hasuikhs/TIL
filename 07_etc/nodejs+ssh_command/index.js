const { NodeSSH } = require('node-ssh');
const mysql = require('mysql2');
const cron = require('node-cron');
const { Builder, By, Key, until } = require('selenium-webdriver');

var connection = mysql.createConnection({
    host: '220.230.114.96',
    user: '2n9soft',
    port: '3306',
    password: '2n9soft',
    database: 'trk_admin'
});

console.log('cron schedule 시작');
cron.schedule('0 0 8 1 * 1', () => {

    var lezhinResult = getLezhinResult();

    while (!lezhinResult) {

        connection.connect(function (err) {
            if (err) {
                console.error('mysql connection error : ' + err);
            } else {
                console.info('mysql connection successfully');
            }
        });

        var sql1 = `SELECT * FROM trk_excel_rpt WHERE ingFlag = 'Y' AND rptStr REGEXP '1629|1646' AND cusNum != '14413' AND loggerId != '18669' AND cusNum != '35338'`;

        var sql2 = sql1 + ` AND cusNum != '101875'`;

        var cusNum, loggerId, idx;

        executeQuery(sql1);
        executeQuery(sql2);

        connection.end();

        const ssh = new NodeSSH()
        console.log('ssh 생성');

        ssh.connect({
            host: '210.89.189.75',
            username: 'a2n9soft',
            port: 22,
            password: 'qoxmAos$CTS)!',
            tryKeyboard: true
        }).then(function () {
            ssh.execCommand('ps -ef|grep php', {}).then(async function (result) {
                var grep = result.stdout;

                if (!grep.includes('cronDaily_cts.sh')) {
                    await ssh.execCommand('/bin/bash /home/a2n9soft/www/html/excelreport/cronDaily_cts.sh', {}).then(function (result) {
                        console.log('결과 : ' + result.stdout);
                        console.log('에러 : ' + result.stderr);
                    });
                }

                if (!grep.includes('cronDaily_lezhin.sh')) {
                    await ssh.execCommand('/bin/bash /home/a2n9soft/www/html/excelreport/cronDaily_lezhin.sh', {}).then(function (result) {
                        console.log('결과 : ' + result.stdout);
                        console.log('에러 : ' + result.stderr);
                    });
                }

                ssh.dispose();
            });
        });

        // 확인
        lezhinResult = getLezhinResult();
    }
});

async function getLezhinResult() {

    //Chromedriver DevToolsActivePort file doesn't exist 해결 -->
    const chrome    = require('selenium-webdriver/chrome');
    const options   = new chrome.Options();

    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disabled-dev-shm-usage');
    // <--

    let driver = await new Builder().forBrowser('chrome').build();

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1;
    var day = date.getDate();

    var today = year + '' + month + '' + day;

    await driver.get('https://ncpej.logger.co.kr/login/login.tsp');
    await driver.findElement(By.name('cusId')).sendKeys('khasui', Key.RETURN);
    await driver.findElement(By.name('password')).sendKeys('198281', Key.RETURN);
    await driver.findElement(By.name('sdate')).sendKeys(today, Key.RETURN);
    
    await driver.switchTo().alert().accept();

    await driver.get('https://ncpej.logger.co.kr/admUserN/userExcelRptList.tsp');
    await driver.findElement(By.css('body > div.contents > form > input[type=text]:nth-child(2)')).sendKeys('레진', Key.RETURN);
    var status = await driver.findElement(By.css('body > div.contents > table > tbody > tr:nth-child(2) > td:nth-child(8)')).getText();

    await driver.close();

    if (status.length == 0) {
        return true;
    } else {
        return false;
    }
}

function executeQuery(query) {
    connection.query(query, async function (error, results) {
        if (error) throw error;

        if (results.length > 0) {
            cusNum = await results[0].cusNum;
            loggerId = await results[0].loggerId;
            idx = await results[0].idx;
            await updateQuery();
        } else {
            console.log('결과 없음')
        }
    })
}

function updateQuery() {
    var updateSql = `UPDATE trk_excel_rpt SET ingFlag = 'N' WHERE cusNum = '${cusNum}' AND loggerId = '${loggerId}' AND idx = ${idx}`;

    console.log(updateSql)
    connection.query(updateSql);
}
