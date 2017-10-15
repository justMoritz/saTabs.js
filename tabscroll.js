/* moritzzimmer.com
 * Tabscroll 1.4.0
 *
 * written by Moritz Zimmer, 2016 – 2017
 * http://www.moritzzimmer.com
 *
 * (c) 2017 CC Attribution 4.0
 * https://creativecommons.org/licenses/by/4.0/legalcode
 *
 */
var saTabs = (function( $ ){

  var _global = {
    indexable: true,
  };

 /**
  * Public Helper Method that sets the Application status to non-indexable 
  */
  var nonID = function(){
    _global.indexable = false;
  };


/* * SA Tabs Functionality * * /
   * 
   *
   * The SA Tabs Functionality Chain: 
   * 1.) saTabs ->
   * 1.1) -> 3
   * 1.2) -> (Hash Change Listener, triggers 3)
   *
   * 2.) _saTabsSetUpPage
   * 3.) _saTabsHashChangeFunct
   *
   * 
   * 2: _saTabsSetUpPage: 
   *    Finds all anchor tabs within the data-tabscrollnavcontainer and reads the attribute.
   *    If a type was passed here, it will control the method of change: fade, slide and none.
   *    The active class is added to the first tab-navigation
   *
   *    Then loops and targets each and every link's href-attribute found within the tabscrollnavcontainer
   *    and adds the navigational data-attribute to each anchor tag's parent
   *      
   *    We then use this anchor to find each element, section, etc. that has the 
   *    same ID as the anchor tag we found.
   *
   *    Final section sets a custom data-tabscroll attribute to each section that correspons
   *    with the link in the navigation, stripping off the # (substring)
   *
   *    Also Removes each id tag of an data-tabscroll element (to help some browsers prevent)
   *    default behaviour, and hiding all sections initially except the one specified.
   */
  var _saTabsSetUpPage = function() {
    $tabscrollAnchors = $("[data-tabscrollnavcontainer]").find("a").not("[data-saexclude]");
    $transition_type = $("[data-tabscrollnavcontainer]").attr("data-tabscrollnavcontainer");
    $($tabscrollAnchors[0]).parent().addClass("tabscroll_activeNavi");

    for ($i = 0; $i < $tabscrollAnchors.length; $i++){
      var $curEl = $($tabscrollAnchors[$i]),
          eachAnchor = $curEl.attr("href");
      $curEl.parent().attr("data-tabscrollnavi", eachAnchor.substring(1)); 
      $(eachAnchor).attr("data-tabscroll", eachAnchor.substring(1));

      // removes link if in non-indexable version (to not interfere with app status keeping)
      if(!_global.indexable){
        $curEl.removeAttr("href").css('cursor', 'pointer');
        $curEl.on('click', function(){
          var tab_target = $(this).parent().attr("data-tabscrollnavi");
          console.log( tab_target );
          _saTabsHashChangeFunct(tab_target);
        });
      }
    }
    
    $("[data-tabscroll]").removeAttr('id');
    $("[data-tabscroll]:first-of-type").siblings("[data-tabscroll]").hide();   
  };

  /**
   *
   * 3: _saTabsHashChangeFunct: 
   *    Called both initially in saTabs and also on each Hash (URL fragment) change, monitured
   *    by the saTabs Method.
   *
   *    If this function is called with an input parameter, use that as location. This means it was
   *    called as the non-indexed version through a click event. If not, grab location from the href
   *
   *    Writing the URL that raised the event into a string, stripping off everything before the hash
   *    In order to parse the users navigational input.
   *
   *    If there is no hash (or it set to 'all'), show only the first section of tab content.
   *    If there is a hash-link active, function will hide all tabs, fade in only the tab with 
   *    the data-tabscroll attribute corresponding to the link that was clicked.
   *
   *    Finally, also checks for the 'fade' and 'slide' transition types, and executes different 
   *    funcionality, which I would like to break out into different functions eventually.
   */
  var _saTabsHashChangeFunct = function( masterinput ) {
    /* checks the current location, matches it to the element containing the link, and adds correct class */
    var __activeClassHelperFunction = function(inputLoc){
      var $naviEls = $('[data-tabscrollnavi]');
      for (i=0; i<$naviEls.length; i++){
        var $curEl = $($naviEls[i]);
        if( $curEl.data('tabscrollnavi') === inputLoc ){
          $('.tabscroll_activeNavi').removeClass('tabscroll_activeNavi');
          $curEl.addClass('tabscroll_activeNavi');
        }
      }
    };

    var location;

    if (typeof masterinput !== 'undefined') {
      location = masterinput;
    }
    else{
      location = String(document.location);    
      location = location = location.split("#")[1]; // wtf is this ...
    }

    if (location === undefined || location === 'all' ){
        $("[data-tabscroll]:first-of-type").show();   
        $("[data-tabscroll]:first-of-type").addClass('activeTab');   
    }
    else{
      $("[data-tabscroll]").hide().removeClass('activeTab');   

      if ( $transition_type === 'fade') {
        $("[data-tabscroll='"+location+"']").fadeIn().addClass('activeTab');   
        __activeClassHelperFunction(location);

      } 
      else if ( $transition_type === 'slide') {
        $("[data-tabscroll='"+location+"']").slideDown().addClass('activeTab');   
        __activeClassHelperFunction(location);
      }
      else{
        $("[data-tabscroll='"+location+"']").show().addClass('activeTab');   
        __activeClassHelperFunction(location);
      }
    }             
  };

  /**
   *
   * 1: saTabs: 
   *    Runs the _saTabsSetUpPage function, the initial instance of the _saTabsHashChangeFunct,
   *    then also monitors the hash change to run the _saTabsHashChangeFunct as needed.
   *    Only Monitors hash change if the indexable setting is set to true
   *
   *    Hash changed is implemented as follows:
   *    Stores the previous hash, then listens if it has changed every frew millisectons
   *    Needed for IE9. Adapted from https://stackoverflow.com/questions/680785/on-window-location-hash-change
   *
   *    (In previous versions, this had been triggered by $(window).on('hashchange', function (event) { )
   */
  var saTabs = function () {
    _saTabsSetUpPage();

    if(_global.indexable){
      var prevHash = window.location.hash;
      window.setInterval(function () {
        if (window.location.hash !== prevHash) {
          prevHash = window.location.hash;
          _saTabsHashChangeFunct();
        }
      }, 100);
    }
    
    $(window).load(function(){
       _saTabsHashChangeFunct();
    });

    console.log('saTabs initiated');
  }; 


  /* * Init Function * */
  var init = function(input){
    saTabs();
  };


  /* 
   * Public Methods
   */
  return{
    init: init,
    nonID: nonID,
  };
})(jQuery);


$(function(){
  saTabs.init();
});