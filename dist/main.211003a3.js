// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var storageKey = localStorage.getItem('key');
var storageKeyObject = JSON.parse(storageKey); //??????????????????????????????
var hashMap = storageKeyObject || [{
    logo: 'A',
    logoType: 'text',
    url: 'https://www.acfun.cn'
}, {
    logo: 'B',
    logoType: 'image',
    url: 'https://bilibili.com'
}, {
    logo: 'M',
    logoType: 'text',
    url: 'https://developer.mozilla.org/zh-CN/'
}, {
    logo: 'W',
    logoType: 'text',
    url: 'https://www.w3school.com.cn/jsref/index.asp'
}, {
    logo: 'C',
    logoType: 'text',
    url: 'https://www.csdn.net/'
}, {
    logo: 'G',
    logoType: 'text',
    url: 'https://google.com'
}, {
    logo: 'Z',
    logoType: 'text',
    url: 'https://www.zhihu.com/'
}, {
    logo: 'J',
    logoType: 'text',
    url: 'https://juejin.cn/'
}, {
    logo: 'I',
    logoType: 'text',
    url: 'https://www.iciba.com/'
}, {
    logo: 'G',
    logoType: 'text',
    url: 'https://github.com/'
}]; // ??????????????????????????????????????? ????????????????????????????????????

var simplifyUrl = function simplifyUrl(url) {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '') //??????/ ???????????????
    .replace('developer.mozilla.org', 'MDN??????').replace('com.cn', 'com');
}; //?????????????????????API

var render = function render() {
    $siteList.find('li:not(.last)').remove(); //??????????????????li
    hashMap.forEach(function (node, index) {

        var $li = $('<li>\n          <div class="site">\n            <div class="logo">' + node.logo + '</div>\n            <div class="link">' + simplifyUrl(node.url) + '</div>\n            <div class="close">\n              <svg class="icon" aria-hidden="true">\n                <use xlink:href="#icon-Close"></use>\n              </svg>\n            </div>\n          </div>\n        </li>').insertBefore($lastLi);
        $li.on('click', function () {
            window.open(node.url, '_self'); //??????a?????? ????????????????????????????????????
        });
        $li.on('click', '.close', function (e) {
            e.stopPropagation(); //????????????
            if (confirm("?????????????????????????????????")) {
                hashMap.splice(index, 1);
                var string = JSON.stringify(hashMap); //?????????hashMap?????????????????????
                localStorage.removeItem('key', string); //?????????
                localStorage.setItem('key', string); //???????????????
                render(); //????????????
            } else {
                return;
            }
        });
    });
};

render();

$('.addButton').on('click', function () {
    var url = window.prompt('??????????????????????????????????');
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url;
    }
    hashMap.push({
        logo: simplifyUrl(url).toUpperCase()[0], // ???????????????????????????????????????????????????????????????logo
        logoType: 'text',
        url: url
    });
    var string = JSON.stringify(hashMap);
    localStorage.setItem('key', string); // ???????????? ?????????????????????????????????
    render();
});

// window.onbeforeunload = () => { // ???????????????API
//     const string = JSON.stringify(hashMap) //???????????????????????????
//     localStorage.setItem('key', string) //???????????????????????? ????????????key ????????????string
// }

$(document).on('keypress', function (e) {
    // const key = e.key;
    var key = e.key;

    for (var i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url, '_self');
        }
    }
});
var $input = $(".input");
$input.on('keypress', function (e) {
    e.stopPropagation();
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.211003a3.map