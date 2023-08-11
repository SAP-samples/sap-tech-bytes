sap.ui.define(["sap/ui/base/Object", "sap/m/MessageBox"], function (UI5Object, MessageBox) {
  /**
   * @namespace sap.ui.demo.controller
   */
  const ErrorHandler = UI5Object.extend("sap.ui.demo.controller.ErrorHandler", {
    constructor: function _constructor(component) {
      UI5Object.prototype.constructor.call(this);
      this.resourceBundle = component.getModel("i18n").getResourceBundle();
      this.component = component;
      this.model = component.getModel();
      this.messageOpen = false;
      this.errorText = this.resourceBundle.getText("errorText");
      this.model.attachMetadataFailed(event => {
        const responseText = event.getParameter("response");
        this.showServiceError(responseText);
      });
      this.model.attachRequestFailed(event => {
        const response = event.getParameter("response");
        // An entity that was not found in the service is also throwing a 404 error in oData.
        // We already cover this case with a notFound target so we skip it here.
        // A request that cannot be sent to the server is a technical error that we have to handle though
        if (response.statusCode !== "404" || response.statusCode == "404" && response.responseText.indexOf("Cannot POST") === 0) {
          this.showServiceError(response);
        }
      });
    },
    showServiceError: function _showServiceError(details) {
      if (this.messageOpen) {
        return;
      }
      this.messageOpen = true;
      let responseText;
      if (details.responseText) {
        try {
          responseText = JSON.parse(details.responseText);
        } catch (ex) {
          responseText = details.responseText;
        }
      }
      MessageBox.error(this.errorText, {
        id: "serviceErrorMessageBox",
        details: responseText,
        styleClass: this.component.getContentDensityClass(),
        // actions : [Action.CLOSE],
        onClose: () => {
          this.messageOpen = false;
        }
      });
    }
  });
  return ErrorHandler;
});
//# sourceMappingURL=ErrorHandler.js.map