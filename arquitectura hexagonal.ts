/* 

  adapters
  controller     ->      application          ->           domain

  persistencia (database)

*/

/* Principio de inversión de dependencia */
/* --------------------------------------------------------------------adaptadores */
class Controller {
    private llamada?: ILlamada;
    constructor(servicio: Servicio) {
        this.llamada = servicio;
    }

    get() {
        this.llamada?.llamando();
    }
}

/* --------------------------------------------------------------------application */

//ports (in)
interface ILlamada {
    llamando(): any;
}

//podemos ejecutar también la logica de negocio
//@Injectable()
class Servicio implements ILlamada {
    //Servicio : para arquitectura hexagonal
    //Servicio: servir y ejecutar la logica de negocio
    private ILlamdaBaseDeDatos?: ILlamdaBaseDeDatos;

    constructor(BaseDeDatos: BaseDeDatos) {
        this.ILlamdaBaseDeDatos = BaseDeDatos;
    }
    llamando(): any {
        const llamadaAlaDBejecutada: any = this.ILlamdaBaseDeDatos?.llamandoBaseDeDatos();
        //ejecutando logica de negocio
        /* 
          25 lineas
        */
        const domain = new LogicaDeNegocio(llamadaAlaDBejecutada.accountId, llamadaAlaDBejecutada.amountMoney); //podriamos no usar la capa de dominio para ejecutar la logicia de negocio

        return domain.transferenciaDeDinero();
    }
}

/* --------------------------------------------------------------------domain */
//LogicaDeNegocio: contener la logica de negocio
class LogicaDeNegocio {
    constructor(accountId: number, amountMoney: number) {}

    transferenciaDeDinero() {
        //logica de negocio(CMAC)
        /* 
      25 lineas
    */
    }
}

/* --------------------------------------------------------------------persistencia */
//ports (out)
interface ILlamdaBaseDeDatos {
    llamandoBaseDeDatos(): any;
}

class BaseDeDatos implements ILlamdaBaseDeDatos {
    llamandoBaseDeDatos(): any {}
}
