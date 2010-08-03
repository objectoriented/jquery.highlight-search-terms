TITLE
=====

jQuery Plugin: Highlight Search Terms - version 0.2

DESCRIPTION
===========

Highlight search terms in referrer URL from Google, Yahoo!, Bing and custom site.

Usage
=====

Highlight all contents of body element:

    $("body").highlightSearchTerms();

Highlight with custom class name:

    $("body").highlightSearchTerms({
      className: "keyword"
    });

Support custom referrer pattern:

    $("body").highlightSearchTerms({
      referrerPatterns: [
        "^http://example\.com.+[&?]query=([^&]+).*$"
      ]
    });

Display a welcome message to searchers:

    $("body").highlightSearchTerms({
      titleContainer: ".welcome-searchers"
    });

    <style>
    div.welcome-searchers {
        display:none;
        border:1px solid #ccc;
        background-color:#ffc;
        padding:10px;
        font-weight:700;
    }
    </style>

    <div class="welcome-searchers">
        Thanks for visiting! We've highlighted your search terms: &quot;<span class="referring-search-terms"></span>&quot;
    </div>

LICENSE
=======

Copyright (c) 2009 Kyo Nagashima <kyo@hail2u.net><br />
This library licensed under MIT license:<br />
http://opensource.org/licenses/mit-license.php<br />
