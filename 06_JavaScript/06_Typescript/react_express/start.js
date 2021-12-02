import fs from 'fs';
import path, { dirname } from 'path';
import { spawn } from 'child_process';

(async function () {
  const __dirname = path.resolve();
  const dirs = [__dirname, `${__dirname}/client`, `${__dirname}/server`];

  for await (let dir of dirs) {
    console.log('--------------------------------')
    await checkDir(dir);
  }
  
  let process = spawn('bash', {cwd: __dirname});
  process.stdin.write(`npm start`);
  process.stdin.end();
})();

function checkDir(tgtDir) {
  console.log(tgtDir)
  return new Promise((resolve, reject) => {
    if (fs.existsSync(`${tgtDir}/node_modules`)) {
      console.log(`Exist ${tgtDir}/node_modules directory.`);
      resolve();
    } else {
      console.log(`Not exist ${tgtDir}/node_modules directory.`);

      let process = spawn('bash', {cwd: tgtDir});

      process.stdin.write(`npm i`);
      process.stdin.end();
      process.on('close', (code) => {
        console.log(`End creating node_moduels directory: ${tgtDir}`);
        resolve();
      });
    }
  });
}