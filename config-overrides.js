const path = require("path");
const { override, fixBabelImports, addDecoratorsLegacy, addWebpackAlias } = require('customize-cra');

module.exports = override(
	addDecoratorsLegacy(),
	fixBabelImports('import', {
		libraryName: 'antd-mobile',
		style: 'css',
	}),
	addWebpackAlias({
		"component": path.resolve(__dirname, "src/component"),
		"assets": path.resolve(__dirname, "src/assets")
  })
);
