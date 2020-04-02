const postcss = require("postcss");
const selectorParser = require("postcss-selector-parser");
const loaderUtils = require("loader-utils");

const utils = require("./utils");

const themer = require("./themer")();

const THEMEREG = /\-\-(\w+)\-\-/;

const replaceNormal = str => str.replace(THEMEREG, "");

const insertBefore = (node, add) => node.parent.insertBefore(node, add);

module.exports = postcss.plugin("theme-loader", params => root => {
  let theme = params && params.theme;
  const isProduction = process.env.NODE_ENV === "production";

  // theme = black
  // .--black--clazz{}
  function walkDeclsCurrent(node) {
    if (node.nodes[0]) {
      node.insertBefore(node.nodes[0], { text: theme });
    }
    node.walkDecls(decl => {
      decl.prop = decl.prop.replace(THEMEREG, "");
      decl.value = decl.value + " !important";
    });
  }

  // theme = black
  // .--red--clazz{}

  function chunkNode(node, theme) {
    if (isProduction) {
      themer.add(theme, utils.getDeepNode(node), node.source);
      node.remove();
    } else {
      node.selector = "." + theme + " " + node.selector;
    }
  }

  function walkDeclsChunk(node, theme) {
    let ruleCache = {};
    node.walkDecls(decl => {
      let match = decl.prop.match(THEMEREG);
      if (match && match[1]) {
        decl.prop = replaceNormal(decl.prop);
        if (theme === match[1] && !isProduction) {
          decl.value = decl.value + " !important";
        } else {
          let rule = ruleCache[match[1]];
          if (rule) {
            rule.append(utils.getDeepNode(decl));
          } else {
            rule = utils.getDeepNode(decl.parent);
            rule.removeAll();
            rule.selector = "." + match[1] + " " + rule.selector;
            ruleCache[match[1]] = rule;
            rule.append(decl.clone());
          }
          decl.replaceWith({
            text:
              "replace by postcss-theme[ " +
              rule.selector +
              "]" +
              decl.toString()
          });
        }
      }
    });
    // todo 判断环境 {
    if (isProduction) {
      Object.keys(ruleCache).forEach(key => {
        let rule = ruleCache[key];
        themer.add(key, rule, node.source);
      });
    } else {
      Object.keys(ruleCache).forEach(key => {
        let rule = ruleCache[key];
        node.parent.append(rule);
      });
    }
  }

  root.walkRules(node => {
    let match = node.selector.match(THEMEREG);
    if (match && match[1]) {
      node.selector = replaceNormal(node.selector);
      if (match[1] === theme && !isProduction) {
        walkDeclsCurrent(node);
      } else {
        chunkNode(node, match[1]);
      }
    } else {
      walkDeclsChunk(node, theme);
    }
  });
});
