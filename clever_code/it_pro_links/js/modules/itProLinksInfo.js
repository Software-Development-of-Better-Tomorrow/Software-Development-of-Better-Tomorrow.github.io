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
        document.getElementsByTagName("body")[0].addEventListener("load", itProLinksInfo.loadApplicationModule());

        // assign action to go to main page
        document.getElementsByClassName("goToMainPage")[0].addEventListener("click", goToMainPage_Internal);

        // assign action to go to profile page
        document.getElementsByClassName("goToProfile")[0].addEventListener("click", goToProfilePage_Internal);
       }
    );

    /* module scope variables begining */

    var _mobileVersionPrefix = moduleHelperITProLinks.getMobileVersionPrefix();
	var _disallowedResolutionsArray = moduleHelperITProLinks.getDisallowedResolutionsArray();
    var _notSupportedResolution = moduleHelperITProLinks.getNotSupportedResolution();

    var _mainPageRedirectionUrl = moduleHelperITProLinks.getMainPageUrl();
    var _mainPageUrl_label = moduleHelperITProLinks.getMainPageUrl_label();

    var _profilePageRedirectionUrl = moduleHelperITProLinks.getProfileRedirectionUrl();
    var _profileRedirectionUrl_label =  moduleHelperITProLinks.getProfileRedirectionUrl_label();    

    var _proLinksTitle = moduleHelperITProLinks.getProLinksTitle();
    var _proLinkExplanation = moduleHelperITProLinks.getProLinkExplanation();

    var _footerStatement = moduleHelperITProLinks.getFooterStatement();


    var _moduleConfigLocation = moduleHelperITProLinks.getModuleConfigLocation();


    var _salmName = moduleHelperITProLinks.getSalmAccessName();

    var _moduleDOM_Object = moduleHelperITProLinks.getModuleDOM_Object();
    
    var _proLinkExplanationTemporaryData = "proLinkExplanationTemporaryData";
    var _proLinkTitleTemporaryData = "proLinkTitleTemporaryData";

    var _hashReplacement = moduleHelperITProLinks.getHashReplacement();    

    /* module scope variables end */


    
    /* module scope private functions begining */

    function showPage_Internal() {
        $(".main").css("visibility", "visible");
    }

    function displayMessageForNotSupportedBrowser_Internal() {
        document.getElementsByTagName("body")[0].innerHTML = "<div class='notSupported'>" + _notSupportedResolution + "</div>";
    }
    
    function assign_Event_Handler_To_ProLink_Explanation_Internal() {
        // event delegation instead of event handling due to this simple fact:
        // while all resources are being loaded into DOM (i), jQuery has no yet information at that point (i) on dynamically loaded external files
        // which were loaded miliseconds after DOM has been loaded.
        $(document).on('click','.why', function(event) {
            getAndStoreMetadataForCurrentlyClickedLink_Internal(event);

            // generate token for this GET request
            var token = jsUtilities.getDestinationUrlToken();

            window.location.href = _proLinkExplanation + token;
        });
    }

    function apply_Header_Defaults_Internal() {
        $(".proLinksTitle").prop("innerHTML", _proLinksTitle);
    }

    function apply_NavigationMenu_Defaults_Internal() {
        $(".goToMainPage").prop("innerHTML", _mainPageUrl_label);

        $(".goToProfile").prop("innerHTML", _profileRedirectionUrl_label);
    }

    function apply_Footer_Defaults_Internal() {
        $(".footerStatement").prop("innerHTML", _footerStatement);
    }

    function goToMainPage_Internal() {
        // generate token for this GET request
        var token = jsUtilities.getDestinationUrlToken();

        window.location.href = _mainPageRedirectionUrl + token;
    }

    function goToProfilePage_Internal() {
        // generate token for this GET request
        var token = jsUtilities.getDestinationUrlToken();

        window.location.href = _profilePageRedirectionUrl + token;
    }

    function getAndStoreMetadataForCurrentlyClickedLink_Internal(event) {
        if (typeof(Storage) !== "undefined") {
            var currentLink_id_attr = event.target.previousSibling.id;
            var currentLink_innerText_attr = event.target.previousSibling.innerText;

            sessionStorage.setItem(_proLinkExplanationTemporaryData, currentLink_id_attr);
            sessionStorage.setItem(_proLinkTitleTemporaryData, currentLink_innerText_attr);
        } else {
            alert("This browser does not support this functionality. Please use other browsers instead.");
            return;
        }
    }

    function effect_7_Internal() {
        setTimeout(function() {
                $(".dynamicProLinksContainer a").css("color", "whitesmoke");
                effect_1_Internal();
        }, 3000);
    }

    function effect_6_Internal() {
        setTimeout(function() {
                $(".dynamicProLinksContainer a").css("color", "#002050");
                effect_7_Internal();
        }, 3000);
    }

    function effect_5_Internal() {
        setTimeout(function() {
                $(".dynamicProLinksContainer a").css("color", "#D83B01");
                effect_6_Internal();
        }, 3000);
    }

    function effect_4_Internal() {
        setTimeout(function() {
                $(".dynamicProLinksContainer a").css("color", "#5C2D91");
                effect_5_Internal();
        }, 3000);
    }

    function effect_3_Internal() {
        setTimeout(function() {
                $(".dynamicProLinksContainer a").css("color", "#0078D7");
                effect_4_Internal();
        }, 3000);
    }
    function effect_2_Internal() {
        setTimeout(function() {
            $(".dynamicProLinksContainer a").css("color", "#107C10");
            effect_3_Internal();
        }, 3000);
    }
    
    function effect_1_Internal() {
        setTimeout(function() {
            $(".dynamicProLinksContainer a").css("color", "red");
            effect_2_Internal();
        }, 3000);
    }

    function startAnimation_Internal() {
        effect_1_Internal();
    }
    
    function on_SALM_BeingAccessible_Internal() {
        // expose SALM to current window, i.e. make it accessible via window object
        jsUtilities.exposeToCurrentWindowDynamicallyLoadedModuleFromDisk(_salmName);

        // get module config location
        var configFileLocation = _moduleConfigLocation;

        // set callback to invoke on successfull completion
        _moduleDOM_Object.successfullCompletionCallback = finalizeProcessOfDataLoading_Internal;

        // load module config asynchronously
        window.salm.getModuleData(configFileLocation, _moduleDOM_Object);
    }

    function finalizeProcessOfDataLoading_Internal() {
        assign_Event_Handler_To_ProLink_Explanation_Internal();
        apply_Header_Defaults_Internal();
        apply_NavigationMenu_Defaults_Internal();
        apply_Footer_Defaults_Internal();
        startAnimation_Internal();
        showPage_Internal();        
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
        moduleHelperITProLinks.promise_SALM_Availability_and_Then(on_SALM_BeingAccessible_Internal);
     }
    }



    /* ~ Public API */



    /* Expose module API to the outside world */
    window.itProLinksInfo = window.itProLinksInfo || self;

    /* redirect to mobile version in case of mobile browser */    
    jsUtilities.redirectToMobileVersionIfMobileBrowserDetected(_mobileVersionPrefix);
 }
)(window)