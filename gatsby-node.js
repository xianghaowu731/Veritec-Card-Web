// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//     if (stage === "build-html") {
//       actions.setWebpackConfig({
//         module: {
//           rules: [
//             {
//               test: /bad-module/,
//               use: loaders.null(),
//             },
//           ],
//         },
//       })
//     }
//   }

exports.onCreateWebpackConfig = ({
    stage,
    actions,
    getConfig
  }) => {
    if (stage === 'build-html') {
      actions.setWebpackConfig({
        externals: getConfig().externals.concat(function(context, request, callback) {
          const regex = /^@?firebase(\/(.+))?/;
          // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
          if (regex.test(request)) {
            return callback(null, 'umd ' + request);
          }
          callback();
        })
      });
    }
  };