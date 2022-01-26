/*sap.ui.define([
	"sap/ui/core/mvc/XMLView"
], function (XMLView) {
	"use strict";

	XMLView.create({
		viewName: "sap.ui.demo.view.App"
	}).then(function (oView) {
		oView.placeAt("content");
	});

});*/

sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "sap.ui.demo",
		settings : {
			id : "app"
		},
		async: true
	}).placeAt("content");
});