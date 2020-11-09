const { NodeSSH }   = require('node-ssh');
const mysql         = require('mysql2');
const cron          = require('node-cron');

// var connection = mysql.createConnection({
//     host: '220.230.114.96',
//     user: 'a2n9soft',
//     port: '3306',
//     password: '2n9soft',
//     database: 'trk_admin'
// });

// connection.connect(function(err) {
//     if (err) {
//         console.error('mysql connection error : ' + err);
//     } else {
//         console.info('mysql connection successfully');
//     }
// });

// var sql = ` SELECT * FROM trk_e/xcel_rpt WHERE ingFlag = 'Y' AND rptStr REGEXP '1629|1646' AND cusNum != '14413' AND loggerId != '18669' AND cusNum != '35338' AND cusNum != '101875'`;
// connection.query(sql, function(error, results, fields) {
//     // if (error) throw error;
//     console.log(results);
// });

// connection.end();


const ssh = new NodeSSH()
console.log('ssh 생성');

console.log('cron schedule 시작');
cron.schedule('0 0 8 1 * 1', () => {
    ssh.connect({
        host: '210.89.189.75',
        username: 'a2n9soft',
        port: 22,
        password: 'qoxmAos$CTS)!',
        tryKeyboard: true
    }).then(function () {
        ssh.execCommand('ps -ef|grep php', { }).then(async function (result) {
            var grep = result.stdout;

            if (!grep.includes('cronDaily_cts.sh')) {
                await ssh.execCommand('/bin/bash /home/a2n9soft/www/html/excelreport/cronDaily_cts.sh', { }).then(function (result) {
                    console.log('결과 : ' + result.stdout);
                    console.log('에러 : ' + result.stderr);
                });
            }

            if (!grep.includes('cronDaily_lezhin.sh')) {
                await ssh.execCommand('/bin/bash /home/a2n9soft/www/html/excelreport/cronDaily_lezhin.sh', { }).then(function (result) {
                    console.log('결과 : ' + result.stdout);
                    console.log('에러 : ' + result.stderr);
                });
            }

            ssh.dispose();
        });
    });
});
