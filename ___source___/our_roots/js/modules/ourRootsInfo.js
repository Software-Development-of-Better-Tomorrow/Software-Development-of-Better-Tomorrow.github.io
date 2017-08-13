(
 function (window) {
    var self = this;
    

    /* module scope variables begining */

    var _mobileVersionPrefix = moduleHelperOurRoots.getMobileVersionPrefix();
	var _disallowedResolutionsArray = moduleHelperOurRoots.getDisallowedResolutionsArray();

    var _mainPageRedirectionUrl = moduleHelperOurRoots.getMainPageUrl();
    var _profilePageRedirectionUrl = moduleHelperOurRoots.getProfileRedirectionUrl();
    
    var _moduleBaseDir = moduleHelperOurRoots.getModuleBaseDir();



    var _salmName = moduleHelperOurRoots.getSalmAccessName();

    var _moduleDOM_Object = moduleHelperOurRoots.getModuleDOM_Object();

    var _useBackwardCompatibility = moduleHelperOurRoots.checkBackwardCompatibilityUsage();


    
    var _mapContainerClassName = "mapContainer";

    /* module scope variables end */


    
    /* module scope private functions begining */

    function hidePage_Internal() {
         $(".main").css("visibility", "hidden");
    }

    function displayMessageForNotSupportedBrowser_Internal() {
        document.getElementsByTagName("body")[0].innerHTML = "<div class='notSupported'>" + moduleHelperOurRoots.getNotSupportedResolution() + "</div>";
    }

    function adjustBrowser_Internal() {
        if(activeBrowser.browserUtility.safari) {
            adjustBrowser_Safari_Internal();
        }
    }

    function adjustBrowser_Safari_Internal() {
        alert("This functionality does not work under Safari.\r\nPlease user other browsers instead.");
        return;
    }

    function loadOurRoots_Internal() {
        if(_useBackwardCompatibility === true) {
            var moduleStorageLocation = moduleHelperOurRoots.getModuleStorageLocation();
            doRealOurRootsDataLoad_Internal(moduleStorageLocation);
        }
        else {
            // make sure SALM object is accessible at this point if not previously loaded by any other module
            moduleHelperOurRoots.promise_SALM_Availability_and_Then(on_SALM_BeingAccessible_Internal);
        }
    }

    function on_SALM_BeingAccessible_Internal() {
        // expose SALM to current window, i.e. make it accessible via window object
        jsUtilities.exposeToCurrentWindowDynamicallyLoadedModuleFromDisk(_salmName);

        // get module config location
        var configFileLocation = moduleHelperOurRoots.getModuleConfigLocation();

        // set callback to invoke on successfull completion
        _moduleDOM_Object.successfullCompletionCallback = doRealOurRootsDataLoad_Internal;

        // load module config asynchronously
        window.salm.getModuleData(configFileLocation, _moduleDOM_Object);
    }

    function doRealOurRootsDataLoad_Internal(abstractionOfData) {
        // initialize Google Maps base address
        googleMapsUtilities.initializeBaseAddressAndMapCriticalDataStorageLocation(_moduleBaseDir, abstractionOfData, _useBackwardCompatibility);

        // load user input interface from external file
        googleMapsUtilities.loadMapCriticalData(loadMapCriticalData_Callback_Internal);        
    }

    function loadMapCriticalData_Callback_Internal() {
        // geocode textual address for each family object
        googleMapsUtilities.geocodeAddress(geocodeAddress_Callback_Internal);
    }

    function geocodeAddress_Callback_Internal() {
        // set map container name
        googleMapsUtilities.setMapContainerClassName(_mapContainerClassName);

        // initialize Google Maps instance
        googleMapsUtilities.initMap();
    }

    function goToMainPage_Internal() {
        // generate token for this GET request
        var token = jsUtilities.getDestinationUrlToken();

        window.location.href = _mainPageRedirectionUrl + token;
    }

    function goToProfile_Internal() {
        // generate token for this GET request
        var token = jsUtilities.getDestinationUrlToken();

        window.location.href = _profilePageRedirectionUrl + token;
    }

    function showDistance_Internal() {
        adjustBrowser_Internal();

        googleMapsUtilities.showGuestLocation();
    }

    function processValidationResponse_Internal(booleanFlag) {
        if(booleanFlag) {
            // generate new token to be valid for next GET request
            jsUtilities.setDestinationUrlNewShadowToken();

            // obfuscate token
            jsUtilities.clearHash(moduleHelperOurRoots.getHashReplacement());
        }
    }    

    /* module scope private functions end */

    

    /* Public API */
    
    self.loadApplicationModule = function () {
     var canCurrentBrowserHandleThisPage = activeBrowser.browserUtility.checkMinAllowedResolution_2(screen.width, screen.height, true, _disallowedResolutionsArray) &&
                                           activeBrowser.browserUtility.detectCompatibilityWithCurrentInternetExplorerVersion(9);
                                           
     if (!canCurrentBrowserHandleThisPage) {
        displayMessageForNotSupportedBrowser_Internal();
        hidePage_Internal();
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
     }
    }
    
    self.goToMainPage = function() {
         return goToMainPage_Internal();
    }
    
    self.goToProfile = function() {
         return goToProfile_Internal();
    }

    self.loadOurRoots = function() {
        return loadOurRoots_Internal();
    }

    self.showDistance = function() {
        return showDistance_Internal();
    }

    /* ~ Public API */



    /* Expose module API to the outside world */
    window.ourRootsInfo = window.ourRootsInfo || self;
    
    /* redirect to mobile version in case of mobile browser */
    jsUtilities.redirectToMobileVersionIfMobileBrowserDetected(_mobileVersionPrefix);
 }
)(window)