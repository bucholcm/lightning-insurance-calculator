({
	handleCalc : function(component, event, helper) {
        const age = component.get("v.age");
        const ageRet = component.get("v.ageRet");
        const profit1 = component.get("v.profit");
        const amount1 = component.get("v.amount");
        const yearsToRet1 = ageRet - age;
        component.set("v.capital", amount1*yearsToRet1*12);
        var action = component.get("c.calculateRet");
        action.setParams({ yearsToRet: yearsToRet1, profit: profit1, amount: amount1 });
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var val = response.getReturnValue();
                component.set("v.result", Math.round(val));
                var inForm = component.find("inform");
                var resForm = component.find("resultForm");
                $A.util.toggleClass(inForm, "slds-hide");
                $A.util.toggleClass(resForm, "slds-hide");
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.error("Error message: " + errors[0].message);
                    }
                } else {
                    console.error("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
	},
    
    handleHelp : function(component, event, helper) {
        let helpElId = event.currentTarget.id.substr(0, event.currentTarget.id.lastIndexOf ('_'));
        let helpEl = component.find(helpElId);
        $A.util.toggleClass(helpEl, "slds-hide");
	},
    
    handleBack : function(component, event, helper) {
        var inForm = component.find("inform");
        var resForm = component.find("resultForm");
        $A.util.toggleClass(inForm, "slds-hide");
        $A.util.toggleClass(resForm, "slds-hide");
	}
})