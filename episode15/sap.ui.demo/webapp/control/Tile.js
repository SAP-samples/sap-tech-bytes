sap.ui.define(["sap/m/VBox", "sap/m/Image", "sap/m/Text", "sap/ui/core/Icon", "sap/ui/core/Control"], function (VBox, Image, Text, Icon, Control) {
  /**
  * @name sap.ui.demo.control.Tile
  */
  const Tile = Control.extend("sap.ui.demo.control.Tile", {
    renderer: {
      apiVersion: 2,
      render: (rm, control) => {
        rm.openStart("div", control);
        rm.openEnd();
        control._tile = control.createTile();
        rm.renderControl(control._tile);
        rm.close("div");
      }
    },
    metadata: {
      properties: {
        "image": "string",
        "text": "string"
      },
      events: {
        "press": {}
      }
    },
    constructor: function _constructor(id, settings) {
      Control.prototype.constructor.call(this, id, settings);
    },
    createTile: function _createTile() {
      const picBinary = this.getImage();
      const text = this.getText();
      return new VBox({
        items: [new Image({
          src: `data:image/bmp;base64,${picBinary ? picBinary.substring(104) : ""}`,
          alt: "text",
          height: "150px",
          width: "150px"
        }).addStyleClass("sapUiSmallMarginBottom"), new VBox({
          items: [new Text({
            text: text
          }).addStyleClass("sapUiTinyMarginBottom"), new Icon({
            src: "sap-icon://arrow-right"
          })]
        })]
      }).attachBrowserEvent("click", () => {
        this.firePress();
      }).addStyleClass("sapUiMediumMarginEnd");
    },
    onBeforeRendering: function _onBeforeRendering() {
      if (this._tile) {
        this._tile.destroy();
      }
    },
    exit: function _exit() {
      if (this._tile) {
        this._tile.destroy();
      }
    }
  });
  return Tile;
});
//# sourceMappingURL=Tile.js.map