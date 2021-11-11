CREATE TABLE [db_virtualagency].[Customers] (
  [CustomerId] uniqueidentifier NOT NULL,
  [CustomerCode] varchar(18) NOT NULL,
  [Name] varchar(50) NULL,
  [Lastname] varchar(50) NULL,
  [BusinessName] varchar(50) NULL,
  [DocumentType] varchar(30) NOT NULL,
  [DocumentNumber] varchar(11) NOT NULL,
  [Phone] varchar(11)  NOT NULL,
  [Email] varchar(50) NOT NULL,
  [Gender] char(10) NULL,
  [Agency] varchar(50) NOT NULL,
  [CreatedBy] varchar(50) NOT NULL,
  [CreatedAt] datetime  NOT NULL,
  PRIMARY KEY ([CustomerId])
);

CREATE TABLE [db_virtualagency].[Credits] (
  [CreditId] uniqueidentifier NOT NULL, 
  [CustomerId] uniqueidentifier NOT NULL,
  [CreditNumber] varchar(50) NOT NULL,
  [ProductName] varchar(50) NOT NULL,
  [Amount] decimal(18,2) NOT NULL,
  [Currency] varchar(20) NOT NULL,
  [InterestRate] decimal(5,2) NOT NULL,
  [Period] int NOT NULL,
  [StartDate] datetime,
  [EndDate] datetime,
  [Status] varchar(30) NOT NULL,
  [CreatedAt] datetime  NOT NULL,
  PRIMARY KEY ([CreditId]),
  CONSTRAINT [fk_Credits_Customers] FOREIGN KEY ([CustomerId]) REFERENCES [db_virtualagency].[Customers] ([CustomerId]),
);

CREATE TABLE [db_virtualagency].[CreditPaymentFees] (
  [CreditPaymentFeeId] uniqueidentifier NOT NULL, 
  [CreditId] uniqueidentifier NOT NULL,
  [Amount] decimal(10, 2)  NOT NULL,
  [ExpiryDate] datetime NOT NULL,
  [Status] varchar(30) NULL,
  [CreatedAt] datetime  NOT NULL,
  PRIMARY KEY ([CreditPaymentFeeId]),
  CONSTRAINT [fk_CreditPaymentFees_Credits] FOREIGN KEY ([CreditId]) REFERENCES [db_virtualagency].[Credits] ([CreditId]),
);