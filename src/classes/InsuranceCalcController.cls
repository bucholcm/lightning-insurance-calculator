global with sharing class InsuranceCalcController {

    @AuraEnabled
    global static Decimal calculateRet(Decimal yearsToRet, Decimal profit, Decimal amount) {
        Double p = profit/100/12;
        Integer t = yearsToRet.intValue()*12;
        Double res = amount*(Math.pow(1 + p, t) - 1)/p;
        return res;
    }
}