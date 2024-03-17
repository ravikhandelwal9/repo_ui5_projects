sap.ui.define([
    'sap/ui/core/UIComponent'
], function(oUiController) {
    'use strict';
    return oUiController.extend("wp.fin.payroll.Component",{
        metadata:{
            manifest:"json"
        },
//Added Comment
        init:function(){
            oUiController.prototype.init.apply(this);
            var oRouter = this.getRouter();
            oRouter.initialize();
        },

    });
    
});