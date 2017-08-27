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

    var _programmerExperience = "Software Engineer";
    var _bloggerExperience = "Junior Development Blogger";


    var _mainPageUrl = _siteRootFolder + "main/";
    var _mainPageUrl_label = "| go to main page ";

    var _profileRedirectionUrl = _siteRootFolder + "profile/";
    var _profileRedirectionUrl_label = "| go to profile page";

    var _bottomOfThePage = "scroll down";

    var _footerStatement = "these are my subjective reflections on what is software development and are aimed at nobody in person";

    var _OneDriveRedirectionUrl = "https://1drv.ms/f/s!Av2ZrNqOVnWLrXv9QGwAepdMS_Zn";

    var _GoogleDriveRedirectionUrl = "https://drive.google.com/drive/folders/0BzIsC0KCs7ppUElZNVNlMWVuTzA?usp=sharing";


    var _salmAccessName = "salm";

    var _salmLocation = _siteRootFolder + "salm.js";

    var _pathToConfig = _siteRootFolder + "blog/config.txt";

    var _pathToStorage = _siteRootFolder + "blog/upload/blog_storage.txt";
    
    var _useBackwardCompatibility = false;

    var _moduleDOM_Object = {
                parentContainerCssClass : null,
                dataDivContainerCssClassName : null,
                dataDivLineDefinitionContainerCssClassName : null,
                errorDivContainerCssClassName : null,
                isFirstLineHoldingTitle : false,
                isLastLineHoldingCreationDate : false,
                titleCssClassName : null,
                creationDateCssClassName : null,
                successfullCompletionCallback : null,
                return_data_instead_of_loading_into_DOM : true,
                use_flat_file_storage_view_bag_data : false,
                flat_file_storage_view_bag_data : null
    };

    var _hashReplacement = "[access granted]";

    /**
     * Copyright (c) 2017-present, Facebook, Inc. All rights reserved.
     *
     * You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
     * copy, modify, and distribute this software in source code or binary form for use
     * in connection with the web services and APIs provided by Facebook.
     *
     * As with any software that integrates with the Facebook platform, your use of
     * this software is subject to the Facebook Platform Policy
     * [http://developers.facebook.com/policy/]. This copyright notice shall be
     * included in all copies or substantial portions of the software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
     * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
     * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
     * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
     * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    */    
    var _Facebook_ID = "facebook-jssdk";
    var _Facebook_SDK_url = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10";

    var _siteUrl = "https://software-development-of-better-tomorrow.github.io/clever_code/blog/#" + _hashReplacement;

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

    self.getProgrammerExperience = function() {
        return _programmerExperience;
    }

    self.getBloggerExperience = function() {
        return _bloggerExperience;
    }

    self.getMainPageUrl = function() {
        return _mainPageUrl;
    }

    self.getMainPageUrl_label = function() {
        return _mainPageUrl_label;
    }

    self.getProfileRedirectionUrl = function() {
        return _profileRedirectionUrl;
    }

    self.getProfileRedirectionUrl_label = function() {
        return _profileRedirectionUrl_label;
    }

    self.getBottomOfThePage = function() {
        return _bottomOfThePage;
    }

    self.getFooterStatement = function() {
        return _footerStatement;
    }

    self.getOneDriveRedirectionUrl = function() {
        return _OneDriveRedirectionUrl;
    }

    self.getGoogleDriveRedirectionUrl = function() {
        return _GoogleDriveRedirectionUrl;
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

    self.getModuleStorageLocation = function() {
        return _pathToStorage;
    }    

    self.getModuleDOM_Object = function() {
        return _moduleDOM_Object;
    }

    self.checkBackwardCompatibilityUsage = function() {
        return _useBackwardCompatibility;
    }

    self.getHashReplacement = function() {
        return _hashReplacement;
    }

    self.getFacebook_ID = function() {
        return _Facebook_ID;
    }

    self.getFacebook_SDK_url = function() {
        return _Facebook_SDK_url;
    }

    self.getSiteUrl = function() {
        return _siteUrl;
    }

    /* ~ Public API */


    
    /* Expose module API to the outside world */
    window.moduleHelperBlog = window.moduleHelperBlog || self;
})(window)