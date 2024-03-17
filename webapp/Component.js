sap.ui.define([
    'sap/ui/core/UIComponent'
], function(oUiController) {
    'use strict';
    return oUiController.extend("wp.fin.payroll.Component",{
        metadata:{
            manifest:"json"
        },

        init:function(){
            oUiController.prototype.init.apply(this);
            var oRouter = this.getRouter();
            oRouter.initialize();
        },

        // createContent:function(){

        //     var oRootView = new sap.ui.view(
        //         {
        //             viewName:"wp.fin.payroll.view.App",
        //             id:"idViewApp",
        //             type:"XML"
        //         }
        //     );

        //     var oAppCon = oRootView.byId("idAppCon");

        //     var oView1 = sap.ui.view({
        //         viewName:"wp.fin.payroll.view.View1",
        //         id:"idView1",
        //         type:"XML"
        //     });

        //     var oView2 = sap.ui.view({
        //         viewName:"wp.fin.payroll.view.View2",
        //         id:"idView2",
        //         type:"XML"
        //     });

        //     var oDefDetail = sap.ui.view({
        //         viewName:"wp.fin.payroll.view.DefDetail",
        //         id:"idDefDetail",
        //         type:"XML"
        //     });

        //     //oAppCon.addPage(oView2).addPage(oView1);
        //     //oAppCon.addMasterPage(oView2).addDetailPage(oView1);
        //     oAppCon.addMasterPage(oView2).addDetailPage(oDefDetail).addDetailPage(oView1);

        //     return oRootView;

        // }

    });
    
});