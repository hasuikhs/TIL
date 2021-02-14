import { readFile } from 'fs';

readFile('../package.json', (err: Error | null, buffer: Buffer) => {
    if (err) throw err;
    else {
        const content: string = buffer.toString();
        console.log(content);
    }
});

console.log('this is async');