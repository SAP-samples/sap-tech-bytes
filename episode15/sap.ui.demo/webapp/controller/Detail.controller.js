sap.ui.define(["./BaseController", "sap/ui/model/json/JSONModel", "../model/formatter"], function (__BaseController, JSONModel, __formatter) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseController = _interopRequireDefault(__BaseController);
  const formatter = _interopRequireDefault(__formatter);
  /**
   * @namespace sap.ui.demo.controller
   */
  const Detail = BaseController.extend("sap.ui.demo.controller.Detail", {
    constructor: function constructor() {
      BaseController.prototype.constructor.apply(this, arguments);
      this.formatter = formatter;
    },
    onInit: function _onInit() {
      const viewModel = new JSONModel({
        busy: false,
        delay: 0
      });
      this.setModel(viewModel, "detailView");
      this.getRouter().getRoute("detail").attachPatternMatched(event => this.onObjectMatched(event), this);
    },
    onObjectMatched: function _onObjectMatched(event) {
      const viewModel = this.getModel("detailView");
      this.id = event.getParameter("arguments").id || this.id || "0";
      void this.getModel().metadataLoaded().then(() => {
        const path = this.getModel().createKey("/Products", {
          ID: this.id
        });
        this.getView().bindElement({
          path: path,
          events: {
            change: () => this.onBindingChange(),
            dataRequested: () => {
              viewModel.setProperty("/busy", true);
            },
            dataReceived: function () {
              viewModel.setProperty("/busy", false);
            }
          }
        });
      });
    },
    onBindingChange: function _onBindingChange() {
      const elementBinding = this.getView().getElementBinding();
      // No data for the binding
      if (!elementBinding.getBoundContext()) {
        void this.getRouter().getTargets().display("detailObjectNotFound");
      }
    },
    onCloseDetailPress: function _onCloseDetailPress() {
      this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen", false);
      this.getRouter().navTo("master");
    },
    handleFullScreen: function _handleFullScreen() {
      const nextLayout = this.getModel("appView").getProperty("/actionButtonsInfo/midColumn/fullScreen");
      this.getRouter().navTo("detail", {
        layout: nextLayout,
        id: this.id
      });
    },
    handleExitFullScreen: function _handleExitFullScreen() {
      const nextLayout = this.getModel("appView").getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
      this.getRouter().navTo("detail", {
        layout: nextLayout,
        id: this.id
      });
    },
    handleClose: function _handleClose() {
      const nextLayout = this.getModel("appView").getProperty("/actionButtonsInfo/midColumn/closeColumn");
      this.getRouter().navTo("master", {
        layout: nextLayout
      });
    }
  });
  return Detail;
});
//# sourceMappingURL=Detail.controller.js.map