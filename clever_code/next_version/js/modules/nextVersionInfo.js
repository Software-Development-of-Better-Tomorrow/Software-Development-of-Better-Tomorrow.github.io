(
 function (window) {
    var self = this;
    

    /* module scope variables begining */

    var _mobileVersionPrefix = moduleHelperNextVersion.getMobileVersionPrefix();
	var _disallowedResolutionsArray = moduleHelperNextVersion.getDisallowedResolutionsArray();

    var _mainPageRedirectionUrl = moduleHelperNextVersion.getMainPageUrl();
    var _releaseNotesPageRedirectionUrl = moduleHelperNextVersion.getReleaseNotesPageRedirectionUrl();


    
    var _salmName = moduleHelperNextVersion.getSalmAccessName();

    var _moduleDOM_Object = moduleHelperNextVersion.getModuleDOM_Object();

    /* module scope variables end */


    
    /* module scope private functions begining */

    function showPage_Internal() {
         $(".main").css("visibility", "visible");
    }

    function displayMessageForNotSupportedBrowser_Internal() {
        document.getElementsByTagName("body")[0].innerHTML = "<div class='notSupported'>" + moduleHelperNextVersion.getNotSupportedResolution() + "</div>";
    }
    
    function goToMainPage_Internal() {
        // generate token for this GET request
        var token = jsUtilities.getDestinationUrlToken();

        window.location.href = _mainPageRedirectionUrl + token;
    }

    function goToReleaseNotes_Internal() {
        // generate token for this GET request
        var token = jsUtilities.getDestinationUrlToken();

        window.location.href = _releaseNotesPageRedirectionUrl + token;
    }

    function on_SALM_BeingAccessible_Internal() {
        // expose SALM to current window, i.e. make it accessible via window object
        jsUtilities.exposeToCurrentWindowDynamicallyLoadedModuleFromDisk(_salmName);

        // get module config location
        var configFileLocation = moduleHelperNextVersion.getModuleConfigLocation();

        // set callback to invoke on successfull completion
        _moduleDOM_Object.successfullCompletionCallback = showPage_Internal;

        // load module config asynchronously
        window.salm.getModuleData(configFileLocation, _moduleDOM_Object);
    }    
    
    function processValidationResponse_Internal(booleanFlag) {
        if(booleanFlag) {
            // generate new token to be valid for next GET request
            jsUtilities.setDestinationUrlNewShadowToken();

            // obfuscate token
            jsUtilities.clearHash(moduleHelperNextVersion.getHashReplacement());
        }
    }

    /* module scope private functions end */

    

    /* Public API */
    
    self.loadApplicationModule = function () {
     var canCurrentBrowserHandleThisPage = activeBrowser.browserUtility.checkMinAllowedResolution_2(screen.width, screen.height, true, _disallowedResolutionsArray) &&
                                           activeBrowser.browserUtility.detectCompatibilityWithCurrentInternetExplorerVersion(9);
                                           
     if (!canCurrentBrowserHandleThisPage) {
        displayMessageForNotSupportedBrowser_Internal();         
     }
     else {
        /* token stuff */

        if(jsUtilities.isCurrentOperationSetToWrite()) {
            // generate new token to be valid for next GET request
            jsUtilities.setDestinationUrlNewShadowToken();
            
            // set next operation to READ mode
            jsUtilities.determineNextOperationWritableStatus();

            // set fallback address
            jsUtilities.setFallbackUrl(window.location.href);
        }
        else {
            // if validation fails this method aborts execution in the context in which it is being invoked and reverts to the calling url
            jsUtilities.checkDestinationUrlToken_and_AllowForGeneratingNewIfValidationFailed(processValidationResponse_Internal);

            // set fallback address
            jsUtilities.setFallbackUrl(window.location.href);
        }
        
        /* ~ token stuff */


        // make sure SALM object is accessible at this point if not previously loaded by any other module
        moduleHelperNextVersion.promise_SALM_Availability_and_Then(on_SALM_BeingAccessible_Internal);
     }
    }
    
    self.goToMainPage = function() {
         return goToMainPage_Internal();
    }
    
    self.goToReleaseNotes = function() {
         return goToReleaseNotes_Internal();
    }

    /* ~ Public API */



    /* Expose module API to the outside world */
    window.nextVersionInfo = window.nextVersionInfo || self;

    /* redirect to mobile version in case of mobile browser */    
    jsUtilities.redirectToMobileVersionIfMobileBrowserDetected(_mobileVersionPrefix);
 }
)(window)