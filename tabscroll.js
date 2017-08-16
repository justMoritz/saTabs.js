/* moritzzimmer.com
 *
 * written by Moritz Zimmer, 2016 – 2017
 * http://www.moritzzimmer.com
 *
 * (c) 2017 CC Attribution 4.0
 * https://creativecommons.org/licenses/by/4.0/legalcode
 *
 */
var saTabs = (function( $ ){

  /* * Tabs Functionality * */
  var _saTabs = function () {

    // checks the current location, matches it to the href-containing link, and adds correct class to parent
    var __activeClassHelperFunction = function($inputLoc){
      for (i=0; i<$tabscroll_anchors.length; i++){
        if( $($tabscroll_anchors[i]).attr('href') === "#"+$inputLoc ){
          $('.tabscroll_activeNavi').removeClass('tabscroll_activeNavi');
          $($tabscroll_anchors[i]).parent().addClass('tabscroll_activeNavi');
        }
      }
    };

    function hashChangeFunct () {
      // writing the URL that raised the event into a string
      var $location = String(document.location);

      // stripping off everything before the hash
      $location = $location = $location.split("#")[1];

      // if there is no hash, basically...
      if ($location === undefined || $location === 'all' ){
          // show only the first section
          $("[data-tabscroll]:first-of-type").show();   
          $("[data-tabscroll]:first-of-type").addClass('activeTab');   
      }
      // if there is a hash-link active
      else{
        //hide all tabs
        $("[data-tabscroll]").hide().removeClass('activeTab');   


        // fade in only the tab with the data-tabscroll attribute corresponding
        // to the link that was clicked.
        if ( $transition_type === 'fade') {
          $("[data-tabscroll='"+$location+"']").fadeIn().addClass('activeTab');   
          __activeClassHelperFunction($location);

        } 
        else if ( $transition_type === 'slide') {
          $("[data-tabscroll='"+$location+"']").slideDown().addClass('activeTab');   
          __activeClassHelperFunction($location);
        }
        else{
          $("[data-tabscroll='"+$location+"']").show().addClass('activeTab');   
          __activeClassHelperFunction($location);
        }
      }             
    }

    function setUpPage() {
      // finds all anchor tabs within the data-tabscrollnavcontainer
      $tabscroll_anchors = $("[data-tabscrollnavcontainer]").find("a").not("[data-saexclude]");

      // if we pass a type in here, we can control the method of change. Right now we can do fade, slide and none.
      $transition_type = $("[data-tabscrollnavcontainer]").attr("data-tabscrollnavcontainer");
      
      // adds the active class to the first tab-navigation
      $($tabscroll_anchors[0]).parent().addClass("tabscroll_activeNavi");

      for ($i = 0; $i < $tabscroll_anchors.length; $i++){

        // targets each and every link's href-attribute found within the tabscrollnavcontainer
        var $eachAnchor = $($tabscroll_anchors[$i]).attr("href");
    
        // adds the navigational data-attribute to each anchor tag's parent
        $($tabscroll_anchors[$i]).parent().attr("data-tabscrollnavi", $eachAnchor.substring(1)); 
        
        // we then use this anchor to find each element, section, etc. that has the 
        // same ID as the anchor tag we found.
        
        // sets a custom data-tabscroll attribute to each section that correspons
        // with the link in the navigation, stripping off the # (substring)
        $($eachAnchor).attr("data-tabscroll", $eachAnchor.substring(1));
      }    
    }
     
    setUpPage();
 
    // remove each id tag of an data-tabscroll element
    $("[data-tabscroll]").removeAttr('id');
     
    // hiding all sections initially except the one specified.
    $("[data-tabscroll]:first-of-type").siblings("[data-tabscroll]").hide();   
    
    /*
     * stores the previous hash, then listens if it has changed every frew millisectons
     * Needed for IE9. Adapted from https://stackoverflow.com/questions/680785/on-window-location-hash-change    
     */
    var prevHash = window.location.hash;
    window.setInterval(function () {
      if (window.location.hash !== prevHash) {
        prevHash = window.location.hash;
        hashChangeFunct();
      }
    }, 100);
    
    // initial Hash Change Setup
    $(window).load(function(){
       hashChangeFunct();
    });

    /* // not currently used, left for reference
    $(window).on('hashchange', function (event) {  

      // triggers the hashchange manually on pageload. 
      // Adapted from http://stackoverflow.com/questions/20652020/the-hashchange-event-of-jquery-doesnt-work-if-i-open-a-page-with-hash-directly
    }).trigger('hashchange'); */

    console.log('saTabs initiated');
  }; // End saTabs


  /* * Init Function * */
  var init = function(input){
    
    // Document Ready 
    $(function(){
      _saTabs();
    });
  };


  /* 
   * Public Methods
   */
  return{
    init: init,
  };
})(jQuery);


