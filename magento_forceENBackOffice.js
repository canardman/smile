// ==UserScript==
// @name         Magento Force EN Back Office
// @namespace    magentoENBackOffice
// @version      0.1
// @description  Set Magento 1 BO to EN after login
// @author       Henri Thibaud
// @match        http*://*/index.php/admin/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var selectEl = document.getElementById('interface_locale');

if( selectEl !== null ) {
    if( selectEl.value != 'en_US' ) {
        selectEl.value = 'en_US';
        selectEl.dispatchEvent( new Event('change') );
    }
}
