const constant = require("./src/themeConstant");
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": constant.app_theme,
              "@menu-dark-bg": constant.drawer_theme,
              "@layout-header-background": constant.drawer_theme,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
