import { rangeGenerator } from './06-2_rangeGenerator';

let iterator = rangeGenerator(1, 3 + 1);

while (1) {
    const { value , done } = iterator.next();
    if (done) break;

    console.log(value);
}