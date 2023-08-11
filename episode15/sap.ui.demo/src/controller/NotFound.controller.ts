import Target from "sap/ui/core/routing/Target";
import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "./BaseController";

/**
 * @namespace sap.ui.demo.controller
 */
export default class NotFound extends BaseController{
	public onInit():void{
		(this.getRouter().getTarget("notFound") as Target).attachDisplay(()=>this.onNotFoudnDisplayed());
	}
	private onNotFoudnDisplayed(){
		(this.getModel("appView") as JSONModel).setProperty("/layout","OneColumn");
	}
}