sap.ui.define([
    'wp/fin/payroll/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment',
    'sap/ui/core/routing/History',
    'sap/ui/model/FilterOperator',
    'sap/ui/model/Filter',

], function(baseController, messageBox ,messageToast, fragment, history, filterOperator, filter) {
    'use strict';
    return baseController.extend("wp.fin.payroll.controller.View1",{

        onInit:function(){
            this.oRouter=this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("ordDetails").attachMatched(this.bindData,this);
        },

        bindData:function(oRouter){
            var idFruit = oRouter.getParameter("arguments").idFruit;
            // this.getView().bindElement("/fruits/" + idFruit);
            this.getView().bindElement("/" + idFruit ,{expand: "toOrderItems"});

        },

        onSearch:function(oEvent){
            var qryString = oEvent.getParameter("value");
            var oFilter1=new filter("city",filterOperator.Contains,qryString);

            // var oFilter = new filter({filters:[oFilter1], and:false});
            var oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter(oFilter1);

        },

        goNext:function(){
            //this.getView().getParent().to("idView2");
            //this.getView().getParent().getParent().toMaster("idView2");
            const oHistory = history.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("home", {}, true);
            }
        },

        goSupplier:function(index){
            this.oRouter.navTo("supplier",{
                idIndex:index
            })
        },


        onSave:function(){
            messageBox.confirm("Should I proceed?",{
                title:"Confirmation",
                onClose:this.displayConfirmation.bind(this)
                // onClose:function(oEvent){
                //     messageToast.show("Saved");
                // }
            });

        },
        onCancel:function(){
            messageToast.show("Ok! Your Order was Cancelled. Back to Home.");
            this.oRouter.navTo("home");
        },

        displayConfirmation:function(oEvent){
            if (oEvent === sap.m.MessageBox.Action.OK ){
            messageToast.show("Data Saved");
            }else{ //this.onCancel() 
                messageToast.show("Sure, Please continue to add Fruits in your Cart.");
            }
        },

        loadSupplier:function(oEvent){
            var vPath = oEvent.getParameter("listItem").getBindingContextPath();
            this.goSupplier(vPath.split("/")[vPath.split("/").length - 1]);
        },

        onSupplierSearch:function(oEvent){

            var that=this;

            if (!this.oDialog)
            {
                this.oDialog = fragment.load({
                name:"wp.fin.payroll.fragments.popUp",
                type:"XML",
                id:"idSupplierPopUp",
                controller:this
            }).then(function(oEvent){
                oEvent.setTitle("Select City");
                // oEvent.setModel(that.getView().getModel());
                that.getView().addDependent(oEvent);
                oEvent.bindAggregation("items",{
                    path: '/supplier',
                    template: new sap.m.StandardListItem({title:"{name}", description:"{city}"})
                })
                return oEvent;
                // oEvent.open();
            });
        }
        this.oDialog.then(function(oEvent){
            oEvent.open();
        })
        },

        onValueSelect:function(oEvent){
            var selectedCity = oEvent.getParameter("selectedItem").getDescription();
            this.cityField.setValue(selectedCity);
        },

        cityField:null,

        onF4Help:function(oEvent){

            var that=this;
            this.cityField = oEvent.getSource();

            if (!this.oDialog)
            {
                this.oDialog = fragment.load({
                name:"wp.fin.payroll.fragments.popUp",
                type:"XML",
                id:"idcitiesPopUp",
                controller:this
            }).then(function(oEvent){
                oEvent.setTitle("Select City");
                // oEvent.setModel(that.getView().getModel());
                that.getView().addDependent(oEvent);
                oEvent.bindAggregation("items",{
                    path: '/supplier',
                    template: new sap.m.StandardListItem({title:"{name}", description:"{city}"})
                })
                return oEvent;
                // oEvent.open();
            });
        }
        this.oDialog.then(function(oEvent){
            oEvent.open();
        })
        }

    })
});

/*
            <!--Page id="Page1" title="View1">
            <Label id="idFruit" text="{name}"/>
            <headerContent>
            <Button id="idNext" text="Click Next" icon="sap-icon://arrow-right" press="goNext"/>
            </headerContent>
            <content>
                <SearchField id="idSearch"/>
                <List id="idList">
                    <items>
                        <DisplayListItem label="Apple" value="Have Once a Day"/>
                        <StandardListItem icon="https://openclipart.org/image/800px/20420" title="Banana" description="Have Twice in a Day"/>
                        <InputListItem>
                            <content>
                                <HBox>
                                    <Text text="Cherry"></Text>
                                    <Input width="40%"/>
                                </HBox>
                            </content>
                        </InputListItem>
                        <ObjectListItem title="Mango" intro="King of Fruits" icon="https://cdn-icons-png.flaticon.com/256/765/765599.png" number="$7.99" numberUnit="Per lb.">
                        <attributes>
                        <ObjectAttribute text="Produced in India">
                        <!--customContent>
                        <Image src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L2pvYjk0Ny0xNTkuanBn.jpg"></Image>
                        </customContent-->
                        </ObjectAttribute>
                        <ObjectAttribute text="Shipped to USA"/>
                        </attributes>
                        </ObjectListItem>
                    </items>
                </List>
            </content>
            <footer>
            </footer>
            </Page-->


*/