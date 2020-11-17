// This just tests that all dependencies are included.

const AVL = require("./dist");

console.log("AVL:", AVL);
console.log("THEMES:", Boolean(AVL.Themes));
console.log("WRAPPERS:", Boolean(AVL.Wrappers));
