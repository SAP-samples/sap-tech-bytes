sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"], function (Controller, History) {
  /**
   * @namespace sap.ui.demo.controller
   */
  const BaseController = Controller.extend("sap.ui.demo.controller.BaseController", {
    getRouter: function _getRouter() {
      return this.getOwnerComponent().getRouter();
    },
    getModel: function _getModel(name) {
      return this.getView().getModel(name);
    },
    setModel: function _setModel(model, name) {
      this.getView().setModel(model, name);
    },
    getResourceBundle: function _getResourceBundle() {
      return this.getOwnerComponent().getModel("i18n").getResourceBundle();
    },
    onNavBack: function _onNavBack() {
      const sPreviousHash = History.getInstance().getPreviousHash();
      if (sPreviousHash !== undefined) {
        // eslint-disable-next-line
        history.go(-1);
      } else {
        this.getRouter().navTo("master", {}, {}, true);
      }
    }
  });
  return BaseController;
});
//# sourceMappingURL=BaseController.js.map