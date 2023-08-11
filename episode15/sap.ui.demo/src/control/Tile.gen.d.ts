import Event from "sap/ui/base/Event";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./Tile" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $TileSettings extends $ControlSettings {
        image?: string | PropertyBindingInfo;
        text?: string | PropertyBindingInfo;
        press?: (event: Event) => void;
    }

    export default interface Tile {

        // property: image
        getImage(): string;
        setImage(image: string): this;

        // property: text
        getText(): string;
        setText(text: string): this;

        // event: press
        attachPress(fn: (event: Event) => void, listener?: object): this;
        attachPress<CustomDataType extends object>(data: CustomDataType, fn: (event: Event, data: CustomDataType) => void, listener?: object): this;
        detachPress(fn: (event: Event) => void, listener?: object): this;
        firePress(parameters?: object): this;
    }
}
