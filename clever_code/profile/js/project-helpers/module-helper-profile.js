/*!
 * ModuleHelper
 * (c) Software Development of Better Tomorrow
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function (window) {

    var self = this;
	

    /* module scope variables begining */    

    var _siteRootFolder = "/clever_code/";

    var _mobileVersionPrefix = "m-";

    var _disallowedResolutionsArray = ["640", "480", "800", "600", "1024", "600", "1024", "768", "1152", "864", "1280", "720"];

    var _notSupportedResolution = "This site does not support this browser or resolution." +
                                  "<br />" +
                                  "Please use Google Chrome, Opera, Safari, Firefox, Microsoft Edge or IE &gt; 8" +
                                  "<br />" +
                                  "Please use higher resolution." +
                                  "<br />" +
                                  "13\" Notebook is the base device supported. (1280 x 768)";


    var _myTitle = "Software Engineer";

    var _mainPageUrl = _siteRootFolder + "main/";

    var _blogPageRedirectionUrl = _siteRootFolder + "blog/";

    var _bioPageRedirectionUrl = _siteRootFolder + "bio/";

    var _ITProLinksPageRedirectionUrl = _siteRootFolder + "it_pro_links/";

    var _ourRootsPageRedirectionUrl = _siteRootFolder + "our_roots/";

    var _hashReplacement = "[access granted]";

    var _fullSiteName = "Software Development of Better Tomorrow";

    var _info = "Scroll the page to see the whole content";

    var _expandCollapseAll = "Expand";


    // [about me] section

    var _infoAbout_Me_label = "Info";
    var _infoAbout_Me_descr = "I live in Krakow (temporarily at ours parents due to lack of job), Lesser Poland District, Poland. <br />" +
                       "I am " + jsUtilities.calculateDateDifference(new Date(1983, 3, 16)) + " old and work as a software engineer. <br />" +
                       "If you wondering where do we come from, you can see <a class='aboutMe_ourRoots' href='#'>right here</a>.";


    var _infoAbout_MyHobby_label = "Hobby";
    var _infoAbout_MyHobby_descr = "languages, sport, music, food, tourism, abstract analysis";


    var _infoAbout_MyAchievments_label = "Activities";

    var _npmRedirectionUrl = "https://www.npmjs.com/~dabrowski-software-development";
    var _npmRedirectionUrl_label = "npm";

    var _GitHubRedirectionUrl = "https://github.com/Dabrowski-Software-Development?tab=repositories";
    var _GitHubRedirectionUrl_label = "GitHub";

    var _LinkedInRedirectionUrl = "https://pl.linkedin.com/in/%C5%82ukasz-d%C4%85browski-0b448029";
    var _LinkedInRedirectionUrl_label = "LinkedIn"; 

    var _TwitterRedirectionUrl = "https://twitter.com/ld_SSP";
    var _TwitterRedirectionUrl_label = "Twitter";

    var _GitterRedirectionUrl = "https://gitter.im/dabrowski_software_development";
    var _GitterRedirectionUrl_label = "Gitter";

    var _CodePenRedirectionUrl = "https://codepen.io/d-s-d/";
    var _CodePenRedirectionUrl_label = "CodePen";

    var _OpportunityRedirectionUrl = "https://myopportunity.com/profile/ukasz-dbrowski";
    var _OpportunityRedirectionUrl_label = "Opportunity";

    var _blogPageRedirectionUrl_label = "Blog";

    var _bioPageRedirectionUrl_label = "Bio";


    var _infoAbout_MySocialMedia_label = "Social media";

    var _FacebookRedirectionUrl = "https://www.facebook.com/lukkasz.dabrowski";
    var _FacebookRedirectionUrl_label = "Facebook";
    
    var _InstagramRedirectionUrl = "https://www.instagram.com/lukkasz.dabrowski/";
    var _InstagramRedirectionUrl_label = "Instagram";
    
    var _MediumRedirectionUrl = "https://medium.com/@ld_SSP";
    var _MediumRedirectionUrl_label = "Medium";
    
    var _dribbbleRedirectionUrl = "https://dribbble.com/ld_SSP";
    var _dribbbleRedirectionUrl_label = "dribbble";

    var _infoAbout_MySkype_label = "Skype";
    var _skypeCallMeRedirectionUrl = "skype:lukaszdabrowskicom?call";
    var _skypeCallMeRedirectionUrl_label = "Call me";

    var _skypeChatWithMeRedirectionUrl = "skype:lukaszdabrowskicom?chat";
    var _skypeChatWithMeRedirectionUrl_label = " Chat with me";

    var _skypeAddMeToContactsRedirectionUrl = "skype:lukaszdabrowskicom?add";
    var _skypeAddMeToContactsRedirectionUrl_label = "Add me to contacts";

    var _skypeProfileRedirectionUrl = "skype:lukaszdabrowskicom?userinfo";
    var _skypeProfileRedirectionUrl_label = "Profile";


    var _infoAbout_MyDownload_label = "Download";

    var _cv_doc_Url_label = "CV (doc)";
    var _cv_doc_Url = "../main/download/CV.doc";
    var _cv_doc_download_label = "CV Łukasz Dąbrowski.doc";

    var _cv_pdf_Url_label = "CV (pdf)";
    var _cv_pdf_Url = "../main/download/CV.pdf";
    var _cv_pdf_download_label = "CV Łukasz Dąbrowski.pdf";

    var _lm_doc_Url_label = "LM (doc)";
    var _lm_doc_Url = "../main/download/LM.doc";
    var _lm_doc_download_label = "LM Łukasz Dąbrowski.doc";

    var _lm_pdf_Url_label = "LM (pdf)";
    var _lm_pdf_Url = "../main/download/LM.pdf";
    var _lm_pdf_download_label = "LM Łukasz Dąbrowski.pdf";

    var _projects_and_tech_label = "Projects & Technologies (ppsx)";
    var _projects_and_tech = "../main/download/Projects_&_Technology.ppsx";
    var _projects_and_tech_download_label = "Projects & Technologies Łukasz Dąbrowski.ppsx";


    var _infoAbout_Resources_from_Internet_label = "Resources from Internet";
    var _infoAbout_Resources_from_Internet_IT_Pro_links_label = "IT Pro links";


    // [experience] section

    var _experience_IT_label = "IT";
    var _experience_IT = jsUtilities.calculateDateDifference(new Date(2007, 5, 1), new Date());

    var _experience_Education_label = "Education";
    var _experience_Education = "2002 – 2008  MSc in Computer Science, Kielce University of Technology, Poland";

    var _experience_Offwork_label = "Off work activities";
    var _experience_Offwork = "family duties, programming";

    var _experience_Language_label = "Languages";
    var _experience_Language = "English (CAE, FCE), Polish (native)";


    // [current employer] section

    var _employment_status = "unemployed since " + jsUtilities.getCurrentDateFormatted_2(new Date(2016, 11, 12));


    // [history] section
    
    var _history_details_company_label = "Company";
    var _history_details_company_4 = "HSBC Service Delivery (Polska) Sp. z o.o. <a href='http://www.hsbcservicedelivery.com/' target='_blank'><div class='custom_link'>#company-website</div></a>";
    var _history_details_company_3 = "e-Xim IT<a href='https://www.e-xim.pl' target='_blank'><div class='custom_link'>#company-website</div></a>";
    var _history_details_company_2 = "PGS Software<a href='https://www.pgs-soft.com' target='_blank'><div class='custom_link'>#company-website</div></a>";
    var _history_details_company_1 = "Infover<a href='https://www.infover.pl' target='_blank'><div class='custom_link'>#company-website</div></a>";

    var _history_details_timePeriod_label = "Time period";
    var _history_details_timePeriod_4 = jsUtilities.calculateDateDifference(new Date(2016, 6, 1), new Date(2016, 11, 10));
    var _history_details_timePeriod_3 = jsUtilities.calculateDateDifference(new Date(2015, 11, 1), new Date(2016, 5, 30));
    var _history_details_timePeriod_2 = jsUtilities.calculateDateDifference(new Date(2015, 5, 15), new Date(2015, 10, 13));
    var _history_details_timePeriod_1 = jsUtilities.calculateDateDifference(new Date(2008, 6, 1), new Date(2015, 6, 1));

    var _history_details_occupation_label = "Occupation";
    var _history_details_occupation_4 = "senior programmer of financial applications";
    var _history_details_occupation_3 = "senior programmer";
    var _history_details_occupation_2 = "programmer - web developer";
    var _history_details_occupation_1 = "programmer - desktop developer";

    var _history_details_technologies_label = "Technologies";
    var _history_details_technologies_4 = ".NET, T-SQL";
    var _history_details_technologies_3 = ".NET, SOA, T-SQL, MySQL";
    var _history_details_technologies_2 = "C#, TSQL, ASP .NET WebForms, ASP .NET MVC, HTML5, CSS 2/3, Javascript, jQuery, Knockout, WebServices";
    var _history_details_technologies_1 = "C#, TSQL, ADO.NET, NHibernate, WebServices,<br />DevExpress v6.3/v7.3/v13.x, ReSharper, VS 2008/VS2010";

    var _history_details_projects_label = "Projects description";
    var _history_details_projects_4 = "internal project";
    var _history_details_projects_3 = "Help Desk Software (data integration services)";
    var _history_details_projects_2 = "Integrated software solution for logistic company";
    var _history_details_projects_1 = "CRM/Koltrack - integrated software solution for logistic company,<br />Opiekun - mobile solution for gathering information in an organized manner";


    // [history] section

    var _skills_pLanguages_label_1 = "C#, TSQL";
    var _skills_pLanguages_1 = jsUtilities.calculateDateDifference(new Date(2008, 5, 1));

    var _skills_pTechnologies_label_1 = "ASP.NET WebForms, ASP.NET MVC, Knockout";
    var _skills_pTechnologies_1 = jsUtilities.calculateDateDifference(new Date(2015, 3, 1), new Date(2015, 11, 1));
    var _skills_pTechnologies_label_2 = "HTML5, CSS 2/3, JavaScript, jQuery";
    var _skills_pTechnologies_2 = jsUtilities.calculateDateDifference(new Date(2015, 3, 1));

    var _skills_pFrameworks_label_1 = ".NET 2.0/3.5 [C# 2.0, C# 3.0]";
    var _skills_pFrameworks_1 = jsUtilities.calculateDateDifference(new Date(2008, 6, 1), new Date(2015, 6, 1));
    var _skills_pFrameworks_label_2 = ".NET 4.0/4.5.x/4.6.1 [C# 4.0, C# 5.0, C# 6.0]";
    var _skills_pFrameworks_2 = jsUtilities.calculateDateDifference(new Date(2015, 5, 1));
    var _skills_pFrameworks_label_3 = ".NET 4.7 [C# 7.0]";
    var _skills_pFrameworks_3 = jsUtilities.calculateDateDifference(new Date(2017, 4, 11));

    var _skills_pDatabases_label_1 = "MSSQL 2005/2008";
    var _skills_pDatabases_1 = jsUtilities.calculateDateDifference(new Date(2008, 6, 1));
    var _skills_pDatabases_label_2 = "MSSQL 2008 R2";
    var _skills_pDatabases_2 = jsUtilities.calculateDateDifference(new Date(2014, 0, 1));
    var _skills_pDatabases_label_3 = "MSSQL 2012";
    var _skills_pDatabases_3 = jsUtilities.calculateDateDifference(new Date(2017, 2, 23)); 

    var _skills_pTools_label_1 = "Microsoft Visual Studio 2008/2010, Resharper, Toolbelt";
    var _skills_pTools_1 = jsUtilities.calculateDateDifference(new Date(2008, 6, 1), new Date(2015, 6, 1));
    var _skills_pTools_label_2 = "Microsoft Visual Studio 2013";
    var _skills_pTools_2 = jsUtilities.calculateDateDifference(new Date(2015, 6, 1), new Date(2015, 10, 1));
    var _skills_pTools_label_3 = "Microsoft Visual Studio 2015";
    var _skills_pTools_3 = jsUtilities.calculateDateDifference(new Date(2015, 6, 1), new Date(2017, 2, 10));
    var _skills_pTools_label_4 = "Microsoft Visual Studio 2017";
    var _skills_pTools_4 = jsUtilities.calculateDateDifference(new Date(2017, 2, 10));
    var _skills_pTools_label_5 = "VS Code";
    var _skills_pTools_5 = jsUtilities.calculateDateDifference(new Date(2017, 0, 1));
    
    var _skills_pVersionControlSystems_label_1 = "Git [Git Extensions, GitHub Desktop, SourceTree, GitBash]";
    var _skills_pVersionControlSystems_1 = jsUtilities.calculateDateDifference(new Date(2014, 2, 1));
    var _skills_pVersionControlSystems_label_2 = "SVN [TortoiseSVN, AnkhSVN]";
    var _skills_pVersionControlSystems_2 = jsUtilities.calculateDateDifference(new Date(2014, 2, 1));

    var _skills_pPendingStuff_label_1 = "Linux";
    var _skills_pPendingStuff_1 = jsUtilities.calculateDateDifference(new Date(2017, 2, 1));


    // [footer] section

    var _f_contactme_content = "Do not hesitate to contact via phone: <span class='phone'>(+48) 506 942 743</span> or e-mail me by clicking on this email address: <span class='email'><a href='mailto:lukkasz.dabrowski@gmail.com'>lukkasz.dabrowski@gmail.com</a></span>";

    var _f_address_HTML_img_src = "https://jigsaw.w3.org/css-validator/images/vcss";
    var _f_address_HTML_img_alt = "W3C validation passed";

    var _f_address_CSS_img_src = "https://jigsaw.w3.org/css-validator/images/vcss-blue";
    var _f_address_CSS_img_alt = "W3C validation passed";

    var _f_address_copyright = "&copy;";

    var _f_address_date = new Date().getFullYear();
    var _f_address_address = _fullSiteName;
    var _f_address_lastModified = "Last modified:" + document.lastModified;

    /* module scope variables end */



    /* Public API */

    self.getMobileVersionPrefix = function() {
        return _mobileVersionPrefix;
    }

    self.getDisallowedResolutionsArray = function() {
        return _disallowedResolutionsArray;
    }

    self.getMyTitle = function() {
        return _myTitle;
    }

    self.getMainPageUrl = function() {
        return _mainPageUrl;
    }

    self.getBlogPageRedirectionUrl = function() {
        return _blogPageRedirectionUrl;
    }
    
    self.getBlogPageRedirectionUrl_label = function() {
        return _blogPageRedirectionUrl_label
    }

    self.getBioPageRedirectionUrl = function() {
        return _bioPageRedirectionUrl;
    }

    self.getBioPageRedirectionUrl_label = function() {
        return _bioPageRedirectionUrl_label;
    }    

    self.getITProLinksPageRedirectionUrl = function() {
        return _ITProLinksPageRedirectionUrl;
    }

    self.getOurRootsPageRedirectionUrl = function() {
        return _ourRootsPageRedirectionUrl;
    }

    self.getNotSupportedResolution = function() {
        return _notSupportedResolution;
    }

    self.getHashReplacement = function() {
        return _hashReplacement;
    }

    self.getInfo = function() {
        return _info;
    }

    self.getExpandCollapseAll = function() {
        return _expandCollapseAll;
    }

    self.getInfoAbout_Me_label = function() {
        return _infoAbout_Me_label;
    }

    self.getInfoAbout_Me_descr = function() {
        return _infoAbout_Me_descr;
    }

    self.getInfoAbout_MyHobby_label = function() {
        return _infoAbout_MyHobby_label;
    }

    self.getInfoAbout_MyHobby_descr = function() {
        return _infoAbout_MyHobby_descr;
    }

    self.getInfoAbout_MyAchievments_label = function() {
        return _infoAbout_MyAchievments_label;
    }

    self.getNpmPageRedirectionUrl_label = function() {
        return _npmRedirectionUrl_label;
    }

    self.getNpmPageRedirectionUrl = function() {
        return _npmRedirectionUrl;
    }

    self.getGitHubPageRedirectionUrl_label = function() {
        return _GitHubRedirectionUrl_label;
    }

    self.getGitHubPageRedirectionUrl = function() {
        return _GitHubRedirectionUrl;
    }

    self.getLinkedInPageRedirectionUrl_label = function() {
        return _LinkedInRedirectionUrl_label;
    }

    self.getLinkedInPageRedirectionUrl = function() {
        return _LinkedInRedirectionUrl;
    }

    self.getTwitterPageRedirectionUrl_label = function() {
        return _TwitterRedirectionUrl_label;
    }    

    self.getTwitterPageRedirectionUrl = function() {
        return _TwitterRedirectionUrl;
    }

    self.getGitterPageRedirectionUrl_label = function() {
        return _GitterRedirectionUrl_label;
    }

    self.getGitterPageRedirectionUrl = function() {
        return _GitterRedirectionUrl;
    }

    self.getCodePenPageRedirectionUrl_label = function() {
        return _CodePenRedirectionUrl_label;
    }

    self.getCodePenPageRedirectionUrl = function() {
        return _CodePenRedirectionUrl;
    }

    self.getOpportunityPageRedirectionUrl_label = function() {
        return _OpportunityRedirectionUrl_label;
    }

    self.getOpportunityPageRedirectionUrl = function() {
        return _OpportunityRedirectionUrl;
    }

    self.getInfoAbout_MySocialMedia_label = function() {
        return _infoAbout_MySocialMedia_label;
    }

    self.getFacebookPageRedirectionUrl_label = function() {
        return _FacebookRedirectionUrl_label;
    }

    self.getFacebookPageRedirectionUrl = function() {
        return _FacebookRedirectionUrl;
    }

    self.getInstagramPageRedirectionUrl_label = function() {
        return _InstagramRedirectionUrl_label;
    }    

    self.getInstagramPageRedirectionUrl = function() {
        return _InstagramRedirectionUrl;
    }
    
    self.getMediumPageRedirectionUrl_label = function() {
        return _MediumRedirectionUrl_label;
    }

    self.getMediumPageRedirectionUrl = function() {
        return _MediumRedirectionUrl;
    }

    self.getDribbblePageRedirectionUrl_label = function() {
        return _dribbbleRedirectionUrl_label;
    }    
    
    self.getDribbblePageRedirectionUrl = function() {
        return _dribbbleRedirectionUrl;
    }

    self.getInfoAbout_MySkype_label = function() {
        return _infoAbout_MySkype_label;
    }

    self.getSkypeCallMeRedirectionUrl_label = function() {
        return _skypeCallMeRedirectionUrl_label;
    }    

    self.getSkypeCallMeRedirectionUrl = function() {
        return _skypeCallMeRedirectionUrl;
    }

    self.getSkypeChatWithMeRedirectionUrl_label = function() {
        return _skypeChatWithMeRedirectionUrl_label;
    }

    self.getSkypeChatWithMeRedirectionUrl = function() {
        return _skypeChatWithMeRedirectionUrl;
    }

    self.getSkypeAddMeToContactsRedirectionUrl_label = function() {
        return _skypeAddMeToContactsRedirectionUrl_label;
    }

    self.getSkypeAddMeToContactsRedirectionUrl = function() {
        return _skypeAddMeToContactsRedirectionUrl;
    }

    self.getSkypeProfileRedirectionUrl_label = function() {
        return _skypeProfileRedirectionUrl_label;
    }

    self.getSkypeProfileRedirectionUrl = function() {
        return _skypeProfileRedirectionUrl;
    }

    self.getInfoAbout_MyDownload_label = function() {
        return _infoAbout_MyDownload_label;
    }

    self.getCV_doc_label = function() {
        return _cv_doc_Url_label;
    }

    self.getCV_doc = function() {
        return _cv_doc_Url;
    }

    self.getCV_doc_download_label = function() {
        return _cv_doc_download_label;
    }

    self.getCV_pdf_label = function() {
        return _cv_pdf_Url_label;
    }

    self.getCV_pdf = function() {
        return _cv_pdf_Url;
    }

    self.getCV_pdf_download_label = function() {
        return _cv_pdf_download_label;
    }    

    self.getLM_doc_label = function() {
        return _lm_doc_Url_label;
    }

    self.getLM_doc = function() {
        return _lm_doc_Url;
    }

    self.getLM_doc_download_label = function() {
        return _lm_doc_download_label;
    }    

    self.getLM_pdf_label = function() {
        return _lm_pdf_Url_label;
    }

    self.getLM_pdf = function() {
        return _lm_pdf_Url;
    }
    
    self.getLM_pdf_download_label = function() {
        return _lm_pdf_download_label;
    }    

    self.getProjects_and_Tech_label = function() {
        return _projects_and_tech_label;
    }

    self.getProjects_and_Tech = function() {
        return _projects_and_tech;
    }
    
    self.getProjects_and_Tech_download_label = function() {
        return _projects_and_tech_download_label;
    }

    self.getInfoAbout_Resources_from_Internet_label = function() {
        return _infoAbout_Resources_from_Internet_label;
    }

    self.getInfoAbout_Resources_from_Internet_IT_Pro_links_label = function() {
        return _infoAbout_Resources_from_Internet_IT_Pro_links_label;
    }    

    self.getExperience_IT_label = function() {
        return _experience_IT_label;
    }

    self.getExperience_IT = function() {
        return _experience_IT;
    }

    self.getExperience_Education_label = function() {
        return _experience_Education_label;
    }

    self.getExperience_Education = function() {
        return _experience_Education;
    }

    self.getExperience_Offwork_label = function() {
        return _experience_Offwork_label;
    }

    self.getExperience_Offwork = function() {
        return _experience_Offwork;
    }

    self.getExperience_Language_label = function() {
        return _experience_Language_label;
    }

    self.getExperience_Language = function() {
        return _experience_Language;
    }

    self.getEmployment_status = function() {
        return _employment_status;
    }

    self.getHistory_details_company_label = function() {
        return _history_details_company_label;
    }

    self.getHistory_details_company_4 = function() {
        return _history_details_company_4;
    }
    
    self.getHistory_details_company_3 = function() {
        return _history_details_company_3;
    }

    self.getHistory_details_company_2 = function() {
        return _history_details_company_2;
    }

    self.getHistory_details_company_1 = function() {
        return _history_details_company_1;
    }

    self.getHistory_details_timePeriod_label = function() {
        return _history_details_timePeriod_label;
    }

    self.getHistory_details_timePeriod_4 = function() {
        return _history_details_timePeriod_4;
    }

    self.getHistory_details_timePeriod_3 = function() {
        return _history_details_timePeriod_3;
    }

    self.getHistory_details_timePeriod_2 = function() {
        return _history_details_timePeriod_2;
    }

    self.getHistory_details_timePeriod_1 = function() {
        return _history_details_timePeriod_1;
    }

    self.getHistory_details_occupation_label = function() {
        return _history_details_occupation_label;
    }

    self.getHistory_details_occupation_4 = function() {
        return _history_details_occupation_4;
    }

    self.getHistory_details_occupation_3 = function() {
        return _history_details_occupation_3;
    }

    self.getHistory_details_occupation_2 = function() {
        return _history_details_occupation_2;
    }

    self.getHistory_details_occupation_1 = function() {
        return _history_details_occupation_1;
    }

    self.getHistory_details_technologies_label = function() {
        return _history_details_technologies_label;
    }

    self.getHistory_details_technologies_4 = function() {
        return _history_details_technologies_4;
    }

    self.getHistory_details_technologies_3 = function() {
        return _history_details_technologies_3;
    }
    
    self.getHistory_details_technologies_2 = function() {
        return _history_details_technologies_2;
    }
    
    self.getHistory_details_technologies_1 = function() {
        return _history_details_technologies_1;
    }    

    self.getHistory_details_projects_label = function() {
        return _history_details_projects_label;
    }

    self.getHistory_details_projects_4 = function() {
        return _history_details_projects_4;
    }

    self.getHistory_details_projects_3 = function() {
        return _history_details_projects_3;
    }

    self.getHistory_details_projects_2 = function() {
        return _history_details_projects_2;
    }

    self.getHistory_details_projects_1 = function() {
        return _history_details_projects_1;
    }

    self.getSkills_pLanguages_label_1 = function() {
        return _skills_pLanguages_label_1;
    }

    self.getSkills_pLanguages_1 = function() {
        return _skills_pLanguages_1;
    }

    self.getSkills_pTechnologies_label_1 = function() {
        return _skills_pTechnologies_label_1;
    }

    self.getSkills_pTechnologies_1 = function() {
        return _skills_pTechnologies_1;
    }

    self.getSkills_pTechnologies_label_2 = function() {
        return _skills_pTechnologies_label_2;
    }

    self.getSkills_pTechnologies_2 = function() {
        return _skills_pTechnologies_2;
    }

    self.getSkills_pFrameworks_label_1 = function() {
        return _skills_pFrameworks_label_1;
    }

    self.getSkills_pFrameworks_1 = function() {
        return _skills_pFrameworks_1;
    }

    self.getSkills_pFrameworks_label_2 = function() {
        return _skills_pFrameworks_label_2;
    }

    self.getSkills_pFrameworks_2 = function() {
        return _skills_pFrameworks_2;
    }

    self.getSkills_pFrameworks_label_3 = function() {
        return _skills_pFrameworks_label_3;
    }

    self.getSkills_pFrameworks_3 = function() {
        return _skills_pFrameworks_3;
    }    

    self.getSkills_pDatabases_label_1 = function() {
        return _skills_pDatabases_label_1;
    }

    self.getSkills_pDatabases_1 = function() {
        return _skills_pDatabases_1;
    }

    self.getSkills_pDatabases_label_2 = function() {
        return _skills_pDatabases_label_2;
    }

    self.getSkills_pDatabases_2 = function() {
        return _skills_pDatabases_2;
    }

    self.getSkills_pDatabases_label_3 = function() {
        return _skills_pDatabases_label_3;
    }

    self.getSkills_pDatabases_3 = function() {
        return _skills_pDatabases_3;
    }

    self.getSkills_pTools_label_1 = function() {
        return _skills_pTools_label_1;
    }

    self.getSkills_pTools_1 = function() {
        return _skills_pTools_1;
    }

    self.getSkills_pTools_label_2 = function() {
        return _skills_pTools_label_2;
    }

    self.getSkills_pTools_2 = function() {
        return _skills_pTools_2;
    }

    self.getSkills_pTools_label_3 = function() {
        return _skills_pTools_label_3;
    }

    self.getSkills_pTools_3 = function() {
        return _skills_pTools_3;
    }

    self.getSkills_pTools_label_4 = function() {
        return _skills_pTools_label_4;
    }

    self.getSkills_pTools_4 = function() {
        return _skills_pTools_4;
    }

    self.getSkills_pTools_label_5 = function() {
        return _skills_pTools_label_5;
    }

    self.getSkills_pTools_5 = function() {
        return _skills_pTools_5;
    }

    self.getSkills_pVersionControlSystems_label_1 = function() {
        return _skills_pVersionControlSystems_label_1;
    }

    self.getSkills_pVersionControlSystems_1 = function() {
        return _skills_pVersionControlSystems_1;
    }

    self.getSkills_pVersionControlSystems_label_2 = function() {
        return _skills_pVersionControlSystems_label_2;
    }

    self.getSkills_pVersionControlSystems_2 = function() {
        return _skills_pVersionControlSystems_2;
    }

    self.getSkills_pPendingStuff_label_1 = function() {
        return _skills_pPendingStuff_label_1;
    }

    self.getSkills_pPendingStuff_1 = function() {
        return _skills_pPendingStuff_1;
    }    

    self.getF_contactme_content = function() {
        return _f_contactme_content;
    }

    self.getF_address_HTML_img_src = function() {
        return _f_address_HTML_img_src;
    }

    self.getF_address_HTML_img_alt = function() {
        return _f_address_HTML_img_alt;
    }

    self.getF_address_CSS_img_src = function() {
        return _f_address_CSS_img_src;
    }

    self.getF_address_CSS_img_alt = function() {
        return _f_address_CSS_img_alt;
    }

    self.getF_address_copyright = function() {
        return _f_address_copyright;
    }

    self.getF_address_date = function() {
        return _f_address_date;
    }

    self.getF_address_address = function() {
        return _f_address_address;
    }

    self.getF_address_lastModified = function() {
        return _f_address_lastModified;
    }

    /* ~ Public API */


    
    /* Expose module API to the outside world */
    window.moduleHelperProfile = window.moduleHelperProfile || self;
})(window)