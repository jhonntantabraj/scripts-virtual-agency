import { Service } from 'typedi';
const fs = require('fs');

@Service()
export class FileSystemService {
    private nameFile = 'creditPaymentFees.sql';
    appendContentInFile(content: string) {
        fs.appendFileSync(this.nameFile, content);
    }
}
