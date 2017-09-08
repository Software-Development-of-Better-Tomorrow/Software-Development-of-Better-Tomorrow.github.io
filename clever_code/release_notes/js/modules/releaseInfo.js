(
 function (window) {
    var self = this;


    /*
     Trigger module's entry point as soon as HTML document has been completely loaded and parsed (althought some images, frames & other external resources may still be loading).
     This allows for current module to kick off its entry point method as soon as possible with View (HTML file) knowing nothing about mechanism
     that renders View's layout.
     This is further separation of concerns (~ Static MVC) AFAIK and towards better CSP (Content Security Policy).
    */
    document.addEventListener("DOMContentLoaded", function(event) {
                                                    document.getElementsByTagName("body")[0].addEventListener("load", releaseInfo.loadApplicationModule());
                                                  }
    );


    /* module scope variables begining */

    var _mobileVersionPrefix = moduleHelperReleaseNotes.getMobileVersionPrefix();
	var _disallowedResolutionsArray = moduleHelperReleaseNotes.getDisallowedResolutionsArray();
    var _notSupportedResolution = moduleHelperReleaseNotes.getNotSupportedResolution();

    var _mainPageRedirectionUrl = moduleHelperReleaseNotes.getMainPageUrl();
    var _mainPageRedirectionUrl_label = moduleHelperReleaseNotes.getMainPageUrl_label();

    var _nextVersionRedirectionUrl = moduleHelperReleaseNotes.getNextVersionRedirectionUrl();
    var _nextVersionRedirectionUrl_label = moduleHelperReleaseNotes.getNextVersionRedirectionUrl_label();

    var _mobileVersionDesignNotesRedirectionUrl = moduleHelperReleaseNotes.getMobileVersionDesignNotesRedirectionUrl();
    var _mobileVersionDesignNotesRedirectionUrl_label = moduleHelperReleaseNotes.getMobileVersionDesignNotesRedirectionUrl_label();


    var _moduleConfigLocation = moduleHelperReleaseNotes.getModuleConfigLocation();

    var _salmName = moduleHelperReleaseNotes.getSalmAccessName();

    var _moduleDOM_Object = moduleHelperReleaseNotes.getModuleDOM_Object();


    var _hashReplacement = moduleHelperReleaseNotes.getHashReplacement();

    /* module scope variables end */


    
    /* module scope private functions begining */

    function displayMessageForNotSupportedBrowser_Internal() {
        document.getElementsByTagName("body")[0].innerHTML = "<div class='notSupported'>" + _notSupportedResolution + "</div>";
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

    function goToMobileVersionDesignNotes_Internal() {
        // generate token for this GET request
        var token = jsUtilities.getDestinationUrlToken();

        window.location.href = _mobileVersionDesignNotesRedirectionUrl + token;
    }

    function on_SALM_BeingAccessible_Internal() {
        // expose SALM to current window, i.e. make it accessible via window object
        jsUtilities.exposeToCurrentWindowDynamicallyLoadedModuleFromDisk(_salmName);

        // get module config location
        var configFileLocation = _moduleConfigLocation;

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
            jsUtilities.clearHash(_hashReplacement);
        }
    }

    function assign_EventHandlers_Internal() {
        $(".goToMainPage").click(goToMainPage_Internal);
        
        $(".goToNextVersion").click(goToNextVersion_Internal);

        $(".goToMobileVersionDesignNotes").click(goToMobileVersionDesignNotes_Internal);
    }

    function apply_NavigationMenu_Defaults_Internal() {
        $(".goToMainPage").prop("innerHTML", _mainPageRedirectionUrl_label);

        $(".goToNextVersion").prop("innerHTML", _nextVersionRedirectionUrl_label);

        $(".goToMobileVersionDesignNotes").prop("innerHTML", _mobileVersionDesignNotesRedirectionUrl_label);
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

        // assign event handlers
        assign_EventHandlers_Internal();

        // apply navigation menu defaults
        apply_NavigationMenu_Defaults_Internal();
     }
    }

    /* ~ Public API */



    /* Expose module API to the outside world */
    window.releaseInfo = window.releaseInfo || self;
    
    /* redirect to mobile version in case of mobile browser */
    jsUtilities.redirectToMobileVersionIfMobileBrowserDetected(_mobileVersionPrefix);
 }
)(window)