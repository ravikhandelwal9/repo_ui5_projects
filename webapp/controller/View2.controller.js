sap.ui.define([
    'wp/fin/payroll/controller/BaseController',
    'sap/ui/model/FilterOperator',
    'sap/ui/model/Filter',
    "sap/ui/core/routing/History"
], function(baseController,FilterOperator,Filter, History) {
    'use strict';
    return baseController.extend("wp.fin.payroll.controller.View2",{

        onInit:function(){
            this.oRouter = this.getOwnerComponent().getRouter();
        },

        goNext:function(index){
            //this.getView().getParent().to("idView1");
            //this.getView().getParent().getParent().toDetail("idView1");
            //
            //this.getOwnerComponent().getRouter().
            this.oRouter.navTo("ordDetails",{
                idFruit:index
            })

            // const oHistory = History.getInstance();
            // const sPreviousHash = oHistory.getPreviousHash();

            // if (sPreviousHash !== undefined) {
            //     window.history.go(-1);
            // } else {
            //     const oRouter = this.getOwnerComponent().getRouter();
            //     oRouter.navTo("home", {}, true);
            // }
        },

        onDeleteSelected:function(oEvent){
            var oListselected = this.getView().byId("idFruitsList").getSelectedItems();
            for (let index = 0; index < oListselected.length; index++) {
                this.getView().byId("idFruitsList").removeItem(oListselected[index]);
            }
        },
        onItemPress:function(oEvent){
            //oEvent.getSource();
            //var oSelectedItem = this.getView().byId("idFruitsList").getSelectedItem();
            //Source
            var oSelectedItem = oEvent.getParameter("listItem").getBindingContextPath();
            //Target
            //WorkList Page Layout
            //var oView1 = this.getView().getParent().getPages()[1];
            //Master-Details Page Layout
            var index = oSelectedItem.split("/")[oSelectedItem.split("/").length - 1];
            this.goNext(index);

            // var oView1 = this.getView().getParent().getParent().getDetailPages()[1];
            // //Bind Target Element to Source's
            // oView1.bindElement(oSelectedItem);
            // //this.getView().getParent().to(oView1);
            // this.getView().getParent().getParent().toDetail(oView1);
        },
        onSearch:function(oEvent){
            var qryString = oEvent.getParameter("query");
            if (!qryString)
            {var qryString = oEvent.getParameter("newValue");}
            console.log(qryString);

            var oFilter1=new Filter("Vbeln",FilterOperator.Contains,qryString);
            // var oFilter2=new Filter("Ernam",FilterOperator.Contains,qryString);

            // var oFilter = new Filter({filters:[oFilter1, oFilter2], and:false});
            var oBinding = this.getView().byId("idFruitsList").getBinding("items");
            oBinding.filter(oFilter1);

        },
        onAddPress:function(){
            this.oRouter.navTo("addNewProduct");
        },

        onHomePress:function(){
            this.oRouter.navTo("home");
        },
        onSearchPress:function(){
            this.oRouter.navTo("getOrder");
        }
    })
});
