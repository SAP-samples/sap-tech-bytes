sap.ui.define([
   "sap/ui/core/mvc/Controller",
], function (Controller) {
   "use strict";
   return Controller.extend("sap.ui.demo.controller.App", {
      incrementBy1: function () {
         let myTextElem = this.getView().byId("counter");
         let myNum = parseInt(myTextElem.getText());
         let myNewNum = myNum + 1;
         myTextElem.setText(myNewNum);
      }
   });
});