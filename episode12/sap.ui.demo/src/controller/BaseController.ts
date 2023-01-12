import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Controller from "sap/ui/core/mvc/Controller";
import History from "sap/ui/core/routing/History";
import Router from "sap/ui/core/routing/Router";
import UIComponent from "sap/ui/core/UIComponent";
import Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

/**
 * @namespace sap.ui.demo.controller
 */
export default class BaseController extends Controller {	
	/**
	 * Convenience method for accessing the router in every controller of the application.
	 * @public
	 * @returns {sap.ui.core.routing.Router} the router for this component
	 */
	public getRouter(): Router {
		return (this.getOwnerComponent() as UIComponent).getRouter();
	}

	/**
	 * Convenience method for getting the view model by name in every controller of the application.
	 * @public
	 * @param {string} sName the model name
	 * @returns {sap.ui.model.Model} the model instance
	 */
	public getModel(name?: string): Model {
		return this.getView().getModel(name);
	}

	/**
	 * Convenience method for setting the view model in every controller of the application.
	 * @public
	 * @param {sap.ui.model.Model} oModel the model instance
	 * @param {string} sName the model name
	 * @returns {sap.ui.mvc.View} the view instance
	 */
	public setModel(model: Model, name?: string): void {
		this.getView().setModel(model, name);
	}

	/**
	 * Convenience method for getting the resource bundle.
	 * @public
	 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
	 */
	public getResourceBundle(): ResourceBundle {
		return (((this.getOwnerComponent() as UIComponent).getModel("i18n") as ResourceModel).getResourceBundle() as ResourceBundle);
	}

	/**
	 * Event handler for navigating back.
	 * It there is a history entry we go one step back in the browser history
	 * If not, it will replace the current entry of the browser history with the master route.
	 * @public
	 */
	public onNavBack(): void {
		const sPreviousHash = History.getInstance().getPreviousHash();

		if (sPreviousHash !== undefined) {
			// eslint-disable-next-line
			history.go(-1);
		} else {
			this.getRouter().navTo("master", {},{}, true);
		}
	}
}