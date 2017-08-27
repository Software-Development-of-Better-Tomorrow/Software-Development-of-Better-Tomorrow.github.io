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
        document.getElementsByTagName("body")[0].addEventListener("load", bioInfo.loadApplicationModule());

        // assign action to go to main page
        document.getElementsByClassName("goToMainPage")[0].addEventListener("click", goToMainPage_Internal);

        // assign action to go to profile page
        document.getElementsByClassName("goToProfilePage")[0].addEventListener("click", goToProfilePage_Internal);

        // assign action to go to profile page
        document.getElementsByClassName("goToGithubPage")[0].addEventListener("click", goToGitHubPage_Internal);                
       }
    );
    
    
    /* module scope variables begining */

    var _mobileVersionPrefix = moduleHelperBio.getMobileVersionPrefix();
	var _disallowedResolutionsArray = moduleHelperBio.getDisallowedResolutionsArray();

    var _mainPageRedirectionUrl = moduleHelperBio.getMainPageUrl();
    var _profilePageRedirectionUrl = moduleHelperBio.getProfileRedirectionUrl();
    var _GitHubPageRedirectionUrl = moduleHelperBio.getGitHubRedirectionUrl();
    


    var _salmName = moduleHelperBio.getSalmAccessName();

    var _moduleDOM_Object = moduleHelperBio.getModuleDOM_Object();
    
    var _useBackwardCompatibility = moduleHelperBio.checkBackwardCompatibilityUsage();


    
    var _modulePrefix = jsUtilities.getModulePrefix(); // this method executes in the context of this module, i.e. this module's relative path location.
    var _storageFileName = _modulePrefix + "_storage.txt";
    
    var _dynamicContentProcessorFilePath = "/#/" + _modulePrefix + "/php/contentSaver.php";
    var _dynamicContentProcessorRelativePathToStorage = "../upload/" + _storageFileName;

    var _parentContainerCssClass = ".content";                          // note that here you provide full CSS class identifier
    var _dataDivContainerCssClassName = "entry";                        // note that here you provide only CSS class name
    var _dataDivLineDefinitionContainerCssClassName = "lineDefinition"; // note that here you provide only CSS class name
    var _dataDivContainerTitleCssClassName = "entryTitle";              // note that here you provide only CSS class name
    var _dataDivContainerCreationDateCssClassName = "postedOnDate";     // note that here you provide only CSS class name
    var _errorDivContainerCssClassName = "error";                       // note that here you provide only CSS class name
    var _isFirstLineHoldingTitle = false;
    var _isLastLineHoldingCreationDate = true;

    var _parentContainerToHostDynamicContentEditor = ".main";
    var _editorDynamicContentCssClass = "bioEditor";

    /* module scope variables end */


    
    /* module scope private functions begining */

    function showPage_Internal() {
        $(".main").css("visibility", "visible");
    }

    function displayMessageForNotSupportedBrowser_Internal() {
        document.getElementsByTagName("body")[0].innerHTML = "<div class='notSupported'>" + moduleHelperBio.getNotSupportedResolution() + "</div>";
    }

    function adjustBrowser_Safari_Internal() {
        $(".broadAudienceQA").css("top", "30%");
        $(".broadAudienceQA").css("left", "5%");
        $(".broadAudienceQA").css("font-size", "12px");
        adjustBrowser_All_Internal();
    }

    function adjustBrowser_All_Internal() {
        setTimeout(function() {
            $(".broadAudienceQA").css("visibility", "visible");
        }, 2000);
    }

    function adjustSpecificBrowser_Internal() {
        if(activeBrowser.browserUtility.safari) {
            adjustBrowser_Safari_Internal();
        }
        else {
            adjustBrowser_All_Internal();
        }
    }

    function loadBio_Internal(abstractionOfData) {
        blogUtilities.initializeBlogFunctionality(
                                                    _useBackwardCompatibility,
                                                    abstractionOfData,
                                                    _parentContainerCssClass,
                                                    _dataDivContainerCssClassName,
                                                    _dataDivLineDefinitionContainerCssClassName,
                                                    _dataDivContainerTitleCssClassName,
                                                    _dataDivContainerCreationDateCssClassName,
                                                    _errorDivContainerCssClassName,
                                                    _parentContainerToHostDynamicContentEditor,
                                                    _editorDynamicContentCssClass,
                                                    _dynamicContentProcessorFilePath,
                                                    _dynamicContentProcessorRelativePathToStorage,
                                                    null,
                                                    null,
                                                    null,
                                                    _isFirstLineHoldingTitle,
                                                    _isLastLineHoldingCreationDate
                                                 );
    }

    function runBioEditor_Internal(editorContainerUniqueID) {
        return blogUtilities.runContentEditor(editorContainerUniqueID);
    }

    function setupFlash_Internal() {
		swfobject.embedSWF("images/technologies.swf", "technologies", "100%", "100%", "10", false, {}, {scale: "exactFit"}, {});
	}

    function apply_Header_Defaults_Internal() {
        $(".since").prop("innerHTML", moduleHelperBio.getProgrammingExperience_since());

        $(".through").prop("innerHTML", moduleHelperBio.getProgrammingExperience_through());

        $(".now").prop("innerHTML", moduleHelperBio.getProgrammingExperience_now());

        $(".bioTitle").prop("innerHTML", moduleHelperBio.getBioTitle());

        $(".programmerExperienceLeadingThought").prop("innerHTML", moduleHelperBio.getProgrammerExperienceLeadingThought());
    }

    function apply_NavigationMenu_Defaults_Internal() {
        $(".goToMainPage").prop("innerHTML", moduleHelperBio.getMainPageUrl_label());

        $(".goToProfilePage").prop("innerHTML", moduleHelperBio.getProfileRedirectionUrl_label());

        $(".goToGithubPage").prop("innerHTML", moduleHelperBio.getGitHubRedirectionUrl_label());
    }

    function apply_BroadAudienceQA_Defaults_Internal() {
        $(".broadAudienceQA").prop("innerHTML", moduleHelperBio.getBroadAudienceQA());
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

    function goToGitHubPage_Internal() {
        window.open(_GitHubPageRedirectionUrl,'_blank');
    }
    
    function on_SALM_BeingAccessible_Internal() {
        // expose SALM to current window, i.e. make it accessible via window object
        jsUtilities.exposeToCurrentWindowDynamicallyLoadedModuleFromDisk(_salmName);

        // get module config location
        var configFileLocation = moduleHelperBio.getModuleConfigLocation();

        // set callback to invoke on successfull completion
        _moduleDOM_Object.successfullCompletionCallback = initializeBioFunctionality_Internal;

        // load module config asynchronously
        window.salm.getModuleData(configFileLocation, _moduleDOM_Object);
    }    

    function initializeBioFunctionality_Internal(abstractionOfData) {
        adjustSpecificBrowser_Internal();
        setupFlash_Internal();
        apply_Header_Defaults_Internal();
        apply_NavigationMenu_Defaults_Internal();
        apply_BroadAudienceQA_Defaults_Internal();
        loadBio_Internal(abstractionOfData);
        showPage_Internal();
    }

    function processValidationResponse_Internal(booleanFlag) {
        if(booleanFlag) {
            // generate new token to be valid for next GET request
            jsUtilities.setDestinationUrlNewShadowToken();

            // obfuscate token
            jsUtilities.clearHash(moduleHelperBio.getHashReplacement());
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

        
            if(_useBackwardCompatibility === true) {
                var moduleStorageLocation = moduleHelperBio.getModuleStorageLocation();
                initializeBioFunctionality_Internal(moduleStorageLocation);
            }
            else {
                // make sure SALM object is accessible at this point if not previously loaded by any other module
                moduleHelperBio.promise_SALM_Availability_and_Then(on_SALM_BeingAccessible_Internal);
            }
     }
    }

    self.runBioEditor = function(editorContainerUniqueID) {
        return runBioEditor_Internal(editorContainerUniqueID);
    }

    /* ~ Public API */



    /* Expose module API to the outside world */
    window.bioInfo = window.bioInfo || self;

    /* redirect to mobile version in case of mobile browser */    
    jsUtilities.redirectToMobileVersionIfMobileBrowserDetected(_mobileVersionPrefix);
 }
)(window)