const cds = require("@sap/cds")
cds.on("bootstrap", () => {
	if (process.env.CDS_ENV === "hybrid") {
		cds.env.requires.auth.kind = "xsuaa"
	}
})
