function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const rndInt = randomIntFromInterval(900000000, 999999999);
console.log(rndInt);
