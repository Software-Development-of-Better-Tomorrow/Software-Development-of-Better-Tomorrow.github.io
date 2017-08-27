(
 function (window) {
     var self = this;
    

     /* DOM ready -> Expand / Collapse automation */
     $().ready(function () {
                // hover events

                $(_expandCollapseAllSelector).hover(onExpandCollapseIconMouseOver_Internal, onExpandCollapseIconMouseOut_Internal);
                $(experienceSlideIconSelector).hover(onExperienceIconMouseOver_Internal, onExperienceIconMouseOut_Internal);
                $(skillsSlideIconSelector).hover(onSkillsIconMouseOver_Internal, onSkillsIconMouseOut_Internal);
                $(currentEmployerSlideIconSelector).hover(onCurrentEmployerIconMouseOver_Internal, onCurrentEmployerIconMouseOut_Internal);
                $(historySlideIconSelector).hover(onHistoryIconMouseOver_Internal, onHistoryIconMouseOut_Internal);
                $(aboutMeSlideIconSelector).hover(onAboutMeIconMouseOver_Internal, onAboutMeIconMouseOut_Internal);

                // ~ hover events


                // click handlers

                // expand/collapse
                $(_expandCollapseAllSelector).click(function () {
                                                        _isExpandedCollapsedArrowDown = !_isExpandedCollapsedArrowDown;

                                                        if (_isExpandedCollapsedArrowDown) {
                                                            onExpandCollapseIconArrowDown_Internal();
                                                            expandAllDivsThatAreNotExpanded_Internal();
                                                        }
                                                        else {
                                                            onExpandCollapseIconArrowUp_Internal();
                                                            collapseAllDivsThatAreNotCollapsed_Internal();
                                                        }
                                                   }
                                                  );


                // about me
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


                // experience
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


                // current employer
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

        
                // history
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


                // skills
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


                // onload invoke
                $(experienceSlideIconSelector).click();
                $(skillsSlideIconSelector).click();
                $(currentEmployerSlideIconSelector).click();
                $(historySlideIconSelector).click();
                $(aboutMeSlideIconSelector).click();
                _firstPageAccess = false;


                // set current time
                getCurrentTime_Internal();

                // show content of the page
                showPage_Internal();
               }
     );


     /*
      Trigger module's entry point as soon as HTML document has been completely loaded and parsed (althought some images, frames & other external resources may still be loading).
      This allows for current module to kick off its entry point method as soon as possible with View (HTML file) knowing nothing about mechanism
      that renders View's layout.
      This is further separation of concerns (~ Static MVC) AFAIK and towards better CSP (Content Security Policy).
     */
     document.addEventListener("DOMContentLoaded", function(event) {
                                                    document.getElementsByTagName("body")[0].addEventListener("load", jobProfileInfo.loadApplicationModule());

                                                    // assign action to dynamically loaded HTML a element
                                                    document.getElementsByClassName("aboutMe_ourRoots")[0].addEventListener("click", seeOurRoots_Intermal);

                                                    // assign action to blog subpage
                                                    document.getElementsByClassName("aboutMe_Blog")[0].addEventListener("click", goToBlogPage_Internal);

                                                    // assign action to bio subpage
                                                    document.getElementsByClassName("aboutMe_Bio")[0].addEventListener("click", goToBioPage_Internal);

                                                    // assign action to bio subpage
                                                    document.getElementsByClassName("aboutMe_ProLinks")[0].addEventListener("click", goToITProLinksPage_Internal);
                                                   }
     );


     /* module scope variables begining */

     var _mobileVersionPrefix = moduleHelperProfile.getMobileVersionPrefix();
     var _disallowedResolutionsArray = moduleHelperProfile.getDisallowedResolutionsArray();

     var _mainPageRedirectionUrl = moduleHelperProfile.getMainPageUrl();
     var _blogPageRedirectionUrl = moduleHelperProfile.getBlogPageRedirectionUrl();
     var _bioPageRedirectionUrl = moduleHelperProfile.getBioPageRedirectionUrl();
     var _ITProLinksPageRedirectionUrl = moduleHelperProfile.getITProLinksPageRedirectionUrl();
     var _ourRootsPageRedirectionUrl = moduleHelperProfile.getOurRootsPageRedirectionUrl();
     
     
     var _currentTimeInternal = 1000;
     var _firstPageAccess = true;
     var _isExpandedCollapsedArrowDown = false;

     var _isAboutMeArrowDown = true;
     var _isExperienceArrowDown = true;
     var _isCurrentEmployerArrowDown = true;
     var _isHistoryArrowDown = true;
     var _isSkillsArrowDown = true;
     
     var _scrollbarInfoShown = false;
     var _andOnlyOnce = true;

     var _expandCollapseAllSelector = "div .navigation_slide";
     var _expandAllCollapseAll = ".expandAllCollapseAll";
     var _expandAllLabel = "Expand";
     var _collapseAllLabel = "Collpase";

     var contentDiv = "div .content";

     var aboutMeDiv = "div .aboutMe";
     var aboutMeSelector = "div .aboutMe .legend";
     var aboutMeSlideIconSelector = "div .aboutMe_slide";
     var aboutMeContentSelector = "div .aboutMe_content";

     var experienceDiv = "div .experience";
     var experienceSelector = "div .experience .legend";
     var experienceSlideIconSelector = "div .experience_slide";
     var experienceContentSelector = "div .experience_content";

     var currentEmployerDiv = "div .currentEmployer";
     var currentEmployerSelector = "div .currentEmployer .legend";
     var currentEmployerSlideIconSelector = "div .currentEmployer_slide";
     var currentEmployerContentSelector = "div .currentEmployer_content";

     var historyDiv = "div .history";
     var historySelector = "div .history .legend";
     var historySlideIconSelector = "div .history_slide";
     var historyContentSelector = "div .history_content";

     var skillsDiv = "div .skills";
     var skillsSelector = "div .skills .legend";
     var skillsSlideIconSelector = "div .skills_slide";
     var skillsContentSelector = "div .skills_content";

	 var _begininigDay = new Date(2008,6,1,8,0,0);
	 var _secondsElapsed = 0;
	 var _minutesElapsed = 0;
	 var _hoursElapsed = 0;
	 var _daysElapsed = 0;
	 var _monthsElapsed = 0;
	 var _yearsElapsed = 0;
     
     /* module scope variables end */



     /* module scope private functions begining */

     function expandAllDivsThatAreNotExpanded_Internal() {
        _isAboutMeArrowDown = _isExperienceArrowDown = _isCurrentEmployerArrowDown = _isHistoryArrowDown = _isSkillsArrowDown = false;

        $(aboutMeSlideIconSelector).click();
        $(experienceSlideIconSelector).click();
        $(currentEmployerSlideIconSelector).click();
        $(historySlideIconSelector).click();
        $(skillsSlideIconSelector).click();
     }

     function collapseAllDivsThatAreNotCollapsed_Internal() {
        _isAboutMeArrowDown = _isExperienceArrowDown = _isCurrentEmployerArrowDown = _isHistoryArrowDown = _isSkillsArrowDown = true;

        $(aboutMeSlideIconSelector).click();
        $(experienceSlideIconSelector).click();
        $(currentEmployerSlideIconSelector).click();
        $(historySlideIconSelector).click();
        $(skillsSlideIconSelector).click();
     }

     function expandAllCollapseAllWatcher_Internal() {
        if (!_isAboutMeArrowDown && !_isExperienceArrowDown && !_isCurrentEmployerArrowDown && !_isHistoryArrowDown && !_isSkillsArrowDown) {
            onExpandCollapseIconArrowUp_Internal();
        }
        else if (_isAboutMeArrowDown && _isExperienceArrowDown && _isCurrentEmployerArrowDown && _isHistoryArrowDown && _isSkillsArrowDown) {
            onExpandCollapseIconArrowDown_Internal();
        }
     }

     function onExpandCollapseIconArrowUp_Internal() {
        $(_expandCollapseAllSelector).removeClass("nav_arrow_up");
        $(_expandCollapseAllSelector).addClass("nav_arrow_down");
        $(_expandAllCollapseAll).prop("innerHTML", _expandAllLabel);
     }

     function onExpandCollapseIconArrowDown_Internal() {
        $(_expandCollapseAllSelector).removeClass("nav_arrow_down");
        $(_expandCollapseAllSelector).addClass("nav_arrow_up");
        $(_expandAllCollapseAll).prop("innerHTML", _collapseAllLabel);
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
        $(_expandCollapseAllSelector).css("cursor", "pointer");
     }

     function onExpandCollapseIconMouseOut_Internal() {
        $(_expandCollapseAllSelector).css("cursor", "default");
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

     function getCurrentTime_Internal() {
         var date = new Date();
         var currentTime = date.toTimeString("HH:mm:ss").substr(0, 18);
         $(".currentTime").prop("innerHTML", currentTime);
     }
	 
	 function displayCurrentExperienceEpigraph_Internal() {
	    $(".currentExperienceEpigraph").prop("innerHTML", "להיות מישהו bedeutet, sich selbst. دوسروں کا احترام och kräver från sig själv.");
	 }

     function adjustFooter_or_RightScrollBar_Internal() {
        if (activeBrowser.browserUtility.opera) {
            adjustFooterForOpera_Internal();
        }
        else if (activeBrowser.browserUtility.safari) {
            adjustFooterForSafari_Internal();
        }
        else if(activeBrowser.browserUtility.firefox || activeBrowser.browserUtility.ie) {
            adjustBodyRightScrollbarForFirefoxAndIE_Internal();
        }         
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

     function assign_EventHandlers_Internal() {
         $(".main_page").click(goToMainPage_Internal);
         $(".aboutMe_Blog").click(goToBlogPage_Internal);
         $(".aboutMe_Bio").click(goToBioPage_Internal);
     }

     function apply_Header_Defaults_Internal() {
         $(".jobprofile").prop("innerHTML", moduleHelperProfile.getMyTitle());
         $(".currentTime").prop("innerHTML", setInterval(getCurrentTime_Internal, _currentTimeInternal));
     }

     function apply_Info_Defaults_Internal() {
         $(".info").prop("innerHTML", moduleHelperProfile.getInfo());
     }

     function apply_Frame_Defaults_Internal() {
        
        // Expand / Collapse

        $(".expandAllCollapseAll").prop("innerHTML", moduleHelperProfile.getExpandCollapseAll());

        // [about me] section

        $(".infoAboutMe_label").prop("innerHTML", moduleHelperProfile.getInfoAbout_Me_label());
        $(".infoAboutMe_descr").prop("innerHTML", moduleHelperProfile.getInfoAbout_Me_descr());

        $(".infoAboutMyHobby_label").prop("innerHTML", moduleHelperProfile.getInfoAbout_MyHobby_label());
        $(".infoAboutMyHobby_descr").prop("innerHTML", moduleHelperProfile.getInfoAbout_MyHobby_descr());


        $(".infoAboutMyAchievments_label").prop("innerHTML", moduleHelperProfile.getInfoAbout_MyAchievments_label());

        $(".npm").prop("innerHTML", moduleHelperProfile.getNpmPageRedirectionUrl_label());
        $(".npm").prop("href", moduleHelperProfile.getNpmPageRedirectionUrl());

        $(".GitHub").prop("innerHTML", moduleHelperProfile.getGitHubPageRedirectionUrl_label());
        $(".GitHub").prop("href", moduleHelperProfile.getGitHubPageRedirectionUrl());

        $(".LinkedIn").prop("innerHTML", moduleHelperProfile.getLinkedInPageRedirectionUrl_label());
        $(".LinkedIn").prop("href", moduleHelperProfile.getLinkedInPageRedirectionUrl());

        $(".Twitter").prop("innerHTML", moduleHelperProfile.getTwitterPageRedirectionUrl_label());
        $(".Twitter").prop("href", moduleHelperProfile.getTwitterPageRedirectionUrl());

        $(".Gitter").prop("innerHTML", moduleHelperProfile.getGitterPageRedirectionUrl_label());
        $(".Gitter").prop("href", moduleHelperProfile.getGitterPageRedirectionUrl());

        $(".CodePen").prop("innerHTML", moduleHelperProfile.getCodePenPageRedirectionUrl_label());
        $(".CodePen").prop("href", moduleHelperProfile.getCodePenPageRedirectionUrl());

        $(".Opportunity").prop("innerHTML", moduleHelperProfile.getOpportunityPageRedirectionUrl_label());
        $(".Opportunity").prop("href", moduleHelperProfile.getOpportunityPageRedirectionUrl());

        $(".aboutMe_Blog").prop("innerHTML", moduleHelperProfile.getBlogPageRedirectionUrl_label());

        $(".aboutMe_Bio").prop("innerHTML", moduleHelperProfile.getBioPageRedirectionUrl_label());


        $(".infoAboutMySocialMedia_label").prop("innerHTML", moduleHelperProfile.getInfoAbout_MySocialMedia_label());

        $(".Facebook").prop("innerHTML", moduleHelperProfile.getFacebookPageRedirectionUrl_label());
        $(".Facebook").prop("href", moduleHelperProfile.getFacebookPageRedirectionUrl());

        $(".Instagram").prop("innerHTML", moduleHelperProfile.getInstagramPageRedirectionUrl_label());
        $(".Instagram").prop("href", moduleHelperProfile.getInstagramPageRedirectionUrl());

        $(".Medium").prop("innerHTML", moduleHelperProfile.getMediumPageRedirectionUrl_label());
        $(".Medium").prop("href", moduleHelperProfile.getMediumPageRedirectionUrl());

        $(".dribbble").prop("innerHTML", moduleHelperProfile.getDribbblePageRedirectionUrl_label());
        $(".dribbble").prop("href", moduleHelperProfile.getDribbblePageRedirectionUrl());


        $(".infoAboutMySkype_label").prop("innerHTML", moduleHelperProfile.getInfoAbout_MySkype_label());

        $(".skype_call_me").prop("innerHTML", moduleHelperProfile.getSkypeCallMeRedirectionUrl_label());
        $(".skype_call_me").prop("href", moduleHelperProfile.getSkypeCallMeRedirectionUrl());

        $(".skype_chat_with_me").prop("innerHTML", moduleHelperProfile.getSkypeChatWithMeRedirectionUrl_label());
        $(".skype_chat_with_me").prop("href", moduleHelperProfile.getSkypeChatWithMeRedirectionUrl());

        $(".skype_add_me_to_contacts").prop("innerHTML", moduleHelperProfile.getSkypeAddMeToContactsRedirectionUrl_label());
        $(".skype_add_me_to_contacts").prop("href", moduleHelperProfile.getSkypeAddMeToContactsRedirectionUrl());

        $(".skype_profile").prop("innerHTML", moduleHelperProfile.getSkypeProfileRedirectionUrl_label());
        $(".skype_profile").prop("href", moduleHelperProfile.getSkypeProfileRedirectionUrl());


        $(".infoAboutMyDownload_label").prop("innerHTML", moduleHelperProfile.getInfoAbout_MyDownload_label());

        $(".cv_doc").prop("innerHTML", moduleHelperProfile.getCV_doc_label());
        $(".cv_doc").prop("href", moduleHelperProfile.getCV_doc());
        $(".cv_doc").prop("download", moduleHelperProfile.getCV_doc_download_label());

        $(".cv_pdf").prop("innerHTML", moduleHelperProfile.getCV_pdf_label());
        $(".cv_pdf").prop("href", moduleHelperProfile.getCV_pdf());
        $(".cv_pdf").prop("download", moduleHelperProfile.getCV_pdf_download_label());

        $(".lm_doc").prop("innerHTML", moduleHelperProfile.getLM_doc_label());
        $(".lm_doc").prop("href", moduleHelperProfile.getLM_doc());
        $(".lm_doc").prop("download", moduleHelperProfile.getLM_doc_download_label());

        $(".lm_pdf").prop("innerHTML", moduleHelperProfile.getLM_pdf_label());
        $(".lm_pdf").prop("href", moduleHelperProfile.getLM_pdf());
        $(".lm_pdf").prop("download", moduleHelperProfile.getLM_pdf_download_label());

        $(".proj_and_tech").prop("innerHTML", moduleHelperProfile.getProjects_and_Tech_label());
        $(".proj_and_tech").prop("href", moduleHelperProfile.getProjects_and_Tech());
        $(".proj_and_tech").prop("download", moduleHelperProfile.getProjects_and_Tech_download_label());


        $(".infoAboutResources_from_Internet_label").prop("innerHTML", moduleHelperProfile.getInfoAbout_Resources_from_Internet_label());
        $(".aboutMe_ProLinks").prop("innerHTML", moduleHelperProfile.getInfoAbout_Resources_from_Internet_IT_Pro_links_label());


        // [experience] section

        $(".experience_IT_label").prop("innerHTML", moduleHelperProfile.getExperience_IT_label());
        $(".experience_IT").prop("innerHTML", moduleHelperProfile.getExperience_IT());

        $(".experience_Education_label").prop("innerHTML", moduleHelperProfile.getExperience_Education_label());
        $(".experience_Education").prop("innerHTML", moduleHelperProfile.getExperience_Education());

        $(".experience_Offwork_label").prop("innerHTML", moduleHelperProfile.getExperience_Offwork_label());
        $(".experience_Offwork").prop("innerHTML", moduleHelperProfile.getExperience_Offwork());

        $(".experience_Language_label").prop("innerHTML", moduleHelperProfile.getExperience_Language_label());
        $(".experience_Language").prop("innerHTML", moduleHelperProfile.getExperience_Language());

        $(".employment_status").prop("innerHTML", moduleHelperProfile.getEmployment_status());


        // [current employer] section

        $(".employment_status").prop("innerHTML", moduleHelperProfile.getEmployment_status());


        // [history] section

        $(".history_details_company_label").prop("innerHTML", moduleHelperProfile.getHistory_details_company_label());
        $(".history_details_company_4").prop("innerHTML", moduleHelperProfile.getHistory_details_company_4());
        $(".history_details_company_3").prop("innerHTML", moduleHelperProfile.getHistory_details_company_3());
        $(".history_details_company_2").prop("innerHTML", moduleHelperProfile.getHistory_details_company_2());
        $(".history_details_company_1").prop("innerHTML", moduleHelperProfile.getHistory_details_company_1());

        $(".history_details_timePeriod_label").prop("innerHTML", moduleHelperProfile.getHistory_details_timePeriod_label());
        $(".history_details_timePeriod_4").prop("innerHTML", moduleHelperProfile.getHistory_details_timePeriod_4());
        $(".history_details_timePeriod_3").prop("innerHTML", moduleHelperProfile.getHistory_details_timePeriod_3());
        $(".history_details_timePeriod_2").prop("innerHTML", moduleHelperProfile.getHistory_details_timePeriod_2());
        $(".history_details_timePeriod_1").prop("innerHTML", moduleHelperProfile.getHistory_details_timePeriod_1());

        $(".history_details_occupation_label").prop("innerHTML", moduleHelperProfile.getHistory_details_occupation_label());
        $(".history_details_occupation_4").prop("innerHTML", moduleHelperProfile.getHistory_details_occupation_4());
        $(".history_details_occupation_3").prop("innerHTML", moduleHelperProfile.getHistory_details_occupation_3());
        $(".history_details_occupation_2").prop("innerHTML", moduleHelperProfile.getHistory_details_occupation_2());
        $(".history_details_occupation_1").prop("innerHTML", moduleHelperProfile.getHistory_details_occupation_1());

        $(".history_details_technologies_label").prop("innerHTML", moduleHelperProfile.getHistory_details_technologies_label());
        $(".history_details_technologies_4").prop("innerHTML", moduleHelperProfile.getHistory_details_technologies_4());
        $(".history_details_technologies_3").prop("innerHTML", moduleHelperProfile.getHistory_details_technologies_3());
        $(".history_details_technologies_2").prop("innerHTML", moduleHelperProfile.getHistory_details_technologies_2());
        $(".history_details_technologies_1").prop("innerHTML", moduleHelperProfile.getHistory_details_technologies_1());

        $(".history_details_projects_label").prop("innerHTML", moduleHelperProfile.getHistory_details_projects_label());
        $(".history_details_projects_4").prop("innerHTML", moduleHelperProfile.getHistory_details_projects_4());
        $(".history_details_projects_3").prop("innerHTML", moduleHelperProfile.getHistory_details_projects_3());
        $(".history_details_projects_2").prop("innerHTML", moduleHelperProfile.getHistory_details_projects_2());
        $(".history_details_projects_1").prop("innerHTML", moduleHelperProfile.getHistory_details_projects_1());


        // [skills] section

        $(".skills_pLanguages_label_1").prop("innerHTML", moduleHelperProfile.getSkills_pLanguages_label_1());
        $(".skills_pLanguages_1").prop("innerHTML", moduleHelperProfile.getSkills_pLanguages_1());

        $(".skills_pTechnologies_label_1").prop("innerHTML", moduleHelperProfile.getSkills_pTechnologies_label_1());
        $(".skills_pTechnologies_1").prop("innerHTML", moduleHelperProfile.getSkills_pTechnologies_1());
        $(".skills_pTechnologies_label_2").prop("innerHTML", moduleHelperProfile.getSkills_pTechnologies_label_2());
        $(".skills_pTechnologies_2").prop("innerHTML", moduleHelperProfile.getSkills_pTechnologies_2());

        $(".skills_pFrameworks_label_1").prop("innerHTML", moduleHelperProfile.getSkills_pFrameworks_label_1());
        $(".skills_pFrameworks_1").prop("innerHTML", moduleHelperProfile.getSkills_pFrameworks_1());
        $(".skills_pFrameworks_label_2").prop("innerHTML", moduleHelperProfile.getSkills_pFrameworks_label_2());
        $(".skills_pFrameworks_2").prop("innerHTML", moduleHelperProfile.getSkills_pFrameworks_2());
        $(".skills_pFrameworks_label_3").prop("innerHTML", moduleHelperProfile.getSkills_pFrameworks_label_3());
        $(".skills_pFrameworks_3").prop("innerHTML", moduleHelperProfile.getSkills_pFrameworks_3());

        $(".skills_pDatabases_label_1").prop("innerHTML", moduleHelperProfile.getSkills_pDatabases_label_1());
        $(".skills_pDatabases_1").prop("innerHTML", moduleHelperProfile.getSkills_pDatabases_1());
        $(".skills_pDatabases_label_2").prop("innerHTML", moduleHelperProfile.getSkills_pDatabases_label_2());
        $(".skills_pDatabases_2").prop("innerHTML", moduleHelperProfile.getSkills_pDatabases_2());
        $(".skills_pDatabases_label_3").prop("innerHTML", moduleHelperProfile.getSkills_pDatabases_label_3());
        $(".skills_pDatabases_3").prop("innerHTML", moduleHelperProfile.getSkills_pDatabases_3());
        
        $(".skills_pTools_label_1").prop("innerHTML", moduleHelperProfile.getSkills_pTools_label_1());
        $(".skills_pTools_1").prop("innerHTML", moduleHelperProfile.getSkills_pTools_1());
        $(".skills_pTools_label_2").prop("innerHTML", moduleHelperProfile.getSkills_pTools_label_2());
        $(".skills_pTools_2").prop("innerHTML", moduleHelperProfile.getSkills_pTools_2());
        $(".skills_pTools_label_3").prop("innerHTML", moduleHelperProfile.getSkills_pTools_label_3());
        $(".skills_pTools_3").prop("innerHTML", moduleHelperProfile.getSkills_pTools_3());
        $(".skills_pTools_label_4").prop("innerHTML", moduleHelperProfile.getSkills_pTools_label_4());
        $(".skills_pTools_4").prop("innerHTML", moduleHelperProfile.getSkills_pTools_4());
        $(".skills_pTools_label_5").prop("innerHTML", moduleHelperProfile.getSkills_pTools_label_5());
        $(".skills_pTools_5").prop("innerHTML", moduleHelperProfile.getSkills_pTools_5());

        $(".skills_pVersionControlSystems_label_1").prop("innerHTML", moduleHelperProfile.getSkills_pVersionControlSystems_label_1());
        $(".skills_pVersionControlSystems_1").prop("innerHTML", moduleHelperProfile.getSkills_pVersionControlSystems_1());
        $(".skills_pVersionControlSystems_label_2").prop("innerHTML", moduleHelperProfile.getSkills_pVersionControlSystems_label_2());
        $(".skills_pVersionControlSystems_2").prop("innerHTML", moduleHelperProfile.getSkills_pVersionControlSystems_2());

        $(".skills_pPendingStuff_label_1").prop("innerHTML", moduleHelperProfile.getSkills_pPendingStuff_label_1());
        $(".skills_pPendingStuff_1").prop("innerHTML", moduleHelperProfile.getSkills_pPendingStuff_1());


        // [footer] section

        $(".f_contactme_content").prop("innerHTML", moduleHelperProfile.getF_contactme_content());
        $(".f_address_HTML").prop("src", moduleHelperProfile.getF_address_HTML_img_src());
        $(".f_address_HTML").prop("alt", moduleHelperProfile.getF_address_HTML_img_alt());
        $(".f_address_CSS").prop("src", moduleHelperProfile.getF_address_CSS_img_src());
        $(".f_address_CSS").prop("alt", moduleHelperProfile.getF_address_CSS_img_alt());
        $(".copyright").prop("innerHTML", moduleHelperProfile.getF_address_copyright());
        $(".date").prop("innerHTML", moduleHelperProfile.getF_address_date());
        $(".address").prop("innerHTML", moduleHelperProfile.getF_address_address());
        $(".lastModified").prop("innerHTML", moduleHelperProfile.getF_address_lastModified());
     }

     function showPage_Internal() {
         $("body").css("visibility", "visible");
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


        // adjust footer or right scrollbar based on current browser agent
        adjustFooter_or_RightScrollBar_Internal();
         
        // display epigraph
        displayCurrentExperienceEpigraph_Internal();
        
        // assign event handlers
        assign_EventHandlers_Internal();

        // apply defaults for header
        apply_Header_Defaults_Internal();

        // apply defaults for info
        apply_Info_Defaults_Internal();

        // apply defaults for frame
        apply_Frame_Defaults_Internal();
	  }
     }

     self.goToITProLinksPage = function() {
         return goToITProLinksPage_Internal();
     }

     /* ~ Public API */



     /* Expose module API to the outside world */
     window.jobProfileInfo = window.jobProfileInfo || self;

     /* redirect to mobile version in case of mobile browser */    
     jsUtilities.redirectToMobileVersionIfMobileBrowserDetected(_mobileVersionPrefix);
 }
)(window)