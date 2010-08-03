/*!
 * jQuery Plugin: Highlight Search Terms - version 0.3
 * http://github.com/objectoriented/jquery.highlight-search-terms
 * Highlight search terms in referrer URL from Google, Yahoo!, Bing and custom site.
 *
 * Copyright (c) 2009 Kyo Nagashima <kyo@hail2u.net>
 * This library licensed under MIT license:
 * http://opensource.org/licenses/mit-license.php
 */
(function ($) {
  $.fn.highlightSearchTerms = function (options) {
    var o = $.extend({}, $.fn.highlightSearchTerms.defaults, options);
    $.merge(o.referrerPatterns, $.fn.highlightSearchTerms.builtinReferrerPatterns);
    var ref = o.referrer || document.referrer;

    if (ref) {
      var searchTerms = extractSearchTerms(ref, o);

      // Replace search terms
      var stopWordRegex = new RegExp("\\b(" + o.stopWords.join("|") + "\\|?)\\b", "gi");
      var highlightedTerms = searchTerms.replace(stopWordRegex, "").replace(/[\\|]+/g, '|').replace(/^[\\|]/, '').replace(/[\\|]$/, '');
      
      // Highlight terms
      if (highlightedTerms !== "") {

        if (o.titleContainer) {
	        $("span.referring-search-terms").each(function () {
                $(this).text(searchTerms.split('|').join(' '));
	        });
        	$(o.titleContainer).each(function() {
        		$(this).show();
        	});
        }

        var regex = new RegExp("(" + highlightedTerms + ")", "gi");
        var highlighted = "<em class=\"" + encodeEntities(o.className) + "\">$1</em>";
        this.find(":not(iframe, option, script, textarea)").contents().each(function () {
          if (this.nodeType === 3) {
            var s = encodeEntities(this.nodeValue).replace(regex, highlighted);
            $(this).replaceWith(s);
          }
        });
        
      }
    }

    return this;
  };

  // Private: Extract terms from referrer
  function extractSearchTerms (ref, o) {
    var terms = "";

    $.each(o.referrerPatterns, function () {
      var pattern = new RegExp(this, "i");

      if (pattern.exec(ref)) {
        var unsafe = new RegExp(o.unsafeChars, "g");
        terms = decodeURIComponent(RegExp.$1).replace(unsafe, "+").replace(/^\+*(.*?)\+*$/, "$1").replace(/\++/g, "|");

        return false; // break $.each
      }
    });

    return terms;
  }

  // Private: Encode entities
  function encodeEntities (s) {
    return $("<u/>").text(s).html(); // jQuery magic
  }

  // Public: default options
  $.fn.highlightSearchTerms.defaults = {
    className:        "highlight",
    referrerPatterns: [],
    unsafeChars:      "[!-*,-/:-@[-`{-~]",
    stopWords:        ["a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also","although","always","am","among", "amongst", "amoungst", "amount",  "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around", "as",  "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom","but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven","else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the"]
  };

  // Public: built-in referrer patterns for Google(com|co.jp), Yahoo!(com|co.jp), Bing.
  $.fn.highlightSearchTerms.builtinReferrerPatterns = [
    "^http://www\.google\.com.+[&?]q=([^&]+).*$",
    "^http://www\.google\.co\.jp.+[&?]q=([^&]+).*$",
    "^http://search\.yahoo\.com.+[&?]p=([^&]+).*$",
    "^http://search\.yahoo\.co\.jp.+[&?]p=([^&]+).*$",
    "^http://www\.bing\.com.+[&?]q=([^&]+).*$"
  ];
})(jQuery);
