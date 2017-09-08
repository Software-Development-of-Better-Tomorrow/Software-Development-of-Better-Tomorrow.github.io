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
        document.getElementsByTagName("body")[0].addEventListener("load", mobileVersionDesignNotesInfo.loadApplicationModule());

        // assign action to go to main page
        document.getElementsByClassName("goToMainPage")[0].addEventListener("click", goToMainPage_Internal);

        // assign action to go to main page
        document.getElementsByClassName("goToReleaseNotesPage")[0].addEventListener("click", goToReleaseNotes_Internal);        
       }
    );


    /* module scope variables begining */

    var _mobileVersionPrefix = moduleHelperMobileVersionDesignNotes.getMobileVersionPrefix();
    var _disallowedResolutionsArray = moduleHelperMobileVersionDesignNotes.getDisallowedResolutionsArray();
    var _notSupportedResolution = moduleHelperMobileVersionDesignNotes.getNotSupportedResolution();

    var _mainPageRedirectionUrl = moduleHelperMobileVersionDesignNotes.getMainPageUrl();
    var _mainPageUrl_label = moduleHelperMobileVersionDesignNotes.getMainPageUrl_label();

    var _releaseNotesPageRedirectionUrl = moduleHelperMobileVersionDesignNotes.getReleaseNotesPageRedirectionUrl();
    var _releaseNotesPageRedirectionUrl_label = moduleHelperMobileVersionDesignNotes.getReleaseNotesPageRedirectionUrl_label();

    var _nextVersionOverviewTitle = moduleHelperMobileVersionDesignNotes.getNextVersionOverviewTitle();
    

    var _moduleConfigLocation = moduleHelperMobileVersionDesignNotes.getModuleConfigLocation();
    

    var _salmName = moduleHelperMobileVersionDesignNotes.getSalmAccessName();

    var _moduleDOM_Object = moduleHelperMobileVersionDesignNotes.getModuleDOM_Object();

    
    var _hashReplacement = moduleHelperMobileVersionDesignNotes.getHashReplacement();

    /* module scope variables end */


    
    /* module scope private functions begining */

    function handle_AboutTo_ShowPage_Internal() {
        apply_Header_Defaults_Internal();

        apply_NavigationMenu_Defaults_Internal();

        apply_DynamicNextVersionOverviewContainer_Defaults_Internal();

        apply_Footer_Defaults_Internal();

        showPage_Internal();
    }

    function apply_Header_Defaults_Internal() {
        $(".mobileVersionDesignNotesOverviewTitle").prop("innerHTML", _nextVersionOverviewTitle);
    }

    function apply_NavigationMenu_Defaults_Internal() {
        $(".goToMainPage").prop("innerHTML", _mainPageUrl_label);
        
        $(".goToReleaseNotesPage").prop("innerHTML", _releaseNotesPageRedirectionUrl_label);
    }

    function apply_DynamicNextVersionOverviewContainer_Defaults_Internal() {
        $(".windows").prop("innerHTML", "Windows 10 Mobile");

        $(".android").prop("innerHTML", "Android");

        $(".ios").prop("innerHTML", "iOS");
        $(".ios").css("color", "#000000");

        $(".blackberry").prop("innerHTML", "BlackBerry");

        $(".official_name").prop("innerHTML", "S-D-of-B-T 4 Mobile Platform");
        $(".four").prop("innerHTML", "4");
        $(".OS").prop("innerHTML", "OS");
    }

    function apply_Footer_Defaults_Internal() {
        $(".footer").prop("innerHTML", "$\"{x}G v1 available in 2018\";");
    }

    function showPage_Internal() {
         $(".main").css("visibility", "visible");
    }

    function displayMessageForNotSupportedBrowser_Internal() {
        document.getElementsByTagName("body")[0].innerHTML = "<div class='notSupported'>" + _notSupportedResolution + "</div>";
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
        var configFileLocation = _moduleConfigLocation;

        // set callback to invoke on successfull completion
        _moduleDOM_Object.successfullCompletionCallback = handle_AboutTo_ShowPage_Internal;

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
        moduleHelperMobileVersionDesignNotes.promise_SALM_Availability_and_Then(on_SALM_BeingAccessible_Internal);
     }
    }

    /* ~ Public API */



    /* Expose module API to the outside world */
    window.mobileVersionDesignNotesInfo = window.mobileVersionDesignNotesInfo || self;

    /* redirect to mobile version in case of mobile browser */    
    jsUtilities.redirectToMobileVersionIfMobileBrowserDetected(_mobileVersionPrefix);
 }
)(window)