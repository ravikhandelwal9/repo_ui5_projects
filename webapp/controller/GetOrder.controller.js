sap.ui.define([
    'wp/fin/payroll/controller/BaseController',
    'sap/m/MessageToast',
    'sap/ui/model/Filter',
    'sap/ui/model/json/JSONModel'
], function(baseController,MessageToast,filter,JsonModel) {
    'use strict';
    return baseController.extend("wp.fin.payroll.controller.GetOrder",{

        onInit:function(){

            var jsonCommon={
                "Vbeln": "0000013051",
                "Erdat": "",
                "Ernam": "default",
                "Audat": "",
                "Auart": "",
                "Netwr": "",
                "Waerk": "",
                "Vkorg":"def"
            };

            // Single Order Model
            var jsonPayloadSingle={
                "orderData":jsonCommon
            };
            this.oJsonModelSingle = new JsonModel();
            this.oJsonModelSingle.setData(jsonPayloadSingle);
            this.getView().setModel(this.oJsonModelSingle,"OrderSingle");

            // Table Order Model
            var jsonPayloadTable={
                "orderDataMultiple":{
                    "records":[jsonCommon]
                }
            }
            this.oJsonModelTable = new JsonModel();
            this.oJsonModelTable.setData(jsonPayloadTable);
            this.getView().setModel(this.oJsonModelTable,"OrderTab");
        },

        onGetOrder:function(){
            var that = this;
            var order = this.getView().byId("idOrder").getValue();
            var oDataModel = this.getOwnerComponent().getModel();
            var ofilter=new filter("Vbeln","EQ",order);

            oDataModel.read("/OrderHeaderSet('" + order + "')", { 
                // filters: [ ofilter ], //For Filters
                success:function(oData,response){

                    // that.oJsonModel.setProperty("/orderData",oData.results[0]); for Filters
                    that.oJsonModelSingle.setProperty("/orderData",oData); //for Key search
                    // that.getView().getModel("OrderModel").setProperty("/orderData",oEvent);

                    // that.oJsonModel.setData(oEvent);
                    // that.oJsonModel.setJSON(oEvent);
                    // that.getView().setModel(that.oJsonModel,"OrdData");
                },
                error:function(oEvent){}
            })
        },

        onItemPress:function(oEvent){
            MessageToast.show("Pressed");
        },
        getUserOrders:function(user){
            var that = this;
            // MessageToast.show(oEvent.getParameter("value"));
            var oDataModel = this.getOwnerComponent().getModel();
            var ofilter = new filter("Ernam","EQ",user)

            oDataModel.read("/OrderHeaderSet",{
                filters:[ofilter],
                success:function(oData, response){

                    // that.ojsonM1 = new JsonModel();
                    // that.ojsonM1.setData(oData.results);
                    // that.getView().setModel(that.ojsonM1,"OrderTab");
                    that.oJsonModelTable.setProperty("/orderDataMultiple/records",oData.results);
                },
                error:function(oEvent){}
            })
        },
        onErnamPress:function(oEvent){
            var value = oEvent.getParameter("value");
            if(!value)
            {value = this.getView().byId("idErnam").getValue();}
            this.getUserOrders(value);

        },
        onUserPress:function(oEvent){
            this.getUserOrders(this.getView().byId("idUser").getValue());
        },
    })
});