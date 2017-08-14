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
   

    var _siteName = "S-D-of-B-T";
                                  
    var _siteVersion = "v19.5";
                                  
    var _getCopyrightYear = new Date().getFullYear().toString();

    
    var _profileRedirectionUrl = _siteRootFolder + "profile/";

    var _releaseNotesRedirectionUrl = _siteRootFolder + "release_notes/";

    
    var _YouTubeRedirectionUrl = "https://www.youtube.com/channel/UCE8Av5RpY69s0LDfbq0chwA";

    var _Channel9RedirectionUrl = "https://channel9.msdn.com/niners/DabrowskiSoftwareDevelopment";

    
    var _downlodRootFolder = _siteRootFolder + "main/download/";
    var _CV_doc = _downlodRootFolder + "CV.doc";
    var _CV_pdf = _downlodRootFolder + "CV.pdf";
    var _LM_doc = _downlodRootFolder + "LM.doc";
    var _LM_pdf = _downlodRootFolder + "LM.pdf";

    var _downloadSourceCodeDescription = "Download code";
    var __downloadSourceCodeRedirectionUrl = "https://github.com/Software-Development-of-Better-Tomorrow/Software-Development-of-Better-Tomorrow.github.io/archive/master.zip";


    var _openSourceRedirectionUrl = "https://open-source-4-better-tomorrow.github.io";

    
    var _hashReplacement = "[access granted]";

    /* module scope variables end */



    /* Public API */

    self.getMobileVersionPrefix = function() {
        return _mobileVersionPrefix;
    }

    self.getDisallowedResolutionsArray = function() {
        return _disallowedResolutionsArray;
    }

    self.getProfileRedirectionUrl = function() {
        return _profileRedirectionUrl;
    }

    self.getYouTubeRedirectionUrl = function() {
        return _YouTubeRedirectionUrl;
    }    

    self.getChannel9RedirectionUrl = function() {
        return _Channel9RedirectionUrl;
    }

    self.getCV_docRedirectionUrl = function() {
        return _CV_doc;
    }

    self.getCV_pdfRedirectionUrl = function() {
        return _CV_pdf;
    }

    self.getLM_docRedirectionUrl = function() {
        return _LM_doc;
    }

    self.getLM_pdfRedirectionUrl = function() {
        return _LM_pdf;
    }

    self.getDownloadSourceCodeRedirectionUrl = function() {
        return __downloadSourceCodeRedirectionUrl;
    }

    self.getReleaseNotesRedirectionUrl = function() {
        return _releaseNotesRedirectionUrl;
    }
    
    self.getOpenSourceRedirectionUrl = function() {
        return _openSourceRedirectionUrl;
    }

    self.getSiteName = function() {
        return _siteName;
    }

    self.getSiteVersion = function() {
        return _siteVersion;
    }

    self.getCopyrightYear = function() {
        return _getCopyrightYear;
    }

    self.getDownloadSourceCodeDescription = function() {
        return _downloadSourceCodeDescription;
    }

    self.getNotSupportedResolution = function() {
        return _notSupportedResolution;
    }

    self.getHashReplacement = function() {
        return _hashReplacement;
    }    

    /* ~ Public API */


    
    /* Expose module API to the outside world */
    window.moduleHelperMain = window.moduleHelperMain || self;
})(window)