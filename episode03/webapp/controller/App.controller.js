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
         let oModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/Data.json"))
         this.getView().setModel(oModel)
      },

      //everything below is for the optional popover
      onAfterRendering: function () {
         let that = this
         window.setTimeout(function () {
            let items = that.byId("episodeOverview").getItems()
            for (let i = 0; i < items.length; i++) {
               items[i].addEventDelegate({
                  onmouseover: that._showPopover,
                }, that)
            }
         }, 1000)
      },
      _showPopover: function (oEvent) {
         let targetNode = oEvent.originalEvent.target
         let listNode
         if (targetNode.tagName != "LI") {
            listNode = targetNode.parentElement.closest('li')
         } else {
            listNode = targetNode
         }
         let index = listNode.id.split("").reverse().join("").split("-")[0]
         let oItem = this.byId("episodeOverview").getItems()[index]
         let oDate = this.getView().getModel().getProperty(oItem.getBindingContext().sPath).published
         this.byId("popoverText").setText(`Published: ${oDate}`)
         this.byId("popover").openBy(listNode)
      },
      _clearPopover: function () {
         this.byId("popover").close()
      }
   })
})