function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const rndInt = randomIntFromInterval(900000000, 999999999);
console.log(rndInt);

const num = 1234214.2342;
const result = num - 12344;
result;
