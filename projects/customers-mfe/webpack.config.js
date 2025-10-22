const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'customers_mfe',
  exposes: {
    './Routes': './projects/customers-mfe/src/app/app.routes.ts',
  },
  filename: 'remoteEntry.js',
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
});
