sap.ui.define(["sap/ui/core/UIComponent", "./model/models", "sap/ui/Device", "sap/f/FlexibleColumnLayoutSemanticHelper", "sap/f/library", "sap/ui/model/json/JSONModel", "./controller/ErrorHandler"], function (UIComponent, __models, sap_ui_Device, FlexibleColumnLayoutSemanticHelper, sap_f_library, JSONModel, __ErrorHandler) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const models = _interopRequireDefault(__models);
  const support = sap_ui_Device["support"];
  const LayoutType = sap_f_library["LayoutType"];
  const ErrorHandler = _interopRequireDefault(__ErrorHandler);
  /**
   * @namespace sap.ui.demo
   */
  const Component = UIComponent.extend("sap.ui.demo.Component", {
    metadata: {
      manifest: "json"
    },
    init: function _init() {
      this.errorHandler = new ErrorHandler(this);
      UIComponent.prototype.init.call(this);
      this.setModel(models.createDeviceModel(), "device");
      this.setModel(new JSONModel(), "appView");
      this.getRouter().attachBeforeRouteMatched(event => this.onBeforeRouteMatched(event), this);
      this.getRouter().initialize();
    },
    destroy: function _destroy() {
      this.getRouter().detachBeforeRouteMatched(event => this.onBeforeRouteMatched(event), this);
      UIComponent.prototype.destroy.call(this);
    },
    getContentDensityClass: function _getContentDensityClass() {
      if (this.contentDensityClass === undefined) {
        // check whether FLP has already set the content density class; do nothing in this case
        // eslint-disable-next-line
        if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
          this.contentDensityClass = "";
        } else if (!support.touch) {
          // apply "compact" mode if touch is not supported
          this.contentDensityClass = "sapUiSizeCompact";
        } else {
          // "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
          this.contentDensityClass = "sapUiSizeCozy";
        }
      }
      return this.contentDensityClass;
    },
    onBeforeRouteMatched: async function _onBeforeRouteMatched(oEvent) {
      const model = this.getModel("appView"),
        layout = oEvent.getParameters().arguments.layout;

      // If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
      if (!layout) {
        const helper = await this.getHelper();
        const nextUIState = helper.getNextUIState(0);
        model.setProperty("/layout", nextUIState.layout);
        return;
      }
      model.setProperty("/layout", layout);
    },
    getHelper: async function _getHelper() {
      const fcl = await this.getFcl(),
        settings = {
          defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
          defaultThreeColumnLayoutType: LayoutType.ThreeColumnsMidExpanded
        };
      return FlexibleColumnLayoutSemanticHelper.getInstanceFor(fcl, settings);
    },
    getFcl: function _getFcl() {
      return new Promise((resolve, reject) => {
        const FCL = this.getRootControl().byId('fcl');
        if (!FCL) {
          this.getRootControl().attachAfterInit(oEvent => {
            resolve(oEvent.getSource().byId('fcl'));
          });
          return;
        }
        resolve(FCL);
      });
    }
  });
  return Component;
});
//# sourceMappingURL=Component.js.map