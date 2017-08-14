(
 function (window) {
    var self = this;
    

    /* module scope variables begining */

    var _mobileVersionPrefix = moduleHelperReleaseNotes.getMobileVersionPrefix();
	var _disallowedResolutionsArray = moduleHelperReleaseNotes.getDisallowedResolutionsArray();
    
    var _mainPageRedirectionUrl = moduleHelperReleaseNotes.getMainPageUrl();
    var _nextVersionRedirectionUrl = moduleHelperReleaseNotes.getNextVersionRedirectionUrl();


    
    var _salmName = moduleHelperReleaseNotes.getSalmAccessName();

    var _moduleDOM_Object = moduleHelperReleaseNotes.getModuleDOM_Object();

    /* module scope variables end */


    
    /* module scope private functions begining */

    function displayMessageForNotSupportedBrowser_Internal() {
        document.getElementsByTagName("body")[0].innerHTML = "<div class='notSupported'>" + moduleHelperReleaseNotes.getNotSupportedResolution() + "</div>";
    }

    function showPage_Internal() {
        $(".main").css("visibility", "visible");
    }
	
    function goToMainPage_Internal() {
        // generate token for this GET request
        var token = jsUtilities.getDestinationUrlToken();

        window.location.href = _mainPageRedirectionUrl + token;
    }

    function goToNextVersion_Internal() {
        // generate token for this GET request
        var token = jsUtilities.getDestinationUrlToken();

        window.location.href = _nextVersionRedirectionUrl + token;
    }

    function on_SALM_BeingAccessible_Internal() {
        // expose SALM to current window, i.e. make it accessible via window object
        jsUtilities.exposeToCurrentWindowDynamicallyLoadedModuleFromDisk(_salmName);

        // get module config location
        var configFileLocation = moduleHelperReleaseNotes.getModuleConfigLocation();

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
            jsUtilities.clearHash(moduleHelperReleaseNotes.getHashReplacement());
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
        moduleHelperReleaseNotes.promise_SALM_Availability_and_Then(on_SALM_BeingAccessible_Internal);
     }
    }


    self.goToMainPage = function() {
        return goToMainPage_Internal();
    }


    self.goToNextVersion = function() {
        return goToNextVersion_Internal();
    }

    /* ~ Public API */



    /* Expose module API to the outside world */
    window.releaseInfo = window.releaseInfo || self;
    
    /* redirect to mobile version in case of mobile browser */
    jsUtilities.redirectToMobileVersionIfMobileBrowserDetected(_mobileVersionPrefix);
 }
)(window)