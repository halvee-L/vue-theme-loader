var _webpackSources = require("webpack-sources");
var _loaderUtils = require("loader-utils");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

const protoToString = Object.prototype.toString;

const isString = val => protoToString.call(val) === "[object String]";

const isFunction = val => protoToString.call(val) === "[object Function]";

const themer = require("./loader/themer")();

module.exports = class postCssTheme {
  constructor(options) {
    if (isString(options)) {
      this.filename = options;
    } else {
      this.filename = options.filename;
    }
    if (!this.filename) {
      throw new Error("extract theme Plugin:filename is null");
    }
  }
  source(item) {
    if (item.source) {
      return new _webpackSources.SourceMapSource(
        item.node.toString(),
        null,
        item.source
      );
    }
    return new _webpackSources.RawSource(item.node.toString());
  }
  apply(compiler) {
    let filename = this.filename;
    let that = this;
    compiler.plugin("this-compilation", function(compilation) {
      compilation.plugin("additional-assets", function(callback) {
        var getPath = function getPath(value, format) {
          return compilation
            .getPath(format, {
              chunk: {}
            })
            .replace(
              /\[(?:(\w+):)?theme(?::([a-z]+\d*))?(?::(\d+))?\]/gi,
              function() {
                // eslint-disable-line func-names
                return value;
              }
            );
        };
        themer.each((name, node) => {
          var source = new _webpackSources.ConcatSource();
          for (var i = 0, len = node.length; i < len; i++) {
            let _source = that.source(node[i]);
            source.add(_source);
          }
          var file = isFunction(filename)
            ? filename(getPath.bind(null, value))
            : getPath(name, filename);
          compilation.assets[file] = source;
        });
        callback();
      });
    });
  }
};

module.exports.loader = require("./loader/postcss-theme");
