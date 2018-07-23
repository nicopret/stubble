const arrayLike = { length: 1, 0: 'a', 1: 'b' };

for (const x of Object.values(arrayLike)) {
//    console.log(x);
}

const arr = Array.from(arrayLike);
for (const x of arr) {
    console.log(x);
}

console.log(-0 === +0);
console.log(NaN === NaN);

function* objectEntries(obj) {
    const propKeys = Reflect.ownKeys(obj);

    for (const propKey of propKeys) {
        yield[propKey, obj[propKey]];
    }
}

const jane = { first: 'Jane', last: 'Doe'};
for (const [key, value] of objectEntries(jane)) {
    console.log(`${key}: ${value}`);
}