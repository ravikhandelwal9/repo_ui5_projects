sap.ui.define([
    'sap/ui/core/mvc/Controller', 'wp/fin/payroll/utils/formatter'
], function(oController, oFormatter) {
    'use strict';
    return oController.extend("wp.fin.payroll.controller.BaseController",{

        formatter: oFormatter,
        init:function(){

        }
    })
});