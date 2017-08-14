/*!
 * ModuleHelper
 * (c) Software Development of Better Tomorrow
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function (window) {

    var self = this;
	

    /* module scope variables begining */    

    var _siteRootFolder = "/clever_code/";

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

    var _ITProLinksPageRedirectionUrl = _siteRootFolder + "it_pro_links/";


    var _salmAccessName = "salm";

    var _salmLocation = _siteRootFolder + "salm.js";

    var _pathToConfig = _siteRootFolder + "it_pro_link_explanation/config.txt";

    var _currentStorageFormatExtension = ".txt";

    var _moduleDOM_Object = {
                parentContainerCssClass : ".content",
                dataDivContainerCssClassName : "dynamicProLinkExplanationContainer",
                dataDivLineDefinitionContainerCssClassName : null,
                errorDivContainerCssClassName : "error",
                isFirstLineHoldingTitle : false,
                isLastLineHoldingCreationDate : true,
                titleCssClassName : ".explanationTitle",
                creationDateCssClassName : "postedOnDate",
                successfullCompletionCallback : null,
                return_data_instead_of_loading_into_DOM : false,
                use_flat_file_storage_view_bag_data : false,
                flat_file_storage_view_bag_data : null
    };

    var _hashReplacement = "[access granted]";

    /* module scope variables end */



    /* module scope private functions begining */

    function promise_SALM_Availability_and_Then_Internal(callback) {
        var exists = typeof(window.salm) !== "undefined";

        if(!exists) {
            jsUtilities.loadDynamicallyModuleFromDisk(_salmAccessName, _salmLocation, callback);
        }
    }

    /* module scope private functions end */



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

    self.getITProLinksPageRedirectionUrl = function() {
        return _ITProLinksPageRedirectionUrl;
    }

    self.getNotSupportedResolution = function() {
        return _notSupportedResolution;
    }

    self.getSalmAccessName = function() {
        return _salmAccessName;
    }

    self.promise_SALM_Availability_and_Then = function(callback) {
        return promise_SALM_Availability_and_Then_Internal(callback);
    }
    
    self.getModuleConfigLocation = function() {
        return _pathToConfig;
    }

    self.getCurrentStorageFormatExtension = function() {
        return _currentStorageFormatExtension;
    }

    self.getModuleDOM_Object = function() {
        return _moduleDOM_Object;
    }    

    self.getHashReplacement = function() {
        return _hashReplacement;
    }
        
    /* ~ Public API */


    
    /* Expose module API to the outside world */
    window.moduleHelperITProLinkExplanation = window.moduleHelperITProLinkExplanation || self;
})(window)