// ==UserScript==
// @name         FlagEnvironment
// @namespace    FlagEnvironment
// @version      0.1
// @description  Add a fixed bar ontop of page to be sure you are on the right environment
// @author       Henri Thibaud

// @match        http://HOST*
// @match        https://HOST*

// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

/***************************************************************
**** Set your config here **************************************
***************************************************************/
var confs = [
  {
    'urlFilters': [/(http|https):\/\/HOST2\/*/, /(https|http):\/\/HOST1/],
    'color': 'red',
    'txt': 'PROD',
    'repeat': 5
  },
  {
   'urlFilters': [/(http|https):\/\/HOST2\/*/, /(https|http):\/\/HOST1/],
   'color': 'orange',
   'txt': 'PREPROD',
   'repeat': 5
  },
];

/***************************************************************
**** Script functions ******************************************
***************************************************************/
/*
 * String helper
 */
var StringUtilities = {
    /*
     * Repeat the given string x times in a new string
     */
    repeat: function(str, times) {
       return (new Array(times + 1)).join( str );
    }
};

/*
 * Given a array of regex, check if current page match at least one regex
 */
function pageMatch(regexArray) {
  var regex = null;
  for( regex of regexArray ) {
    if( location.href.match( regex ) ) {
        return true;
    }
  }
  return false;
}

/*
 * Add a fixed flag on top of paged, based on the given conf object
 */
function addFlag(conf) {
  var body = document.getElementsByTagName('body')[0],
      bar  = document.createElement('div'),
      txt  = conf.txt + ' ';

  if( typeof conf.repeat != 'undefined' && conf.repeat ) {
      txt = StringUtilities.repeat( txt, conf.repeat );
  }

  bar.id               = "flag-env";
  bar.textContent      = txt;
  bar.style.height     = '20px';
  bar.style.width      = '100%';
  bar.style.position   = "fixed";
  bar.style.zIndex     = "9999";
  bar.style.fontWeight = "bold";
  bar.style.textAlign  = "center";
  bar.style.background = conf.color;

  body.insertBefore(bar, body.firstChild);
}

/***************************************************************
**** Script logic **********************************************
***************************************************************/
var conf = null;
for( conf of confs ) {
  if( pageMatch( conf.urlFilters ) ) {
    addFlag( conf );
    break;
  }
}
