sap.ui.define([], function() {
    'use strict';
    return{
        getStatus:function(statusIndicator){
            var statusModel = this.getOwnerComponent().getModel().getProperty("/status");
            for (let index = 0; index < statusModel.length; index++) {
                switch (statusModel[index].key) {
                    case statusIndicator:
                        return statusModel[index].value;             
                    default:
                        break;
                } ;                
            }
    },

    getSupplierSpecialityBinding:function(supplierBinding){
        return this.getView().getBindingContext().sPath + supplierBinding;

    },
    getStatusColor:function(statusIndicator){

        switch (statusIndicator) {
            case 'A':
                return "Success";
            case 'D':
                return "Error";
            case 'O':
                return "Warning";
            default:
                break;
        } ;
}

    }
});