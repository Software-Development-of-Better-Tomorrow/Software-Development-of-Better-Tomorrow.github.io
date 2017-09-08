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
                                                    document.getElementsByTagName("body")[0].addEventListener("load", domainInfo.loadApplicationModule());
                                                  }
    );


    /* module scope variables begining */

    var _mobileVersionPrefix = moduleHelperMain.getMobileVersionPrefix();
	var _disallowedResolutionsArray = moduleHelperMain.getDisallowedResolutionsArray();
    var _notSupportedResolution = moduleHelperMain.getNotSupportedResolution();

    var _profileRedirectionUrl = moduleHelperMain.getProfileRedirectionUrl();
    var _profileRedirectionUrlAnimationHander = null;
    
    var _siteName = moduleHelperMain.getSiteName();

    var _idea = moduleHelperMain.getIdea();

    var _dossierTitle = moduleHelperMain.getDossierTitle();
    var _dossierUpdate = moduleHelperMain.getDossierUpdate();

    var _copyrightYear = moduleHelperMain.getCopyrightYear();
    var _siteName = moduleHelperMain.getSiteName();
    var _siteVersion = moduleHelperMain.getSiteVersion();
    
    var _YouTubeRedirectionUrl = moduleHelperMain.getYouTubeRedirectionUrl();
    var _Channel9RedirectionUrl = moduleHelperMain.getChannel9RedirectionUrl();
    
    var _CV_docRedirectionUrl = moduleHelperMain.getCV_docRedirectionUrl();
    var _CV_pdfRedirectionUrl = moduleHelperMain.getCV_pdfRedirectionUrl();
    var _LM_docRedirectionUrl = moduleHelperMain.getLM_docRedirectionUrl();
    var _LM_pdfRedirectionUrl = moduleHelperMain.getLM_pdfRedirectionUrl();

    var _downloadSourceCodeDescription = moduleHelperMain.getDownloadSourceCodeDescription();
    var _downloadSourceCodeRedirectionUrl = moduleHelperMain.getDownloadSourceCodeRedirectionUrl();

    var _releaseNotesRedirectionUrl = moduleHelperMain.getReleaseNotesRedirectionUrl();

    var _openSourceRedirectionUrl = moduleHelperMain.getOpenSourceRedirectionUrl();
    
    var _hashReplacement = moduleHelperMain.getHashReplacement();

    /* module scope variables end */


    
    /* module scope private functions begining */

    function showSplash_Internal() {

        $("body").css("overflow-y", "hidden");

        setTimeout(function() {
            $(".splash").css("opacity", "0.05");
        }, 500);

        setTimeout(function() {
            $(".splash").css("opacity", "0.1");
        }, 1000);

        setTimeout(function() {
            $(".splash").css("opacity", "0.25");
        }, 1500);        

        setTimeout(function() {
            $(".splash").css("opacity", "0.4");
        }, 3000);

        setTimeout(function() {
            $(".splash").css("opacity", "0.6");
        }, 4000);

        setTimeout(function() {
            $(".splash").css("opacity", "0.8");
        }, 5000);

        setTimeout(function() {
            $(".splash").css("opacity", "1");
            $(".splash").css("height", "0");
            $("body").css("overflow-y", "auto");

            showMainContent_Internal();
        }, 7000);
    }

    function showMainContent_Internal() {
		showPage_Internal();
        turn_on_yt_ch9_animation_Internal();
        turn_on_dots_animation_Internal();
    }

    function showPage_Internal() {
        $(".main").css("visibility", "visible");
    }

    function displayMessageForNotSupportedBrowser_Internal() {
        document.getElementsByTagName("body")[0].innerHTML = "<div class='notSupported'>" + _notSupportedResolution + "</div>";
    }
    
	function changePageLayoutDynamically_Internal(cssFilesLoader) {
        var cssLinkItem = document.createElement("link");
		
		if (typeof cssLinkItem !== "undefined") {
			cssLinkItem.setAttribute("href", cssFilesLoader);
			cssLinkItem.setAttribute("type", "text/css");
			cssLinkItem.setAttribute("rel", "stylesheet");
			
			var headItem = document.getElementsByTagName("head")[0];
			headItem.removeChild(headItem.childNodes[headItem.childNodes.length-2]);
			headItem.appendChild(cssLinkItem);			
		}
	}
	
    function applySiteHeightBasedOnCurrentResolution_Internal() {
        // set default site height for all common home resolutions
        $(".main").css("height", "45em");
        // adjust site height for large screens, i.e. 27"
        if(screen.width === 2560 && screen.height === 1440) {
            $(".main").css("height",  "55em");
        }
    }

    function goToProfile_Internal() {
        // generate token for this GET request
        var token = jsUtilities.getDestinationUrlToken();

        window.location.href = _profileRedirectionUrl + token;
    }

    function goToYouTube_Internal() {
        window.open(_YouTubeRedirectionUrl, "_blank");
    }

    function goToChannel9_Internal() {
        window.open(_Channel9RedirectionUrl, "_blank");
    }

    function download_CV_doc_Internal() {
        window.open(_CV_docRedirectionUrl, "_blank");
    }

    function download_CV_pdf_Internal() {
        window.open(_CV_pdfRedirectionUrl, "_blank");
    }    

    function download_LM_doc_Internal() {
        window.open(_LM_docRedirectionUrl, "_blank");
    }

    function download_LM_pdf_Internal() {
        window.open(_LM_pdfRedirectionUrl, "_blank");
    }

    function hoverPhilosophy_Internal() {
        $(".philosophy").addClass("overPhilosophy");
        _profileRedirectionUrlAnimationHander = setInterval(updateCurrentAvailability_Internal, 900);
    }
     
    function outOfHoverPhilosophy_Internal() {
        $(".overPhilosophy").css("box-shadow", "");
        $(".philosophy").removeClass("overPhilosophy");

        if (_profileRedirectionUrlAnimationHander !== undefined) {
            clearInterval(_profileRedirectionUrlAnimationHander);
        }
    }
    
    function hoverDownloadSourceCode_Internal() {
        $(".sourceCode").removeClass("siteName");

        // apply [Download Source Code] look & feel
        apply_DownloadSourceCode_Internal();
    }

    function outOfHoverDownloadSourceCode_Internal() {
        $(".sourceCode").removeClass("goToSourceCode");

        // restore default look & feel
        apply_SiteName_Defaults_Internal();
    }
    
    function downloadSourceCode_Internal() {
        window.open(_downloadSourceCodeRedirectionUrl, "_blank");
    }

    function goToReleaseNotes_Internal() {
        // generate token for this GET request
        var token = jsUtilities.getDestinationUrlToken();

        window.open(_releaseNotesRedirectionUrl + token, "_self");
    }

    function apply_SiteName_Defaults_Internal() {
        $(".sourceCode").text(_siteName);
        $(".sourceCode").addClass("siteName");

        $(".siteName").css("color", "#1D61A8");
        $(".siteName").css("font-family", "Orbitron");
        $(".siteName").css("font-size", "0.9em");
    }

    function apply_LogoType_Defaults_Internal() {
        $(".idea").prop("innerHTML", _idea);
    }

    function apply_SiteContent_Defaults_Internal() {
        $(".dossier_title").prop("innerHTML", _dossierTitle);
        $(".rule_dossier.last_updated").prop("innerHTML", _dossierUpdate);
    }

    function apply_SiteFooter_Defaults_Internal() {
        $(".year").prop("innerHTML", _copyrightYear);

        $(".siteName").prop("innerHTML", _siteName);

        $(".siteVersion").prop("innerHTML", _siteVersion);
    }

    function assign_EventHandlers_Internal() {
        // philosophy DIV
        $(".philosophy").hover(
                            hoverPhilosophy_Internal,
                            outOfHoverPhilosophy_Internal
                         );

        $(".philosophy").click(goToProfile_Internal);

        
        // download CV & LM
        $(".cv_doc").click(download_CV_doc_Internal);
        $(".cv_pdf").click(download_CV_pdf_Internal);
        $(".lm_doc").click(download_LM_doc_Internal);
        $(".lm_pdf").click(download_LM_pdf_Internal);


        // Open Source 4 Better Tomorrow
        $(".open_source_philosophy").hover(
                                            // over
                                            function() {
                                                $(this).css("background-color", "#424242");
                                            },
                                            // out
                                            function() {
                                                $(this).css("background-color", "#333333");
                                            }
                                    );
        
        $(".open_source_philosophy").click(function() {
            return goToOpenSource_Internal();
        });


        // developer YT & CH9
        $(".yt").click(goToYouTube_Internal);
        $(".ch9").click(goToChannel9_Internal);


        // source code download
        $(".sourceCode").click(downloadSourceCode_Internal);
        $(".sourceCode").hover(
                            hoverDownloadSourceCode_Internal,
                            outOfHoverDownloadSourceCode_Internal
                         );

        // site version
        $(".siteVersion").click(goToReleaseNotes_Internal);
    }

    function goToOpenSource_Internal() {
        window.location.href = _openSourceRedirectionUrl;
    }

    function apply_DownloadSourceCode_Internal() {
        $(".sourceCode").text(_downloadSourceCodeDescription);
        $(".sourceCode").addClass("goToSourceCode");

        $(".goToSourceCode").css("color", "black");
        $(".goToSourceCode").css("font-family", "courier new");
        $(".goToSourceCode").css("font-size", "1.05em");
    }

    function updateCurrentAvailability_Internal() {
        $(".overPhilosophy").css("box-shadow", "0 1px 46px #bfbfbf");
        setTimeout(createDubleLayerShadow_Internal, 300);
        setTimeout(createTripleLayerShadow_Internal, 600);
    }
    
    function createDubleLayerShadow_Internal() {
        $(".overPhilosophy").css("box-shadow", "0 1px 46px #bfbfbf, 0 1px 50px #e6e6e6");
    }
   
    function createTripleLayerShadow_Internal() {
        $(".overPhilosophy").css("box-shadow", "0 1px 46px #bfbfbf, 4px 5px 50px #e6e6e6, 0 1px 54px white");
    }

    function turn_on_yt_ch9_animation_Internal() {
        setInterval(function() {
            $(".arrow_a_3").css("visibility", "hidden");
            $(".arrow_a_1").css("visibility", "visible");

            setTimeout(function() {
                $(".arrow_a_1").css("visibility", "hidden");
                $(".arrow_a_2").css("visibility", "visible");
            }, 1000);

            setTimeout(function() {
                $(".arrow_a_2").css("visibility", "hidden");
                $(".arrow_a_3").css("visibility", "visible");
            }, 2000);            

        }, 3000);
    }

    function turn_on_dots_animation_Internal() {
        setTimeout(function() {
            $(".green").css("visibility", "visible");
            $(".blue").css("visibility", "visible");

            
            /* 2 */
            setTimeout(function() {
                $(".blue").css("top", "6em");
                $(".blue").css("right", "4.3em");
                $(".blue").css("visibility", "visible");
            }, 2000);

            setTimeout(function() {
                $(".green").css("top", "30em");
                $(".green").css("left", "3.4em");                
                $(".green").css("visibility", "visible");
            }, 4000);


            /* 3 */
            setTimeout(function() {
                $(".blue").css("top", "42em");
                $(".blue").css("right", "3.9em");
                $(".blue").css("visibility", "visible");
            }, 6000);

            setTimeout(function() {
                $(".green").css("top", "5em");
                $(".green").css("left", "3.8em");                
                $(".green").css("visibility", "visible");
            }, 8000);


            /* 4 */
            setTimeout(function() {
                $(".blue").css("top", "15em");
                $(".blue").css("right", "4.5em");
                $(".blue").css("visibility", "visible");
            }, 10000);

            setTimeout(function() {
                $(".green").css("top", "20em");
                $(".green").css("left", "3em");                
                $(".green").css("visibility", "visible");
            }, 12000);


            /* 5 */
            setTimeout(function() {
                $(".blue").css("top", "23em");
                $(".blue").css("right", "3.5em");
                $(".blue").css("visibility", "visible");
            }, 14000);

            setTimeout(function() {
                $(".green").css("top", "30em");
                $(".green").css("left", "3.8em");                
                $(".green").css("visibility", "visible");
            }, 16000);


            /* 6 */
            setTimeout(function() {
                $(".green").css("top", "37em");
                $(".green").css("left", "4em");
                $(".green").css("color", "#90B740");
                $(".green").css("visibility", "visible");
                
                $(".blue").css("top", "5em");
                $(".blue").css("right", "4em");
                $(".blue").css("color", "#0961BA");       
                $(".blue").css("visibility", "visible");
            }, 18000);

        }, 2000);
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

        applySiteHeightBasedOnCurrentResolution_Internal();

        apply_SiteName_Defaults_Internal();
        
        apply_LogoType_Defaults_Internal();
        
        apply_SiteContent_Defaults_Internal();
        
        apply_SiteFooter_Defaults_Internal();
        
        assign_EventHandlers_Internal();
        
        showSplash_Internal();
     }
    }
	
	self.changePageLayoutDynamically = function(cssFilesLoader) {
		return changePageLayoutDynamically_Internal(cssFilesLoader);
	}

    /* ~ Public API */



    /* Expose module API to the outside world */
    window.domainInfo = window.domainInfo || self;

    /* redirect to mobile version in case of mobile browser */    
    jsUtilities.redirectToMobileVersionIfMobileBrowserDetected(_mobileVersionPrefix);
 }
)(window)