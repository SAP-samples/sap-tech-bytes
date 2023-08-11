import BaseController from "./BaseController";
import { system } from "sap/ui/Device";
import UI5Event from "sap/ui/base/Event";
import Component, { UIState } from "../Component";
import List from "sap/m/List";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataListBinding from "sap/ui/model/odata/v2/ODataListBinding";
import CustomListItem from "sap/m/CustomListItem";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import Sorter from "sap/ui/model/Sorter";
import Tile from "../control/Tile";
import Context from "sap/ui/model/Context";
import Fragment from "sap/ui/core/Fragment";
import Dialog from "sap/m/Dialog";

/**
 * @namespace sap.ui.demo.controller
 */
export default class Master extends BaseController {
	private descendingSort = false;

	private onMasterMatched() {
		(this.getModel("appView") as JSONModel).setProperty("/layout", "OneColumn");
	}

	private async onListItemPress(event: UI5Event): Promise<void> {
		const replace = !system.phone,
			id = ((event.getSource() as CustomListItem).getBindingContext().getProperty("ProductID") as number),
			helper = await (this.getOwnerComponent() as Component).getHelper(),
			nextUIState = (helper.getNextUIState(1) as UIState);
		this.getRouter().navTo("detail", { id: id, layout: nextUIState.layout },{},replace);
	}

	private onSearch(event: UI5Event) {
		const query = event.getParameter("query") as string;
		let tableSearchState:Array<Filter> = [];

		if (query && query.length > 0) {
			tableSearchState = [new Filter("ProductName", FilterOperator.Contains, query)];
		}

		((this.getView().byId("productsTable") as List).getBinding("items") as ODataListBinding).filter(tableSearchState, "Application");
	}

	private onSort() {
		this.descendingSort = !this.descendingSort;
		const view = this.getView(),
			table = (view.byId("productsTable") as List),
			binding = (table.getBinding("items") as ODataListBinding),
			sorter = new Sorter("Category/CategoryName", this.descendingSort, true);

		binding.sort(sorter);
	}

	private createTiles(sId: string, oContext: Context) {
		return new Tile(sId, {
			text: (oContext.getProperty("CategoryName") as string),
			image: (oContext.getProperty("Picture") as string),
			press: this.filterCategories.bind(this),
		})
	}

	private filterCategories(event: UI5Event) {
		const query = (event.getSource() as Tile).getText();
		let tableSearchState:Array<Filter> = [];

		if (query && query.length > 0) {
			tableSearchState = [new Filter("Category/CategoryName", FilterOperator.Contains, query)];
		}

		((this.getView().byId("productsTable") as List)
			.getBinding("items") as ODataListBinding)
			.filter(tableSearchState, "Application");
	}

	feedbackDialog: Dialog
	private async onOpenFeedbackDialog(event: UI5Event) {
		if (!this.feedbackDialog) {
			this.feedbackDialog = (await Fragment.load({
				name: "sap.ui.demo.fragment.FeedbackDialog",
				controller: this
			}) as Dialog)
		}
		this.feedbackDialog.open()
	}

	private onCloseFeedbackDialog(event: UI5Event) {
		this.feedbackDialog.close()
	}
}