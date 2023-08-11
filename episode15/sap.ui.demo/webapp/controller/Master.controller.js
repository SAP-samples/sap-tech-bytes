sap.ui.define(["./BaseController", "sap/ui/Device", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/Sorter", "../control/Tile", "sap/ui/core/Fragment"], function (__BaseController, sap_ui_Device, Filter, FilterOperator, Sorter, __Tile, Fragment) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseController = _interopRequireDefault(__BaseController);
  const system = sap_ui_Device["system"];
  const Tile = _interopRequireDefault(__Tile);
  /**
   * @namespace sap.ui.demo.controller
   */
  const Master = BaseController.extend("sap.ui.demo.controller.Master", {
    constructor: function constructor() {
      BaseController.prototype.constructor.apply(this, arguments);
      this.descendingSort = false;
    },
    onMasterMatched: function _onMasterMatched() {
      this.getModel("appView").setProperty("/layout", "OneColumn");
    },
    onListItemPress: async function _onListItemPress(event) {
      const replace = !system.phone,
        id = event.getSource().getBindingContext().getProperty("ProductID"),
        helper = await this.getOwnerComponent().getHelper(),
        nextUIState = helper.getNextUIState(1);
      this.getRouter().navTo("detail", {
        id: id,
        layout: nextUIState.layout
      }, {}, replace);
    },
    onSearch: function _onSearch(event) {
      const query = event.getParameter("query");
      let tableSearchState = [];
      if (query && query.length > 0) {
        tableSearchState = [new Filter("ProductName", FilterOperator.Contains, query)];
      }
      this.getView().byId("productsTable").getBinding("items").filter(tableSearchState, "Application");
    },
    onSort: function _onSort() {
      this.descendingSort = !this.descendingSort;
      const view = this.getView(),
        table = view.byId("productsTable"),
        binding = table.getBinding("items"),
        sorter = new Sorter("Category/CategoryName", this.descendingSort, true);
      binding.sort(sorter);
    },
    createTiles: function _createTiles(sId, oContext) {
      return new Tile(sId, {
        text: oContext.getProperty("CategoryName"),
        image: oContext.getProperty("Picture"),
        press: this.filterCategories.bind(this)
      });
    },
    filterCategories: function _filterCategories(event) {
      const query = event.getSource().getText();
      let tableSearchState = [];
      if (query && query.length > 0) {
        tableSearchState = [new Filter("Category/CategoryName", FilterOperator.Contains, query)];
      }
      this.getView().byId("productsTable").getBinding("items").filter(tableSearchState, "Application");
    },
    onOpenFeedbackDialog: async function _onOpenFeedbackDialog(event) {
      if (!this.feedbackDialog) {
        this.feedbackDialog = await Fragment.load({
          name: "sap.ui.demo.fragment.FeedbackDialog",
          controller: this
        });
      }
      this.feedbackDialog.open();
    },
    onCloseFeedbackDialog: function _onCloseFeedbackDialog(event) {
      this.feedbackDialog.close();
    }
  });
  return Master;
});
//# sourceMappingURL=Master.controller.js.map