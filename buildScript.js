const replace = require("replace-in-file");
const pkg = require("./package.json");

try {
    replace.sync({
        files: "server.js",
        from: [/version is in development/g],
        to: [`is version ${pkg.version}`],
    });
}
catch (error) {
    console.error("Error occurred:", error);
}
