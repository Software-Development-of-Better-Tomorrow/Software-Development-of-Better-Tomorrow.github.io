(
 function (window) {
     var self = this;
    

     /* module scope variables begining */

     var _mobileVersionPrefix = moduleHelperProfile.getMobileVersionPrefix();
     
     var _mainPageRedirectionUrl = moduleHelperProfile.getMainPageUrl();
     var _blogPageRedirectionUrl = moduleHelperProfile.getBlogPageRedirectionUrl();
     var _bioPageRedirectionUrl = moduleHelperProfile.getBioPageRedirectionUrl();
     var _ITProLinksPageRedirectionUrl = moduleHelperProfile.getITProLinksPageRedirectionUrl();
     var _ourRootsPageRedirectionUrl = moduleHelperProfile.getOurRootsPageRedirectionUrl();

     var _fullSiteName = moduleHelperProfile.getFullSiteName();

     /* module scope variables end */


    
     /* module scope private functions begining */

     $().ready(function () {
         // hover
         $(expandCollapseAllSelector).hover(onExpandCollapseIconMouseOver_Internal, onExpandCollapseIconMouseOut_Internal);
         $(experienceSlideIconSelector).hover(onExperienceIconMouseOver_Internal, onExperienceIconMouseOut_Internal);
         $(skillsSlideIconSelector).hover(onSkillsIconMouseOver_Internal, onSkillsIconMouseOut_Internal);
         $(currentEmployerSlideIconSelector).hover(onCurrentEmployerIconMouseOver_Internal, onCurrentEmployerIconMouseOut_Internal);
         $(historySlideIconSelector).hover(onHistoryIconMouseOver_Internal, onHistoryIconMouseOut_Internal);
         $(aboutMeSlideIconSelector).hover(onAboutMeIconMouseOver_Internal, onAboutMeIconMouseOut_Internal);

         // click handler
         $(expandCollapseAllSelector).click(function () {
             _isExpandedCollapsedArrowDown = !_isExpandedCollapsedArrowDown;

             if (_isExpandedCollapsedArrowDown) {
                 onExpandCollapseIconArrowDown_Internal();
                 expandAllDivsThatAreNotExpanded_Internal();
             }
             else {
                 onExpandCollapseIconArrowUp_Internal();
                 collapseAllDivsThatAreNotCollapsed_Internal();
             }
         });

         $(experienceSlideIconSelector).click(function () {
             _isExperienceArrowDown = !_isExperienceArrowDown;
             if (_isExperienceArrowDown) {
                 onExperienceIconArrowDown_Internal();
                 increaseMinHeightOfPage_Internal(true);
                 $(experienceContentSelector).slideDown(_firstPageAccess ? -1 : 130);
             }
             else {
                 onExperienceIconArrowUp_Internal();
                 decreaseMinHeightOfPage_Internal();
                 $(experienceContentSelector).slideUp(_firstPageAccess ? -1 : 130);
             }
             if (!_firstPageAccess)
                 expandAllCollapseAllWatcher_Internal();
         }
                               );

         $(skillsSlideIconSelector).click(function () {
             _isSkillsArrowDown = !_isSkillsArrowDown;
             if (_isSkillsArrowDown) {
                 onSkillsIconArrowDown_Internal();
                 increaseMinHeightOfPage_Internal(true);
                 $(skillsContentSelector).slideDown(_firstPageAccess ? -1 : 130);
             }
             else {
                 onSkillsIconArrowUp_Internal();
                 decreaseMinHeightOfPage_Internal();
                 $(skillsContentSelector).slideUp(_firstPageAccess ? -1 : 130);
             }
             if (!_firstPageAccess)
                 expandAllCollapseAllWatcher_Internal();
         }
                               );

         $(currentEmployerSlideIconSelector).click(function () {
             _isCurrentEmployerArrowDown = !_isCurrentEmployerArrowDown;
             if (_isCurrentEmployerArrowDown) {
                 onCurrentEmployerIconArrowDown_Internal();
                 increaseMinHeightOfPage_Internal(true);
                 $(currentEmployerContentSelector).slideDown(_firstPageAccess ? -1 : 130);
             }
             else {
                 onCurrentEmployerIconArrowUp_Internal();
                 decreaseMinHeightOfPage_Internal();
                 $(currentEmployerContentSelector).slideUp(_firstPageAccess ? -1 : 130);
             }
             if (!_firstPageAccess)
                 expandAllCollapseAllWatcher_Internal();
         }
                               );

         $(historySlideIconSelector).click(function () {
             _isHistoryArrowDown = !_isHistoryArrowDown;
             if (_isHistoryArrowDown) {
                 onHistoryIconArrowDown_Internal();
                 increaseMinHeightOfPage_Internal(true);
                 $(historyContentSelector).slideDown(_firstPageAccess ? -1 : 130);
             }
             else {
                 onHistoryIconArrowUp_Internal();
                 decreaseMinHeightOfPage_Internal();
                 $(historyContentSelector).slideUp(_firstPageAccess ? -1 : 130);
             }
             if (!_firstPageAccess)
                 expandAllCollapseAllWatcher_Internal();
         }
                               );

         $(aboutMeSlideIconSelector).click(function () {
             _isAboutMeArrowDown = !_isAboutMeArrowDown;
             if (_isAboutMeArrowDown) {
                 onAboutMeIconArrowDown_Internal();
                 increaseMinHeightOfPage_Internal(false);
                 $(aboutMeContentSelector).slideDown(_firstPageAccess ? -1 : 130);
             }
             else {
                 onAboutMeIconArrowUp_Internal();
                 decreaseMinHeightOfPage_Internal();
                 $(aboutMeContentSelector).slideUp(_firstPageAccess ? -1 : 130);
             }
             if (!_firstPageAccess)
                 expandAllCollapseAllWatcher_Internal();
         }
                               );

         // onload invoke

         $(experienceSlideIconSelector).click();
         $(skillsSlideIconSelector).click();
         $(currentEmployerSlideIconSelector).click();
         $(historySlideIconSelector).click();
         $(aboutMeSlideIconSelector).click();
         _firstPageAccess = false;

         getCurrentTime_Internal();         
      }
     );
	
	 var _disallowedResolutionsArray = moduleHelperProfile.getDisallowedResolutionsArray();
     
     var _currentTimeInternal = 1000;
     var _firstPageAccess = true;
     var _isExpandedCollapsedArrowDown = false;
     var _isExperienceArrowDown = true;
     var _isSkillsArrowDown = true;
     var _isCurrentEmployerArrowDown = true;
     var _isHistoryArrowDown = true;
     var _isAboutMeArrowDown = true;
     var _scrollbarInfoShown = false;
     var _andOnlyOnce = true;

     var expandCollapseAllSelector = "div .navigation_slide";
     var expandAllCollapseAll = ".expandAllCollapseAll";
     var expandAllLabel = "Expand all";
     var collapseAllLabel = "Collpase all";

     var contentDiv = "div .content";

     var experienceDiv = "div .experience";
     var experienceSelector = "div .experience .legend";
     var experienceSlideIconSelector = "div .experience_slide";
     var experienceContentSelector = "div .experience_content";

     var skillsDiv = "div .skills";
     var skillsSelector = "div .skills .legend";
     var skillsSlideIconSelector = "div .skills_slide";
     var skillsContentSelector = "div .skills_content";

     var currentEmployerDiv = "div .currentEmployer";
     var currentEmployerSelector = "div .currentEmployer .legend";
     var currentEmployerSlideIconSelector = "div .currentEmployer_slide";
     var currentEmployerContentSelector = "div .currentEmployer_content";

     var historyDiv = "div .history";
     var historySelector = "div .history .legend";
     var historySlideIconSelector = "div .history_slide";
     var historyContentSelector = "div .history_content";

     var aboutMeDiv = "div .aboutMe";
     var aboutMeSelector = "div .aboutMe .legend";
     var aboutMeSlideIconSelector = "div .aboutMe_slide";
     var aboutMeContentSelector = "div .aboutMe_content";

	 var _begininigDay = new Date(2008,6,1,8,0,0);
	 var _secondsElapsed = 0;
	 var _minutesElapsed = 0;
	 var _hoursElapsed = 0;
	 var _daysElapsed = 0;
	 var _monthsElapsed = 0;
	 var _yearsElapsed = 0;
	 
     // helper functions
     function getCurrentTime_Internal() {
         var date = new Date();
         var currentTime = date.toTimeString("HH:mm:ss").substr(0, 18);
         $(".currentTime").prop("innerHTML", currentTime);
     }
	 
	 function setupMyRunningExperience_Internal() {	 
		var begininigDay = _begininigDay;
		var currentDay = getCurrentDate_Internal();
		
		var difference = currentDay.getTime() - begininigDay.getTime();
		displayTime_Internal(difference);
		displayCurrentExperienceEpigraph_Internal(difference);
	 }
	 
	 function showMyRunningExperience_Internal() {
		var begininigDay = _begininigDay;
		var currentDay = getCurrentDate_Internal();
		
		var difference = currentDay.getTime() - begininigDay.getTime();
		displayTime_Internal(difference);
		displayCurrentExperienceEpigraph_Internal(difference);
	 }
	
	 function setSecondsPartOfDateTime_Internal(currentDay, begininigDay) {
		_secondsElapsed = currentDay.getSeconds() - begininigDay.getSeconds();
		if(_secondsElapsed < 0)
			_secondsElapsed = 60 - Math.abs(_secondsElapsed);		 
	 }
	
	 function setOtherPartsOfDateTimeExceptForSecondsPart_Internal(initilizeExperienceTime, begininigDay, currentDay) {
		 if(initilizeExperienceTime) {		 
			if(_secondsElapsed == 0)
				_minutesElapsed++;
			else {
				_minutesElapsed = currentDay.getMinutes() - begininigDay.getMinutes();
				if(_minutesElapsed < 0)
					_minutesElapsed = 60 - Math.abs(_minutesElapsed);			
			}
			
			if(_minutesElapsed == 60) {
				_minutesElapsed = 0;
				_hoursElapsed++;
			}
			else {
				_hoursElapsed = currentDay.getHours() - begininigDay.getHours();
				if(_hoursElapsed < 0)
					_hoursElapsed = 24 - Math.abs(_hoursElapsed);
			}
			
			if(_hoursElapsed == 24) {
				_hoursElapsed = 0;
				_daysElapsed++;
			}
			else {
				_daysElapsed = currentDay.getDate() - begininigDay.getDate();
				if(_daysElapsed < 0)
				_daysElapsed = jsUtilities.calculateNumberOfDaysForCurrentMonth(currentDay.getMonth(), currentDay.getFullYear()) - Math.abs(_daysElapsed);
			}
			
			if(_daysElapsed == jsUtilities.calculateNumberOfDaysForCurrentMonth(currentDay.getMonth(), currentDay.getFullYear())) {
				_daysElapsed = 0;	
				_monthsElapsed++;
			}
			else {
				_monthsElapsed = currentDay.getMonth() - begininigDay.getMonth();
				if(_monthsElapsed < 0)
					_monthsElapsed = 12 - Math.abs(_monthsElapsed);			
			}
			
			if(_monthsElapsed == 12) {
				_monthsElapsed = 0;
				_yearsElapsed++;	
			}
			else
				_yearsElapsed = currentDay.getFullYear() - begininigDay.getFullYear();			 
		 }
		 else {
			if(_secondsElapsed == 60) {
				_secondsElapsed = 0;
				_minutesElapsed++;
			}
			
			if(_minutesElapsed == 60) {
				_minutesElapsed = 0;
				_hoursElapsed++;
			}
				
			if(_hoursElapsed == 24) {
				_hoursElapsed = 0;
				_daysElapsed++;
			}
			
			if(_daysElapsed == jsUtilities.calculateNumberOfDaysForCurrentMonth(currentDay.getMonth(), currentDay.getFullYear())) {
				_daysElapsed = 0;	
				_monthsElapsed++;
			}
			
			if(_monthsElapsed == 12) {
				_monthsElapsed = 0;
				_yearsElapsed++;	
			}
		 }
	 }
	 
	 function displayTime_Internal(miliseconds) {
		var elapsedTime = "<span class='myGitHub'>" + randomizeArray_Internal(miliseconds) + "</span>";
						  
		elapsedTime += "&nbsp;&nbsp;[#my<a href='https://github.com/Software-Development-of-Better-Tomorrow?tab=repositories' target='_blank'><span class='myGitHub'>Git-on-Hub</span></a>experience speaks for itself]" 
		 
		$(".currentExperience").prop("innerHTML", elapsedTime);		 
	 }
	 
	 function randomizeArray_Internal(miliseconds) {
		var output = "";
		
		var milisecondsString = miliseconds.toString()
		var array = [milisecondsString.length];
		
		for(var c in milisecondsString)
			array[c] = parseInt(milisecondsString[c]);
		
		array.sort(function() { return 0.7 - Math.random() });
		
		for(var i = 0; i < array.length; i++) {
			if(i > array[i])
				output += "<span class='myGitHubWhite'>" + array[i] + "</span>&nbsp;&nbsp;&nbsp;";	
			else
				output += array[i] + "&nbsp;&nbsp;&nbsp;";	
		}
		
		return output;
	 }
	 
	 function displayCurrentExperienceEpigraph_Internal(difference) {
		if(difference % 3 != 0)
			$(".currentExperienceEpigraph").prop("innerHTML", "להיות מישהו bedeutet, sich selbst. دوسروں کا احترام och kräver från sig själv.");
		else
			$(".currentExperienceEpigraph").prop("innerHTML", "להיות מישהו bedeutet, sich selbst. دوسروں کا احترام och kräver från sig själv.");
	 }
	 
     function getCurrentDate_Internal() {
         return new Date();
     }

     function adjustFooterForOpera_Internal() {
        $(".w3cHtml").css("bottom", "0.4em");
        $(".w3cCss").css("bottom", "0.4em");
     }

     function adjustFooterForSafari_Internal() {
        $(".w3cHtml").css("bottom", "0.6em");
        $(".w3cCss").css("bottom", "0.6em");
     }

	 function adjustBodyRightScrollbarForFirefoxAndIE_Internal() {
		 $(".frame").css("overflow", "auto");
		 $(".frame").css("scrollbar-base-color", "#4B5963");
		 $(".frame").css("scrollbar-3dlight-color", "#4B5963");
		 $(".frame").css("scrollbar-highlight-color", "#4B5963");
		 $(".frame").css("scrollbar-track-color", "#4B5963");
		 $(".frame").css("scrollbar-arrow-color", "#4B5963");
		 $(".frame").css("scrollbar-shadow-color", "#4B5963");
		 $(".frame").css("scrollbar-dark-shadow-color", "white");		 
	 }
	 
    function displayMessageForNotSupportedBrowser_Internal() {
        document.getElementsByTagName("body")[0].innerHTML = "<div class='notSupported'>" + moduleHelperProfile.getNotSupportedResolution() + "</div>";
    }

     function showPage_Internal() {
         $("body").css("visibility", "visible");
     }
	 
     function expandAllDivsThatAreNotExpanded_Internal() {
         _isExperienceArrowDown = false;
         _isSkillsArrowDown = false;
         _isCurrentEmployerArrowDown = false;
         _isHistoryArrowDown = false;
         _isAboutMeArrowDown = false;

         $(experienceSlideIconSelector).click();
         $(skillsSlideIconSelector).click();
         $(currentEmployerSlideIconSelector).click();
         $(historySlideIconSelector).click();
         $(aboutMeSlideIconSelector).click();
     }

     function collapseAllDivsThatAreNotCollapsed_Internal() {
         _isExperienceArrowDown = true;
         _isSkillsArrowDown = true;
         _isCurrentEmployerArrowDown = true;
         _isHistoryArrowDown = true;
         _isAboutMeArrowDown = true;

         $(experienceSlideIconSelector).click();
         $(skillsSlideIconSelector).click();
         $(currentEmployerSlideIconSelector).click();
         $(historySlideIconSelector).click();
         $(aboutMeSlideIconSelector).click();
     }

     function expandAllCollapseAllWatcher_Internal() {
         if (!_isExperienceArrowDown && !_isSkillsArrowDown && !_isCurrentEmployerArrowDown && !_isHistoryArrowDown && !_isAboutMeArrowDown) {
             onExpandCollapseIconArrowUp_Internal();
         }
         else if (_isExperienceArrowDown && _isSkillsArrowDown && _isCurrentEmployerArrowDown && _isHistoryArrowDown && _isAboutMeArrowDown) {
             onExpandCollapseIconArrowDown_Internal();
         }
     }

     function showInfoOnlyOnce_Internal() {
		 setTimeout(function() {
						$(".info").css("visibility", "visible");
						setTimeout(function() {
							$(".info").css("visibility", "hidden");
							_scrollbarInfoShown = true;
							_andOnlyOnce = false;
							_firstPageAccess = true;
						}, 3800);
					},
					 1300
				   );
     }


     function increaseMinHeightOfPage_Internal(flag) {
         var actualHeight = $(".main").css("min-height");

         if (flag) {
             actualHeight += 200;
         }

         $(".main").css("min-height", actualHeight + "px");

         if (!_scrollbarInfoShown && _andOnlyOnce && !_firstPageAccess) {
             showInfoOnlyOnce_Internal();
         }
     }

     function decreaseMinHeightOfPage_Internal() {
         var actualHeight = $(".main").css("min-height");

         actualHeight -= 200;

         $(".main").css("min-height", actualHeight + "px");
     }

     function onExpandCollapseIconMouseOver_Internal() {
         $(expandCollapseAllSelector).css("cursor", "pointer");
     }

     function onExpandCollapseIconMouseOut_Internal() {
         $(expandCollapseAllSelector).css("cursor", "default");
     }

     function onExpandCollapseIconArrowDown_Internal() {
         $(expandCollapseAllSelector).removeClass("nav_arrow_down");
         $(expandCollapseAllSelector).addClass("nav_arrow_up");
         $(expandAllCollapseAll).prop("innerHTML", collapseAllLabel);
     }

     function onExpandCollapseIconArrowUp_Internal() {
         $(expandCollapseAllSelector).removeClass("nav_arrow_up");
         $(expandCollapseAllSelector).addClass("nav_arrow_down");
         $(expandAllCollapseAll).prop("innerHTML", expandAllLabel);
     }



     // experience
     function onExperienceIconMouseOver_Internal() {
         $(experienceSlideIconSelector).css("cursor", "pointer");
     }

     function onExperienceIconMouseOut_Internal() {
         $(experienceSlideIconSelector).css("cursor", "default");
     }

     function onExperienceIconArrowDown_Internal() {
         $(experienceSlideIconSelector).removeClass("arrow_down");
         $(experienceSlideIconSelector).addClass("arrow_up");
     }

     function onExperienceIconArrowUp_Internal() {
         $(experienceSlideIconSelector).removeClass("arrow_up");
         $(experienceSlideIconSelector).addClass("arrow_down");
     }


     // skills
     function onSkillsIconMouseOver_Internal() {
         $(skillsSlideIconSelector).css("cursor", "pointer");
     }

     function onSkillsIconMouseOut_Internal() {
         $(skillsSlideIconSelector).css("cursor", "default");
     }

     function onSkillsIconArrowDown_Internal() {
         $(skillsSlideIconSelector).removeClass("arrow_down");
         $(skillsSlideIconSelector).addClass("arrow_up");
     }

     function onSkillsIconArrowUp_Internal() {
         $(skillsSlideIconSelector).removeClass("arrow_up");
         $(skillsSlideIconSelector).addClass("arrow_down");
     }


     // current employer
     function onCurrentEmployerIconMouseOver_Internal() {
         $(currentEmployerSlideIconSelector).css("cursor", "pointer");
     }

     function onCurrentEmployerIconMouseOut_Internal() {
         $(currentEmployerSlideIconSelector).css("cursor", "default");
     }

     function onCurrentEmployerIconArrowDown_Internal() {
         $(currentEmployerSlideIconSelector).removeClass("arrow_down");
         $(currentEmployerSlideIconSelector).addClass("arrow_up");
     }

     function onCurrentEmployerIconArrowUp_Internal() {
         $(currentEmployerSlideIconSelector).removeClass("arrow_up");
         $(currentEmployerSlideIconSelector).addClass("arrow_down");
     }

     // history
     function onHistoryIconMouseOver_Internal() {
         $(historySlideIconSelector).css("cursor", "pointer");
     }

     function onHistoryIconMouseOut_Internal() {
         $(historySlideIconSelector).css("cursor", "default");
     }

     function onHistoryIconArrowDown_Internal() {
         $(historySlideIconSelector).removeClass("arrow_down");
         $(historySlideIconSelector).addClass("arrow_up");
     }

     function onHistoryIconArrowUp_Internal() {
         $(historySlideIconSelector).removeClass("arrow_up");
         $(historySlideIconSelector).addClass("arrow_down");
     }

     // about me
     function onAboutMeIconMouseOver_Internal() {
         $(aboutMeSlideIconSelector).css("cursor", "pointer");
     }

     function onAboutMeIconMouseOut_Internal() {
         $(aboutMeSlideIconSelector).css("cursor", "default");
     }

     function onAboutMeIconArrowDown_Internal() {
         $(aboutMeSlideIconSelector).removeClass("arrow_down");
         $(aboutMeSlideIconSelector).addClass("arrow_up");
     }

     function onAboutMeIconArrowUp_Internal() {
         $(aboutMeSlideIconSelector).removeClass("arrow_up");
         $(aboutMeSlideIconSelector).addClass("arrow_down");
     }

    function getFullSiteName_Internal() {
        return _fullSiteName;
    }

    function goToMainPage_Internal() {
        // generate token for this GET request
        var token = jsUtilities.getDestinationUrlToken();

        window.location.href = _mainPageRedirectionUrl + token;
    }

    function goToBlogPage_Internal() {
        // generate token for this GET request
        var token = jsUtilities.getDestinationUrlToken();

        window.location.href = _blogPageRedirectionUrl + token;
    }

    function goToBioPage_Internal() {
        // generate token for this GET request
        var token = jsUtilities.getDestinationUrlToken();

        window.location.href = _bioPageRedirectionUrl + token;
    }

    function goToITProLinksPage_Internal() {
        // generate token for this GET request
        var token = jsUtilities.getDestinationUrlToken();

        window.location.href = _ITProLinksPageRedirectionUrl + token;
    }

    function seeOurRoots_Intermal() {
        // generate token for this GET request
        var token = jsUtilities.getDestinationUrlToken();

        window.location.href = _ourRootsPageRedirectionUrl + token;
    }

    function processValidationResponse_Internal(booleanFlag) {
        if(booleanFlag) {
            // generate new token to be valid for next GET request
            jsUtilities.setDestinationUrlNewShadowToken();

            // obfuscate token
            jsUtilities.clearHash(moduleHelperProfile.getHashReplacement());
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


		 if (activeBrowser.browserUtility.opera) {
			 adjustFooterForOpera_Internal();
		 }
		 else if (activeBrowser.browserUtility.safari) {
			 adjustFooterForSafari_Internal();
		 }
		 else if(activeBrowser.browserUtility.firefox || activeBrowser.browserUtility.ie) {
			 adjustBodyRightScrollbarForFirefoxAndIE_Internal();
		 }
		 self.calculateTimeUpToNow();
	 }
     
     showPage_Internal();
    }


    self.getCurrentDate = function () {
        return getCurrentDate_Internal();
    }

    self.getCurrentDateFormatted = function(baseDateTime) {
        return jsUtilities.getCurrentDateFormatted_2(baseDateTime);
    }

    self.getCurrentTime = function () {
        return setInterval(getCurrentTime_Internal, _currentTimeInternal);
    }
	 
	self.calculateTimeUpToNow = function() {
	    setupMyRunningExperience_Internal();
		return setInterval(showMyRunningExperience_Internal, _currentTimeInternal);
	}
    
    self.getFullSiteName = function() {
        return getFullSiteName_Internal();
    }
    
    self.goToMainPage = function() {
        return goToMainPage_Internal();
    }

     self.goToBlogPage = function() {
         return goToBlogPage_Internal();
     }

     self.goToBioPage = function() {
         return goToBioPage_Internal();
     }

     self.goToITProLinksPage = function() {
         return goToITProLinksPage_Internal();
     }

     self.seeOurRoots = function() {
         return seeOurRoots_Intermal();
     }

    /* ~ Public API */



    /* Expose module API to the outside world */
    window.jobProfileInfo = window.jobProfileInfo || self;

    /* redirect to mobile version in case of mobile browser */    
    jsUtilities.redirectToMobileVersionIfMobileBrowserDetected(_mobileVersionPrefix);
 }
)(window)