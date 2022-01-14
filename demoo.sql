ALTER PROCEDURE [db_virtualagency].[spGetDetailCredits](
	@CustomerGUID as uniqueidentifier
)
as
begin
    IF OBJECT_ID('TEMPDB..#TotCred') IS NOT NULL
    DROP TABLE #TotCred
    select cr.CustomerId
    ,cr.CreditId
    INTO #TotCred
    from [db_virtualagency].[Customers] cu
    inner join [db_virtualagency].[Credits] cr on cr.CustomerId = cu.CustomerId
    where cu.CustomerGUID = @CustomerGUID
    create clustered index ix_totcred on #TotCred (CreditId)
--Obteniendo las cuotas pagadas de todos los créditos
    IF OBJECT_ID('TEMPDB..#TotFee') IS NOT NULL
    DROP TABLE #TotFee 
    select cpy.CreditId, TotFin=rtrim(ltrim(str(sum(Pay)))) + '/' + rtrim(ltrim(str(sum(TotFee))))--, TotPay= sum(Pay), TotFee=sum(TotFee)
    INTO #TotFee
    from (
    select cpy.CreditId, Pay= case when cpy.StatusFeeId=1 then count(1) else 0 end, TotFee=count(1)
    from [db_virtualagency].[CreditPaymentFees] cpy
    inner join [db_virtualagency].[Credits] cr ON cpy.CreditId = cr.CreditId
    inner join #TotCred tc ON tc.CreditId=cr.CreditId
-- where cr.CreditGUID = '8E22850A-B667-4C68-98C8-C7D21D9D89B4'--@CreditGUID
group by cpy.CreditId,cpy.StatusFeeId
) cpy
group by cpy.CreditId
create clustered index ix_totfee on #TotFee (CreditId)
select
  cr.CreditGUID
 ,cr.CreditNumber
 ,cr.ProductName
 ,FORMAT(cr.Amount,'#,000.00') as AmountCredit
 ,cr.Currency
 ,cr.InterestRate
 ,cr.Period
 ,FORMAT(cr.Balance,'#,000.00') as Balance
 ,cr.StartDate
 ,cr.EndDate
 ,tf.TotFin
from  [db_virtualagency].[Credits] cr
inner join #TotFee tf on cr.CreditId=tf.CreditId

END;