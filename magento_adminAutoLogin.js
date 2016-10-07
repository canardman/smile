// ==UserScript==
// @name         MagentoAdminAutologin
// @namespace    Magento Admin Autologin
// @version      0.1
// @description  Auto login on Magento 1 back office login page. Only for dev environment.
// @author       henri.thibaud@gmail.com
//
// @match        http://MAGENTO_HOST/admin*
// @match        http://MAGENTO_HOST/index.php/admin*
//
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

/***************************************************************
**** Set your config here **************************************
***************************************************************/
var confs = [
  {
    user: 'username',
    password: 'password',
    urlFilters: [/^(http|https):\/\/MAGENTO_HOST\/(index.php\/)?admin/]
  },
];

/***************************************************************
**** Script functions ******************************************
***************************************************************/
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

/***************************************************************
**** Script logic **********************************************
***************************************************************/
var conf = null;
for( conf of confs ) {
  if( pageMatch( conf.urlFilters ) ) {
    document.getElementById('username').value = conf.user;
    document.getElementById('login').value    = conf.password;
    document.getElementById('loginForm').submit();
  }
}

