import {testMakePerson} from './utils/makePerson';

testMakePerson();

let ai: {
    name: string;
    age: number;
    etc?: boolean;
} = {name: 'foo', age: 30};

// console.log(ai)

function printMe(me: {name: string, age: number, etc?: boolean}) {
    console.log(
        me.etc ?
            `${me.name} ${me.age} ${me.etc}` :
            `${me.name} ${me.age}`
    );
}

printMe(ai)

let person: object = {name: 'jack', age: 32};

console.log((<{name: string}> person).name);

console.log((person as object)['name']);

console.log(person['name'])