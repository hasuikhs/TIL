const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

(async function () {
  const __dirname = path.resolve();
  const dirObj = {
    client: `${__dirname}/client`,
    server: __dirname
  }

  for (let [dirName, dir] of Object.entries(dirObj)) {
    await checkDir(dirName, dir);
  }

  executeCommand(__dirname, 'npm start');
})();

function checkDir(dirName, tgtDir) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(`${tgtDir}/node_modules`)) {
      console.log(`Exist node_modules in ${dirName} directory.`);
      resolve();
    } else {
      console.log(`Not exist node_modules in ${dirName} directory.`);
      executeCommand(tgtDir, 'npm i', `End creating node_modules in ${dirName} directory.`, resolve);
    }
  });
}

function executeCommand(tgtDir, command, message = undefined, resolve = undefined) {
  let process = spawn('bash', {cwd: tgtDir});

  process.stdin.write(command);
  process.stdin.end();
  
  if (message) {
    process.on('close', code => {
      console.log(message);
      if (resolve) resolve();
    });
  }
}