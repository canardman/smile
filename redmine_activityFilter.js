// ==UserScript==
// @name         ActivityFilter
// @namespace    ActivityFilter
// @version      0.1
// @description  Add a dropdown to filter by author
// @author       Henri Thibaud
// @match        https://REDMINE_HOST/projects/*/activity
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Shared variables
  var CommonVars = {};

  // Main script
  var Main       = {};

  // In charge to update the view
  var View       = {};

/******************************************************************************
 **** COMMON VARS**************************************************************
 *****************************************************************************/
  // Html elements sorted by authors found on the page
  CommonVars.dataByAuthor = {};

/******************************************************************************
 **** MAIN ********************************************************************
 *****************************************************************************/
  /**
   * Get full elements related to the name element
   */
  Main.getElsFromNameEl = function(nameEl) {
    return nameEl.parent('dd').prev('dt').addBack();
  };

  /**
   * Get all activity elements and sort them by author
   */
  Main.getElementsByNames = function() {
    var userEls = jQuery('#activity .author'),
        mainObj = {};

    userEls.each( function(index, el) {
      el = jQuery( el );
      var name = el.text().trim();

      if( !(name in mainObj) ) {
        mainObj[ name ] = [];
      }
      mainObj[ name ].push( Main.getElsFromNameEl( el, name ) );
    });

    CommonVars.dataByAuthor = mainObj;
  };

/******************************************************************************
 **** VIEW ********************************************************************
 *****************************************************************************/
  View.showElements = function(els) {
    jQuery.each( els, function(index, el) {
      jQuery(el).show();
    });
  };

  View.hideElements = function(els) {
    jQuery.each( els, function(index, el) {
      jQuery(el).hide();
    });
  };

  View.showAll = function(els) {
    jQuery.each( CommonVars.dataByAuthor, function(name, els) {
      View.showElements( els );
    });
  };

  View.update = function(nameShown) {	
    // If given name is empty, reset view to default
    if( typeof nameShown != 'undefined' && nameShown.length <= 0 ) {
      View.showAll();
      return;
    }

    jQuery.each( CommonVars.dataByAuthor , function(name, nameEls) {
      if( name != nameShown ) {			
        View.hideElements( nameEls );
      } else {
        View.showElements( nameEls );        
      }
    });
  };
  
  View.addFilterInPage = function() {
    var fieldsetEl       = jQuery('<fieldset id="filters" style="margin: 20px 0 20px 0"></fieldset>'),
        byAuthorSelectEl = jQuery('<select id="filter-author"></select>'),
        authors          = $.map(
          CommonVars.dataByAuthor,
          function(element,index) {return index;}
        );

    jQuery.each( authors, function(index, author) {
      byAuthorSelectEl.append('<option value="'+ author +'">'+ author +'</option>');
    });

    byAuthorSelectEl.change( function(e) {
      View.update( jQuery( e.target ).find('option:selected').val() );      
    });

    byAuthorSelectEl.prepend('<option value="" selected="selected"></option>');
    fieldsetEl.append(
      '<h3>Filtres</h3>',
      'Auteur : ',
      byAuthorSelectEl
    );    

    jQuery('#activity').prev('p').after( fieldsetEl );
  };

  // Script entry point
  Main.run = function() {
    Main.getElementsByNames();
    console.log(CommonVars.dataByAuthor);
    View.addFilterInPage();    
  };

  Main.run();
  
})();
