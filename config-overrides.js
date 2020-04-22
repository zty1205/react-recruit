const path = require("path");
const { override, fixBabelImports, addDecoratorsLegacy, addWebpackAlias } = require('customize-cra');

module.exports = override(
	addDecoratorsLegacy(),
	fixBabelImports('import', {
		libraryName: 'antd-mobile',
		style: 'css',
	}),
	addWebpackAlias({
		"assets": path.resolve(__dirname, "src/assets")
  })
);
