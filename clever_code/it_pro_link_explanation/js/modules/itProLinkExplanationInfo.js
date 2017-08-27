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
        document.getElementsByTagName("body")[0].addEventListener("load", itProLinkExplanationInfo.loadApplicationModule());

        // assign action to go to main page
        document.getElementsByClassName("goToMainPage")[0].addEventListener("click", goToMainPage_Internal);

        // assign action to go to IT Pro Links page
        document.getElementsByClassName("goToProLinksPage")[0].addEventListener("click", goToITProLinksPage_Internal);        
       }
    );


    /* module scope variables begining */

    var _mobileVersionPrefix = moduleHelperITProLinkExplanation.getMobileVersionPrefix();
	var _disallowedResolutionsArray = moduleHelperITProLinkExplanation.getDisallowedResolutionsArray();

    var _mainPageRedirectionUrl = moduleHelperITProLinkExplanation.getMainPageUrl();
    var _proLinksPageRedirectionUrl = moduleHelperITProLinkExplanation.getITProLinksPageRedirectionUrl();



    var _salmName = moduleHelperITProLinkExplanation.getSalmAccessName();

    var _moduleDOM_Object = moduleHelperITProLinkExplanation.getModuleDOM_Object();    


    
    var _currentStorageFormatExtension = moduleHelperITProLinkExplanation.getCurrentStorageFormatExtension();

    var _proLinkExplanationTemporaryData = "proLinkExplanationTemporaryData";
    var _proLinkTitleTemporaryData = "proLinkTitleTemporaryData";

    /* module scope variables end */


    
    /* module scope private functions begining */

    function showPage_Internal() {
        $(".main").css("visibility", "visible");
    }

    function displayMessageForNotSupportedBrowser_Internal() {
        document.getElementsByTagName("body")[0].innerHTML = "<div class='notSupported'>" + moduleHelperITProLinkExplanation.getNotSupportedResolution() + "</div>";
    }

    function loadProLinkExplanationOtherStuff_Internal() {
        var proLink_Title_Attr = sessionStorage.getItem(_proLinkTitleTemporaryData);

        // inject pro link's display text
        injectExplanationTitle_Internal(proLink_Title_Attr);
    }

    function apply_Header_Defaults_Internal() {
        $(".proLinkExplanationTitle").prop("innerHTML", moduleHelperITProLinkExplanation.getProLinkExplanationTitle());
    }

    function apply_NavigationMenu_Defaults_Internal() {
        $(".goToMainPage").prop("innerHTML", moduleHelperITProLinkExplanation.getMainPageUrl_label());

        $(".goToProLinksPage").prop("innerHTML", moduleHelperITProLinkExplanation.getITProLinksPageRedirectionUrl_label());
    }

    function goToMainPage_Internal() {
        // generate token for this GET request
        var token = jsUtilities.getDestinationUrlToken();

        window.location.href = _mainPageRedirectionUrl + token;
    }

    function goToITProLinksPage_Internal() {
        // generate token for this GET request
        var token = jsUtilities.getDestinationUrlToken();

        window.location.href = _proLinksPageRedirectionUrl + token;
    }
    
    function download_Internal(url) {
         window.open(url,'_blank');
    }    

    function injectExplanationTitle_Internal(titleOfExplanation) {
        setTimeout(
                    function() {
                        $(_moduleDOM_Object.titleCssClassName).css('visibility', 'visible');
                        $(_moduleDOM_Object.titleCssClassName).prop('innerHTML', titleOfExplanation);

                        setTimeout(function() {
                            $(_moduleDOM_Object.titleCssClassName).css('background-color', '#e9f5f8');
                        }, 800);
                    },
                    1000
                  );
    }

    function on_SALM_BeingAccessible_Internal() {
        // expose SALM to current window, i.e. make it accessible via window object
        jsUtilities.exposeToCurrentWindowDynamicallyLoadedModuleFromDisk(_salmName);

        // get module config location
        var configFileLocation = moduleHelperITProLinkExplanation.getModuleConfigLocation();

        // set callback to invoke on successfull completion
        _moduleDOM_Object.successfullCompletionCallback = finalizeProcessOfDataLoading_Internal;

        // set context of IT Pro Link being invoked
        setContextOfITProLinkInvocation_Internal();

        // load module config asynchronously
        window.salm.getModuleData(configFileLocation, _moduleDOM_Object);
    }    

    function setContextOfITProLinkInvocation_Internal() {        
        var proLink_Id_Attr = sessionStorage.getItem(_proLinkExplanationTemporaryData);
        
        // set context for being used only if config file uses flat file storage, otherwise it has no effect
        _moduleDOM_Object.use_flat_file_storage_view_bag_data = true;
        _moduleDOM_Object.flat_file_storage_view_bag_data = proLink_Id_Attr + _currentStorageFormatExtension;
    }

    function finalizeProcessOfDataLoading_Internal() {
        loadProLinkExplanationOtherStuff_Internal();
        apply_Header_Defaults_Internal();
        apply_NavigationMenu_Defaults_Internal();
        showPage_Internal();
    }

    function processValidationResponse_Internal(booleanFlag) {
        if(booleanFlag) {
            // generate new token to be valid for next GET request
            jsUtilities.setDestinationUrlNewShadowToken();

            // obfuscate token
            jsUtilities.clearHash(moduleHelperITProLinkExplanation.getHashReplacement());
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
         moduleHelperITProLinkExplanation.promise_SALM_Availability_and_Then(on_SALM_BeingAccessible_Internal);
     }
    }

    self.download = function(url) {
        return download_Internal(url);
    }

    /* ~ Public API */



    /* Expose module API to the outside world */
    window.itProLinkExplanationInfo = window.itProLinkExplanationInfo || self;

    /* redirect to mobile version in case of mobile browser */    
    jsUtilities.redirectToMobileVersionIfMobileBrowserDetected(_mobileVersionPrefix);
 }
)(window)