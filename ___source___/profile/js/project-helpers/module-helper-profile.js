/*!
 * ModuleHelper
 * (c) Software Development of Better Tomorrow
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function (window) {

    var self = this;
	

    /* module scope variables begining */    

    var _siteRootFolder = "/___source___/";

    var _mobileVersionPrefix = "m-";

    var _disallowedResolutionsArray = ["640", "480", "800", "600", "1024", "600", "1024", "768", "1152", "864", "1280", "720"];

    var _notSupportedResolution = "This site does not support this browser or resolution." +
                                  "<br />" +
                                  "Please use Google Chrome, Opera, Safari, Firefox, Microsoft Edge or IE &gt; 8" +
                                  "<br />" +
                                  "Please use higher resolution." +
                                  "<br />" +
                                  "13\" Notebook is the base device supported. (1280 x 768)";



    var _mainPageUrl = _siteRootFolder + "main/";

    var _blogPageRedirectionUrl = _siteRootFolder + "blog/";

    var _bioPageRedirectionUrl = _siteRootFolder + "bio/";

    var _ITProLinksPageRedirectionUrl = _siteRootFolder + "it_pro_links/";

    var _ourRootsPageRedirectionUrl = _siteRootFolder + "our_roots/";

    var _hashReplacement = "[access granted]";

    var _fullSiteName = "Software Development of Better Tomorrow";

    /* module scope variables end */



    /* Public API */

    self.getMobileVersionPrefix = function() {
        return _mobileVersionPrefix;
    }

    self.getDisallowedResolutionsArray = function() {
        return _disallowedResolutionsArray;
    }

    self.getMainPageUrl = function() {
        return _mainPageUrl;
    }

    self.getBlogPageRedirectionUrl = function() {
        return _blogPageRedirectionUrl;
    }
    
    self.getBioPageRedirectionUrl = function() {
        return _bioPageRedirectionUrl;
    }

    self.getITProLinksPageRedirectionUrl = function() {
        return _ITProLinksPageRedirectionUrl;
    }

    self.getOurRootsPageRedirectionUrl = function() {
        return _ourRootsPageRedirectionUrl;
    }

    self.getNotSupportedResolution = function() {
        return _notSupportedResolution;
    }

    self.getHashReplacement = function() {
        return _hashReplacement;
    }    

    self.getFullSiteName = function() {
        return _fullSiteName;
    }

    /* ~ Public API */


    
    /* Expose module API to the outside world */
    window.moduleHelperProfile = window.moduleHelperProfile || self;
})(window)