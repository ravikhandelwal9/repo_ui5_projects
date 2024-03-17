sap.ui.define([
    'wp/fin/payroll/controller/BaseController',
    "sap/ui/core/routing/History"
], function(baseController, history) {
    'use strict';
    return baseController.extend("wp.fin.payroll.controller.Supplier",{

    onInit:function(){
        this.oRouter=this.getOwnerComponent().getRouter();
        this.oRouter.getRoute("supplier").attachMatched(this.bindData,this);
    },

    goBack:function(){

        const oHistory = history.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
            window.history.go(-1);
        } else {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("home", {}, true);
        }
    },

    bindData:function(oRouter){
        var idIndex = oRouter.getParameter("arguments").idIndex;
        var sPath = "/supplier/" + idIndex;
        this.getView().bindElement(sPath);
        // var sSpecialtyPath = "/supplier/" + idIndex + '/specialty/';
        // this.getView().byId("idSpeciality").bindElement(this.getView().getBindingContext().sPath + '/specialty/')
        // this.getView().byId("idSpeciality").bindElement(sSpecialtyPath);
        // this.getView().byId("idSpeciality").bindData(sSpecialtyPath);
    },
    })
});