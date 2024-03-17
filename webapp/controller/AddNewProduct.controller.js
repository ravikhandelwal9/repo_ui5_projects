sap.ui.define([
    'wp/fin/payroll/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/model/json/JSONModel'
], function(BaseController,MessageBox,MessageToast,JsonModel) {
    'use strict';
    return BaseController.extend("wp.fin.payroll.controller.AddNewProduct",{

    onInit:function(){
        this.oJsonModel = new JsonModel();
        var jsonPayload={
            "ekkoExt":{
            "Ebeln": "1119",
            "Land": "US"
        }};
        this.oJsonModel.setData(jsonPayload);
        this.getView().setModel(this.oJsonModel,"ekkoExtModel");
    },

    onSave:function(){

        // var oOdatamodel = this.getView().getParent().getModel();
        var oOdatamodel = this.getOwnerComponent().getModel();
        var reqPayload = this.oJsonModel.getProperty("/ekkoExt");
        oOdatamodel.create("/EkkoExtensionSet", reqPayload, {
            success:function(oEvent){ MessageToast.show("Data Saved"); },
            error:function(oEvent){}
            })

    },
    onClear:function(){

    }
    })
});