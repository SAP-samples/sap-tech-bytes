sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
   "use strict"
   return Controller.extend("sap.ui.demo.controller.App", {
      incrementBy1: function () {
         let myTextElem = this.getView().byId("counter")
         let myNum = parseInt(myTextElem.getText())
         let myNewNum = myNum + 1
         myTextElem.setText(myNewNum)
      },
      onInit: function () {
         let controller = this
         let reqSettings = {
            "url": "/user-api/currentUser",
            "method": "GET"
         }
         jQuery.ajax(reqSettings).done(function (response) {
            let userInfo = JSON.parse(response)
            let userFirstName = userInfo.firstname
            controller.getView().byId("appPanel")
               .setHeaderText(`Hello, ${userFirstName}! 👋`)   
         })
      },
      onPress: function (oEvent) {
         var oItem = oEvent.getSource()
			var oRouter = this.getOwnerComponent().getRouter()
			oRouter.navTo("detail", {
				videoItemPath: window.encodeURIComponent(oItem.getBindingContext("youTubeModel").getPath().substr(1))
			})
		}
   })
})