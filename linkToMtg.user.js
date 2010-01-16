// ==UserScript==
// @name linkToMtg
// @namespace http://d.hatena.ne.jp/mollifier/
// @description Add link to MTG gatherer
// @include http://mtgwiki.com/wiki/*
// ==/UserScript==
//
// auther : mollifier http://d.hatena.ne.jp/mollifier/
// version : 0.0.1
//
// linkToMtg is released under the MIT License.
// http://www.opensource.org/licenses/mit-license.php

(function() {

  // http://gist.github.com/29681
  function $X (exp, context, resolver, result_type) {
    context || (context = document);
    var Doc = context.ownerDocument || context;
    var result = Doc.evaluate(exp, context, resolver, result_type || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (result_type) return result;
      for (var i = 0, len = result.snapshotLength, res = new Array(len); i < len; i++) {
        res[i] = result.snapshotItem(i);
      }
      return res;
  }

  var xpath = '/html/body/div/div/div/div/div[3]/b/a';
  var wisdomGuildUrl = $X(xpath)[0].href;

  GM_xmlhttpRequest({
    method: 'GET',
    url: wisdomGuildUrl,
    onload: function(res) {
      console.log(res.responseText);
    }
  });
})();

