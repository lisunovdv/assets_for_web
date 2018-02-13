//Git.direct('diff --cached --unified=0', {cwd:'./'})

const { exec  } = require('child_process');

//exec('git diff --cached --name-only', (error, stdout, stderr) => {
exec('git diff --cached --unified=0', (error, stdout, stderr) => {
//exec('git diff --cached --stat ./package.json', (error, stdout, stderr) => {
//exec('git diff --shortstat', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});


// git diff --cached ./package.json	
