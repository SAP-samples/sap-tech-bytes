sap.ui.define(["./BaseController"], function (__BaseController) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseController = _interopRequireDefault(__BaseController);
  /**
   * @namespace sap.ui.demo.controller
   */
  const App = BaseController.extend("sap.ui.demo.controller.App", {
    onInit: function _onInit() {
      // apply content density mode to root view
      this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
      this.getOwnerComponent().getRouter().attachRouteMatched(event => this.onRouteMatched(event), this);
    },
    onStateChanged: function _onStateChanged(oEvent) {
      const bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
        sLayout = oEvent.getParameter("layout");
      void this.updateUIElements();

      // Replace the URL with the new layout if a navigation arrow was used
      if (bIsNavigationArrow) {
        this.getOwnerComponent().getRouter().navTo(this.currentRouteName, {
          layout: sLayout,
          id: this.currentId
        }, {}, true);
      }
    },
    onRouteMatched: function _onRouteMatched(oEvent) {
      const sRouteName = oEvent.getParameter("name"),
        oArguments = oEvent.getParameter("arguments");
      void this.updateUIElements();

      // Save the current route name
      this.currentRouteName = sRouteName;
      this.currentId = oArguments.id;
    },
    updateUIElements: async function _updateUIElements() {
      const oModel = this.getOwnerComponent().getModel("appView"),
        helper = await this.getOwnerComponent().getHelper(),
        oUIState = helper.getCurrentUIState();
      oModel.setData(oUIState);
    },
    onExit: function _onExit() {
      this.getRouter() && this.getRouter().detachRouteMatched(event => this.onRouteMatched(event), this);
    }
  });
  return App;
});
//# sourceMappingURL=App.controller.js.map