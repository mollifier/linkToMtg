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

  function createHTMLDocument(source) {
    var XHTML_NS = 'http://www.w3.org/1999/xhtml';
    var doctype = document.implementation.createDocumentType('html',
      '-//W3C//DTD HTML 4.01//EN', 'http://www.w3.org/TR/html4/strict.dtd');
    var doc = document.implementation.createDocument(XHTML_NS, 'html', doctype);
    var range = document.createRange();
    range.selectNodeContents(document.documentElement);
    var content = doc.adoptNode(range.createContextualFragment(source));
    doc.documentElement.appendChild(content);
    return doc;
  }

  var xpath = '/html/body/div/div/div/div/div[3]/b/a';
  var wisdomGuildUrl = $X(xpath)[0].href;

  GM_xmlhttpRequest({
    method: 'GET',
    url: wisdomGuildUrl,
    onload: function(res) {
      var doc =  createHTMLDocument(res.responseText);
      var gathererLinkXpath =
        '/descendant::*[local-name() = "a" or local-name() = "A"][starts-with(@href, "http://gatherer.wizards.com")]';

      var as = $X(gathererLinkXpath, doc);
      var gathererLinkUrl = as[0].href;

      var newA = document.createElement('a');
      newA.href = gathererLinkUrl;
      newA.appendChild(document.createTextNode("gatherer"));

      var content = document.getElementById('bodyContent');
      if (content) {
        content.parentNode.insertBefore(newA, content);
      }
    }
  });
})();

