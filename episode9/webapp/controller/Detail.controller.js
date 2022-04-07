sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict"
    return Controller.extend("sap.ui.demo.controller.Detail", {
        onInit: function () {
            let oRouter = this.getOwnerComponent().getRouter()
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this)
        },
        _onObjectMatched: function (oEvent) {
            let oPath = window.decodeURIComponent(oEvent.getParameter("arguments").videoItemPath)

            this.getView().bindElement({
                path: "/" + oPath,
                model: "youTubeModel"
            })
        }
    })
})