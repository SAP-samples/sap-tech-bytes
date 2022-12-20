sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel"
], function (Controller, History, JSONModel) {
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

            this._getMoreVideoInfo(oPath)
        },
        onNavBack: function () {
            let oHistory = History.getInstance()
            let sPreviousHash = oHistory.getPreviousHash()

            if (sPreviousHash) {
                window.history.go(-1)
            } else {
                let oRouter = this.getOwnerComponent().getRouter()
                oRouter.navTo("overview", {},true)
            }
        },
        _getMoreVideoInfo: function (oPath) {
            const oView = this.getView()

            let oPathIndex = oPath.split("/")[1]
            let videoId =
                oView.getModel("youTubeModel").getData()
                .items[oPathIndex].snippet.resourceId.videoId

            let reqSettings = {
                "url": "/youTubeURL/youtube/v3/videos?part=statistics&id="
                    + videoId + "&key=API_KEY",
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json"
                }
            }

            jQuery.ajax(reqSettings)
                .done(function(response) {
                    oView.setModel(
                        new JSONModel(response),
                        "videoDetailModel"
                    )
                })
        }
    })
})