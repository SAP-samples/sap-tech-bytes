sap.ui.define([
  "sap/ui/test/Opa5",
  "./arrangements/Startup",
  "./MainJourney"
],
/**
 * @param {typeof sap.ui.test.Opa5} Opa5 
 */
function(Opa5, Startup) {
  "use strict";

  Opa5.extendConfig({
    arrangements: new Startup(),
    autoWait: true
  });

});
