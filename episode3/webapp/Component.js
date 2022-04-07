sap.ui.define([
   "sap/ui/core/UIComponent",
], function (UIComponent) {
   "use strict"
   return UIComponent.extend("sap.ui.demo.Component", {
      metadata: {
         "interfaces": ["sap.ui.core.IAsyncContentCreation"],
         "rootView": {
            "viewName": "sap.ui.demo.view.App",
            "type": "XML",
            "id": "app"
         }
      },
      init: function () {
         UIComponent.prototype.init.apply(this, arguments)
      }
   })
})