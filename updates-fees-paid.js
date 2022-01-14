const fs = require('fs');

class UpdateFeesPaid {
  nameFile = 'records creditFeesConfig.sql';

  executeScript(){
    let totalFees, paymentFee, feesDefeated
    for(let x = 61; x <= 100000; x++){
      totalFees = this.totaFeesAleatory(3, 5)
      paymentFee = this.aleatoryPaymentFee(500, 2500)
      feesDefeated = this.totaFeesAleatory(0, 2)
      const queryBuild = this.updateTotalFeesPaid(totalFees, x, paymentFee, feesDefeated)
      this.appendContentInFile(queryBuild)
    }
  }
  appendContentInFile(content) {
    fs.appendFileSync(this.nameFile, content);
  }
  updateTotalFeesPaid (totalFeesPaid, creditId, amountPaymentFee, amountfeesDefeated){
    //const query1 = `update [db_virtualagency].[Credits] set TotalFeesPaid = ${totalFeesPaid} where CreditId = ${creditId};\n`
    const query2 = `INSERT INTO [db_virtualagency].[CreditFeeInfo] VALUES(${creditId}, ${totalFeesPaid}, ${amountfeesDefeated}, ${amountPaymentFee}, 'Soles');\n`
    return query2
  }
  totaFeesAleatory(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
  }
  aleatoryPaymentFee(min, max) {
    const amountFee = Math.floor(Math.random() * (max - min + 1) + min);
    return amountFee;
  }
}

const eesPaid  = new UpdateFeesPaid()
eesPaid.executeScript()

