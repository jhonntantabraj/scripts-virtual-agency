BEGIN
   IF NOT EXISTS (SELECT * FROM [db_virtualagency].[StatusFees] where StatusFeeId = 5)
   BEGIN
      insert into [db_virtualagency].[StatusFees] values(NEWID(), 'Cancelado', 'Descripcion cancelado', GETDATE());
      insert into [db_virtualagency].[StatusFees] values(NEWID(), 'Vigente', 'Descripcion cancelado', GETDATE());
      insert into [db_virtualagency].[StatusFees] values(NEWID(), 'Vencido', 'Descripcion cancelado', GETDATE());
      insert into [db_virtualagency].[StatusFees] values(NEWID(), 'Reprogramado', 'Descripcion cancelado', GETDATE());
   END
END
ALTER TABLE [db_virtualagency].[CreditFeeInfo] ADD TotalFeesDefeated int NULL;


