(
 function (window) {
    var self = this;


    /* module scope variables begining */

    var _mobileVersionPrefix = moduleHelperBlog.getMobileVersionPrefix();
	var _disallowedResolutionsArray = moduleHelperBlog.getDisallowedResolutionsArray();

    var _mainPageRedirectionUrl = moduleHelperBlog.getMainPageUrl();
    var _profilePageRedirectionUrl = moduleHelperBlog.getProfileRedirectionUrl();
    var _OneDriveRedirectionUrl = moduleHelperBlog.getOneDriveRedirectionUrl();
    var _GoogleDriveRedirectionUrl = moduleHelperBlog.getGoogleDriveRedirectionUrl();



    var _salmName = moduleHelperBlog.getSalmAccessName();

    var _moduleDOM_Object = moduleHelperBlog.getModuleDOM_Object();

    var _useBackwardCompatibility = moduleHelperBlog.checkBackwardCompatibilityUsage();

    

    var _pageSpeedNavigationContainerClassName = ".addArea";
    var _pageSpeedNavigationInputValueContainerClassName = ".page_speed_move";
    var _pageSpeedDefaultValueLabel = "set speed of scrolling down (default 10 sec)";

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
    var _isFirstLineHoldingTitle = true;
    var _isLastLineHoldingCreationDate = true;

    var _parentContainerToHostDynamicContentEditor = ".main";
    var _editorDynamicContentCssClass = "blogEditor";

    /* module scope variables end */


    
    /* module scope private functions begining */

    function showPage_Internal() {
        $(".main").css("visibility", "visible");
    }

    function displayMessageForNotSupportedBrowser_Internal() {
        document.getElementsByTagName("body")[0].innerHTML = "<div class='notSupported'>" + moduleHelperBlog.getNotSupportedResolution() + "</div>";
    }

    function adjustBrowser_Internal() {
        // all of the below funcs do nothing but fill in circle-like "go top" button with green color

        if(activeBrowser.browserUtility.chrome) {
            adjustBrowser_Chrome_Internal();
        }
        else if(activeBrowser.browserUtility.opera) {
            adjustBrowser_Opera_Internal();
        }        
        else if(activeBrowser.browserUtility.safari) {
            adjustBrowser_Safari_Internal();
        }
    }

    function adjustBrowser_Chrome_Internal() {
        $(".off_the_main_page").css("width", "4.495em");
    }

    function adjustBrowser_Opera_Internal() {
        $(".off_the_main_page").css("width", "4.495em");
    }

    function adjustBrowser_Safari_Internal() {
        $(".off_the_main_page a").css("padding-bottom", "23%");
    }

    function adjustScrollSpeedInputFieldBasedOnCurrentResolution_Internal() {
        // adjust scroll speed for large screens, i.e. 27"
        if(screen.width === 2560 && screen.height === 1440) {
            $(_pageSpeedNavigationContainerClassName).css("height",  "6.2em");
        }
    }

    function loadBlog_Internal(abstractionOfData) {
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

    function assignEventHandlers_Internal() {
        $(_pageSpeedNavigationContainerClassName).focusin(function() {
            handleAddAreaGotFoucs_Internal();
        });
        
        $(_pageSpeedNavigationContainerClassName).focusout(function() {
            handleAddAreaLostFoucs_Internal();
        });

        $(_pageSpeedNavigationInputValueContainerClassName).keypress(function() {
            handleAddAreaInputKeyPress_Internal();
        });

        $(_pageSpeedNavigationInputValueContainerClassName).keyup(function() {
            handleAddAreaInputKeyUp_Internal();
        });

        blogUtilities.manageStartStopPageScrollingDown();
    }

    function goToBottomOfThePage_Internal() {
        raiseClickEvent_GoBottom_Internal();
    }

    function goToTopOfThePage_Internal() {
        raiseClickEvent_GoTop_Internal();
    }

    function raiseClickEvent_GoBottom_Internal() {
        var page = $("html, body");

         $(page).animate({ scrollTop: $(document).height() }, blogUtilities.getPageSpeedDefaultValue() * 1000);
        
        blogUtilities.setPageIsBeingScrolled(true);
    }

    function raiseClickEvent_GoTop_Internal() {
        var page = $("html, body");
        $(page).animate({ scrollBottom: $(document).height() }, blogUtilities.getPageSpeedDefaultValue());
        blogUtilities.setPageIsBeingScrolled(false);
        blogUtilities.setPageIsPaused(false);
    }

    function handleAddAreaGotFoucs_Internal() {
        var speedValue = $(_pageSpeedNavigationInputValueContainerClassName).val().trim();

        if(speedValue == _pageSpeedDefaultValueLabel) {
            $(_pageSpeedNavigationInputValueContainerClassName).val("");
        }
    }

    function handleAddAreaInputKeyPress_Internal() {
        $(_pageSpeedNavigationInputValueContainerClassName).css("font-size", "2em");

        if(screen.width === 2560 && screen.height === 1440) {
            $(_pageSpeedNavigationContainerClassName).css("height", "8em");
            $(_pageSpeedNavigationInputValueContainerClassName).css("height", "2.75em");
        }
        else {
            $(_pageSpeedNavigationContainerClassName).css("height", "7.2em");
        }     

        $(_pageSpeedNavigationContainerClassName).css("background-color", "darkred");
        
        $(_pageSpeedNavigationInputValueContainerClassName).css("background-color", "lightgray");
    }

    function handleAddAreaInputKeyUp_Internal() {
        setTimeout(function() {
            if(screen.width === 2560 && screen.height === 1440) {
                $(_pageSpeedNavigationContainerClassName).css("height", "6.2em");
                $(_pageSpeedNavigationInputValueContainerClassName).css("height", "3em");
            }
            else {
                $(_pageSpeedNavigationContainerClassName).css("height", "5.7em");
            }

            $(_pageSpeedNavigationInputValueContainerClassName).css("font-size", "1.5em");
            $(_pageSpeedNavigationContainerClassName).css("background-color", "whitesmoke");

            $(_pageSpeedNavigationInputValueContainerClassName).css("background-color", "white");
        }, 1000);
    }

    function handleAddAreaLostFoucs_Internal() {
        var speedValue = $(_pageSpeedNavigationInputValueContainerClassName).val().trim();

        if(speedValue == "") {
            $(_pageSpeedNavigationInputValueContainerClassName).val(_pageSpeedDefaultValueLabel);
        }   
        else {
            var parsedValue = parseInt(speedValue);
            var is_NaN = isNaN(parsedValue);
            if(is_NaN == false) {
                blogUtilities.setPageSpeedDefaultValue(parsedValue);
            }
            else {
                location.reload();
                alert("Provide valid integer number.");
                return;
            }
        }
    }

    function runBlogEditor_Internal(editorContainerUniqueID) {
        return blogUtilities.runContentEditor(editorContainerUniqueID);
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

    function goToOneDrive_Internal() {
         window.open(_OneDriveRedirectionUrl,'_blank');
    }

    function goToGoogleDrive_Internal() {
        window.open(_GoogleDriveRedirectionUrl,'_blank');
    }

    function download_Internal(url) {
         window.open(url,'_blank');
    }

    function on_SALM_BeingAccessible_Internal() {
        // expose SALM to current window, i.e. make it accessible via window object
        jsUtilities.exposeToCurrentWindowDynamicallyLoadedModuleFromDisk(_salmName);

        // get module config location
        var configFileLocation = moduleHelperBlog.getModuleConfigLocation();

        // set callback to invoke on successfull completion
        _moduleDOM_Object.successfullCompletionCallback = initializeBlogFunctionality_Internal;

        // load module config asynchronously
        window.salm.getModuleData(configFileLocation, _moduleDOM_Object);
    }

    function initializeBlogFunctionality_Internal(abstractionOfData) {
        loadBlog_Internal(abstractionOfData);
        assignEventHandlers_Internal();
        adjustBrowser_Internal();
        adjustScrollSpeedInputFieldBasedOnCurrentResolution_Internal();
        showPage_Internal();
    }

    function processValidationResponse_Internal(booleanFlag) {
        if(booleanFlag) {
            // generate new token to be valid for next GET request
            jsUtilities.setDestinationUrlNewShadowToken();

            // obfuscate token
            jsUtilities.clearHash(moduleHelperBlog.getHashReplacement());
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
                var moduleStorageLocation = moduleHelperBlog.getModuleStorageLocation();
                initializeBlogFunctionality_Internal(moduleStorageLocation);
            }
            else {
                // make sure SALM object is accessible at this point if not previously loaded by any other module
                moduleHelperBlog.promise_SALM_Availability_and_Then(on_SALM_BeingAccessible_Internal);
            }
     }
    }

    self.goToBottomOfThePage = function() {
        return goToBottomOfThePage_Internal();
    }
    
    self.goToTopOfThePage = function() {
        return goToTopOfThePage_Internal();
    }

    self.runBlogEditor = function(editorContainerUniqueID) {
        return runBlogEditor_Internal(editorContainerUniqueID);
    }

    self.goToMainPage = function() {
         return goToMainPage_Internal();
    }
    
    self.goToProfilePage = function() {
         return goToProfilePage_Internal();
    }

    self.goToOneDrive = function() {
        return goToOneDrive_Internal();
    }

    self.goToGoogleDrive = function() {
        return goToGoogleDrive_Internal();
    }
    
    self.download = function(url) {
        return download_Internal(url);
    }

    /* ~ Public API */



    /* Expose module API to the outside world */
    window.blogInfo = window.blogInfo || self;

    /* redirect to mobile version in case of mobile browser */    
    jsUtilities.redirectToMobileVersionIfMobileBrowserDetected(_mobileVersionPrefix);
 }
)(window)