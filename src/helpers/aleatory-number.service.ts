import { Service } from 'typedi';

@Service()
export class GeneratorNumberService {
    aleatory(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    withoutHundreds(min: number, max: number) {
        let aleatoryNumber = this.aleatory(min, max);
        let hundreds = aleatoryNumber % 1000;
        return aleatoryNumber - hundreds;
    }
}
