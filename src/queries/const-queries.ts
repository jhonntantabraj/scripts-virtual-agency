export const queryTypes = [
    `insert into [db_virtualagency].[QueryTypes] values(NEWID(), 'Cronograma y pagos', 'Cronograma y pago de créditos', 1);\n`,
    `insert into [db_virtualagency].[QueryTypes] values(NEWID(), 'Crédito para clientes', 'Crédito para clientes de CMAC', 1);\n`,
    `insert into [db_virtualagency].[QueryTypes] values(NEWID(), 'Crédito para NO clientes', 'Crédito para NO clientes de CMAC', 1);\n`,
    `insert into [db_virtualagency].[QueryTypes] values(NEWID(), 'Preguntas directas', 'Otras operaciones', 1);\n`,
];

export const statusFees = [
    `insert into [db_virtualagency].[StatusFees] values(NEWID(), 'Cancelado', 'Descripcion cancelado', GETDATE());\n`,
    `insert into [db_virtualagency].[StatusFees] values(NEWID(), 'Vigente', 'Descripcion cancelado', GETDATE());\n`,
    `insert into [db_virtualagency].[StatusFees] values(NEWID(), 'Vencido', 'Descripcion cancelado', GETDATE());\n`,
    `insert into [db_virtualagency].[StatusFees] values(NEWID(), 'Reprogramado', 'Descripcion cancelado', GETDATE());\n`,
];
