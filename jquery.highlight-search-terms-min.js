/*
 * jQuery Plugin: Highlight Search Terms - version 0.1
 * http://github.com/hail2u/jquery.highlight-search-terms
 * Highlight search terms in referrer URL from Google, Yahoo!, Bing and custom site.
 *
 * Copyright (c) 2009 Kyo Nagashima <kyo@hail2u.net>
 * This library licensed under MIT license:
 * http://opensource.org/licenses/mit-license.php
 */
(function(a){a.fn.highlightSearchTerms=function(b){var e=a.extend({},a.fn.highlightSearchTerms.defaults,b);a.merge(e.referrerPatterns,a.fn.highlightSearchTerms.builtinReferrerPatterns);var d=e.referrer||document.referrer;if(d){var c=extractSearchTerms(d,e);if(c!==""){c=new RegExp("("+c+")","gi");this.find(":not(iframe, option, script, textarea)").contents().each(function(){if(this.nodeType===3){var f=this.nodeValue.replace(c,'<em class="'+e.className+'">$1</em>');a(this).replaceWith(f)}})}}return this};extractSearchTerms=function(c,d){var b="";a.each(d.referrerPatterns,function(){var f=new RegExp(this,"i");if(f.exec(c)){var e=new RegExp(d.unsafeChars,"g");b=decodeURIComponent(RegExp.$1).replace(e,"+").replace(/^\+*(.*?)\+*$/,"$1").replace(/\++/g,"|");return false}});return b};a.fn.highlightSearchTerms.defaults={className:"highlight",referrerPatterns:[],unsafeChars:"[!-*,-/:-@[-`{-~]"};a.fn.highlightSearchTerms.builtinReferrerPatterns=["^http://www.google.com.+[&?]q=([^&]+).*$","^http://www.google.co.jp.+[&?]q=([^&]+).*$","^http://search.yahoo.com.+[&?]p=([^&]+).*$","^http://search.yahoo.co.jp.+[&?]p=([^&]+).*$","^http://www.bing.com.+[&?]q=([^&]+).*$"]})(jQuery);