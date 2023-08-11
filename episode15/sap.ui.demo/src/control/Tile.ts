import RenderManager from "sap/ui/core/RenderManager";
import VBox from "sap/m/VBox";
import Image from "sap/m/Image";
import Text from "sap/m/Text";
import Icon from "sap/ui/core/Icon";
import Control from "sap/ui/core/Control";

/**
* @name sap.ui.demo.control.Tile
*/
export default class Tile extends Control {

    // The following three lines were generated and should remain as-is to make TypeScript aware of the constructor signatures
    constructor(idOrSettings?: string | $TileSettings);
    constructor(id?: string, settings?: $TileSettings);
    constructor(id?: string, settings?: $TileSettings) { super(id, settings); }

    private _tile: Control;

    static readonly metadata = {
        properties: {
            "image": "string",
            "text": "string"
        },
        events: {
            "press": {}
        }
    }

    renderer = {
        apiVersion: 2,
        render: (rm: RenderManager, control: Tile) => {
            rm.openStart("div", control);
            rm.openEnd();
            control._tile = control.createTile()
            rm.renderControl(control._tile)
            rm.close("div");
        }
    }

    createTile() {
        const picBinary = this.getImage();
        const text = this.getText();
        return new VBox({
            items: [
                new Image({
                    src: `data:image/bmp;base64,${(picBinary ? picBinary.substring(104) : "")}`,
                    alt: "text",
                    height: "150px",
                    width: "150px"
                }).addStyleClass("sapUiSmallMarginBottom"),
                new VBox({
                    items: [
                        new Text({
                            text: text
                        }).addStyleClass("sapUiTinyMarginBottom"),
                        new Icon({
                            src: "sap-icon://arrow-right"
                        })
                    ]
                })
            ]
        }).attachBrowserEvent("click", () => {
            this.firePress()
        }).addStyleClass("sapUiMediumMarginEnd")
    }

    onBeforeRendering() {
        if (this._tile) {
            this._tile.destroy();
        }
    }

    exit() {
        if (this._tile) {
            this._tile.destroy();
        }
    }
}