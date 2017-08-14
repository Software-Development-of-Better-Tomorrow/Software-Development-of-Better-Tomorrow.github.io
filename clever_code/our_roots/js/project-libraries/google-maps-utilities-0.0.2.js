/*!
 * Google Maps JavaScript library v0.0.2
 * (c) Dabrowski-Software-Development (https://github.com/dabrowski-software-development/GoogleMapsUtilityFunctions)
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function (window) {
    var self = this;
	

    /* module scope variables begining */

    var _map, _infoWindow, _geocoder;

    var _baseAddress;
    var _ourHomeIconUrl;
    var _websiteVisitorIconUrl;

    /* main object holding external storage data */
    var _familyArray = [];

    var _userDataWasGeocoded = false;
    var _forLoopSleepTime = 1000;
    var _mapContainerClassName = "";

    var _pageVisitorFriendlyName = "Me";

    var _abstractionOfData;
    var _useBackwardCompatibility;

    /* module scope variables end */


    
    /* module scope private functions begining */

    function initializeBaseAddressAndMapCriticalDataStorageLocation_Internal(baseAddress, abstractionOfData, useBackwardCompatibility) {
        _baseAddress = baseAddress;
        _abstractionOfData = abstractionOfData;
        _useBackwardCompatibility = useBackwardCompatibility;

        _ourHomeIconUrl = _baseAddress + 'images/map_location_icons/home.png';
        _websiteVisitorIconUrl = _baseAddress + 'images/map_location_icons/visitor.png';        
    }

    function loadMapCriticalData_Internal(callbackFunction) {
        if(_useBackwardCompatibility === true) {
            var temporaryContainer = $("<div />");

            $(temporaryContainer).load(_abstractionOfData, doInternalConversion_Internal(callbackFunction));
        }
        else {
            doInternalConversion_2_Internal(callbackFunction);   
        }
    }

    function doInternalConversion_Internal(callbackFunction) {
        return function (responseTxt, textStatus, jqXHR) {
                    if(textStatus == "success") {
                        var emptyString = "";
                        var dataObjectArray = responseTxt.split("},");
                        var dataObjectArrayLength = dataObjectArray.length;

                        for (i = 0; i < dataObjectArrayLength; i++) {
                            var dataEntryArray = dataObjectArray[i].replace("{", emptyString).replace("}", emptyString).split("\n");
                            dataEntryArray = removeEmptyArrayItems_Internal(dataEntryArray);
                            var dataEntryArrayLength = dataEntryArray.length;
                                    
                            // main object holding external storage data
                            var family =  {
                                    family_description : "",
                                    family_location_address : "",
                                    family_location_coords : {},
                                    family_members : []             // array of 'familyMember' objects
                            };

                            for (j = 0; j < dataEntryArrayLength; j++) {
                                if(j == 0) {
                                    var family_description_parts = dataEntryArray[j].split(";");

                                    family.family_description = family_description_parts[0].trim();
                                    family.family_location_address = family_description_parts[1].trim();
                                }
                                else {
                                    // family member object definition
                                    var familyMember = {
                                            friendly_name : "",
                                            friendly_description : "",
                                            friendly_image : ""
                                    }                            
                                    
                                    var family_member_parts = dataEntryArray[j].split(";");

                                    familyMember.friendly_name = family_member_parts[0].trim();
                                    familyMember.friendly_description = family_member_parts[1].trim();
                                    familyMember.friendly_image = family_member_parts[2].trim();

                                    // store family member into family members array
                                    family.family_members.push(familyMember);
                                }
                            }
                            // store family into _familyArray array
                            _familyArray.push(family);
                        }
                        // now all required data was loaded, hence invoke callback function
                        callbackFunction();
                    }
                    else if (textStatus == "error") {
                        alert("Error while loading data, i.e.:\r\nStatus: " + jqXHR.status + "\r\nError description: " + jqXHR.statusText);
                    }
               };
    }

    function doInternalConversion_2_Internal(callbackFunction) {
        var emptyString = "";
        var dataObjectArray = _abstractionOfData.split("},");
        var dataObjectArrayLength = dataObjectArray.length;

        for (i = 0; i < dataObjectArrayLength; i++) {
            var dataEntryArray = dataObjectArray[i].replace("{", emptyString).replace("}", emptyString).split("\n");
            dataEntryArray = removeEmptyArrayItems_Internal(dataEntryArray);
            var dataEntryArrayLength = dataEntryArray.length;
                                    
            // main object holding external storage data
            var family =  {
                                    family_description : "",
                                    family_location_address : "",
                                    family_location_coords : {},
                                    family_members : []             // array of 'familyMember' objects
            };

            for (j = 0; j < dataEntryArrayLength; j++) {
                if(j == 0) {
                                    var family_description_parts = dataEntryArray[j].split(";");

                                    family.family_description = family_description_parts[0].trim();
                                    family.family_location_address = family_description_parts[1].trim();
                }
                else {
                        // family member object definition
                        var familyMember = {
                            friendly_name : "",
                            friendly_description : "",
                            friendly_image : ""
                        }                            
                                    
                        var family_member_parts = dataEntryArray[j].split(";");

                        familyMember.friendly_name = family_member_parts[0].trim();
                        familyMember.friendly_description = family_member_parts[1].trim();
                        familyMember.friendly_image = family_member_parts[2].trim();

                        // store family member into family members array
                        family.family_members.push(familyMember);
                    }
            }
            // store family into _familyArray array
            _familyArray.push(family);
        }
        // now all required data was loaded, hence invoke callback function
        callbackFunction();
    }

    function removeEmptyArrayItems_Internal(inputArray) {
            var outputArray = [];

            var outputArrayIndex = -1;
            for (indexStart = 0; indexStart < inputArray.length; indexStart++) {
                if(validateAgainstNonPrintableChars_Internal(inputArray[indexStart])) {
                outputArray.push(null);
                outputArrayIndex += 1;
                outputArray[outputArrayIndex] = inputArray[indexStart];
                }
            }

            return outputArray;
    }

    function validateAgainstNonPrintableChars_Internal(inputString) {
        if(inputString.length == 0)
         return false;
        if(inputString.length == 1 && (inputString.charCodeAt(0) == 13 || inputString.charCodeAt(0) == 10))
         return false;
        
        return true;
    }

    function markThatUserDataWasGeocoded_Internal() {
        _userDataWasGeocoded = true;
    }

    function checkWhetherUserDataWasGeocoded_Internal() {
        return _userDataWasGeocoded;
    }    

    function setMapContainerClassName_Internal(mapContainerClassName) {
        _mapContainerClassName = mapContainerClassName;
    }

    function geocodeAddress_Internal(callbackFunction) {
        // self-checking in case method was accidently invoked from different context than required
        if(_familyArray.length == 0) {
            throw new Error('Invoking this method = [geocodeAddress_Internal] makes sense if user critical data was previously loaded into application.');
        }

        // create module-wide Geocoder instance
        _geocoder = new google.maps.Geocoder();
        
        // create array of promises
        var promisesArray = [];
        // for each family object replace family_location_address from textual representation to LatLng object;
        for(var i = 0; i < _familyArray.length; i++) {
            
            var promise = new Promise(
                                function(resolve) {
                                        _geocoder.geocode(
                                                            {
                                                                "address": _familyArray[i].family_location_address
                                                            },
                                                            function(results, status) {
                                                                if (status == google.maps.GeocoderStatus.OK) {
                                                                    // mark that this promise resolved
                                                                    resolve(results[0].geometry.location);
                                                                }
                                                            }
                                                         );                                    
                                }
                     );
            promisesArray.push(promise);
        }

        // wait until all promises resolved
        Promise.all(promisesArray)
               .then(
                     function(result) {
                         // store geocoded addresses back into array of family objects
                         for(var i = 0; i < _familyArray.length; i++) {
                            _familyArray[i].family_location_coords = result[i]; //LatLng                            
                         }

                        // geocoding of textual addresses was completed, hence invoke callback function
                        markThatUserDataWasGeocoded_Internal();
                       
                        // notify user by invoking passed callback function
                        callbackFunction();           
                     },
                     function(error) {
                        alert(error);
                        return;
                     }
                    );
    }

    function initMap_Internal() {
        // self-checking in case method was accidently invoked from different context than required
        if(_familyArray.length == 0 || checkWhetherUserDataWasGeocoded_Internal() == false) {
            throw new Error('Invoking this method = [initMap_Internal] makes sense if user critical data was previously loaded into application and geocoded.');
        }

        // set Google Maps initial options
        var mapOptions = {
                        center: {
                              lat: _familyArray[0].family_location_coords.lat(), lng: _familyArray[0].family_location_coords.lng()
                        },
                        zoom: 9,
                        mapTypeId: google.maps.MapTypeId.ROADMAP               
                     };

        // create GoogleMaps instance
        _map = new google.maps.Map(
                                    document.getElementsByClassName(_mapContainerClassName)[0],
                                    mapOptions
                                  );
        
        // create GoogleMaps info window
        _infoWindow = new google.maps.InfoWindow;

        // check HTML5 Geolocation capability && load data into map
        if (navigator.geolocation) {
            setTimeout(drawOurRoots_Internal, 2000);
        }
        else {
          // browser doesn't support Geolocation
          handleLocationError_Internal(false, _map.getCenter());
        }
    }

    function drawOurRoots_Internal() {
        for (var i = 0; i < _familyArray.length; i++)
        {  
            drawFamilyMarker_Internal(_familyArray[i]);
        }
    }

    function drawFamilyMarker_Internal(family) {
        var who = family.family_description;
        var lat = family.family_location_coords.lat();
        var lng = family.family_location_coords.lng();

        // create position object
        var lat_lng = createLatLng_Internal(lat, lng);

        // create person's details of address
        var markerInfoWindow = createAddressInfo_Internal(i, family);

        // create marker
        var marker = createMarker_Internal(who, lat_lng, false);

        // subscribe to mouse 'click' event
        subscribeToMouseClickEvent_Internal(marker, markerInfoWindow);

        // show visiting user marker on the Google Maps
        updateGoogleMaps_Internal(marker);
    }

    function showPosition_Internal(userClientGeoPosition) {
        // create position object
        var lat_lng = createLatLng_Internal(userClientGeoPosition.coords.latitude, userClientGeoPosition.coords.longitude);

        // create marker
        var marker = createMarker_Internal(_pageVisitorFriendlyName, lat_lng, true);

        // find user location name asynchronously
        codeLatLng_Internal(marker, lat_lng);

        // show visiting user marker on the Google Maps
        updateGoogleMaps_Internal(marker);
    }

    function subscribeToMouseClickEvent_Internal(marker, markerInfoWindow) {
        // subscribe to mouse 'click' event
        google.maps.event.addListener(marker, 'click', (
                                                          function(marker, markerInfoWindow, _infoWindow) {
                                                              return function() {
                                                                  _infoWindow.setContent(markerInfoWindow);
                                                                  _infoWindow.open(_map, marker);
                                                              };
                                                          }
                                                          )(marker, markerInfoWindow, _infoWindow)
                                     );
    }

    function codeLatLng_Internal(marker, lat_lng) {
            var userLocationDetails = {
                    formatted_address : "",
                    city : {},
                    city_display_name : ""
            };

            _geocoder.geocode({'latLng': lat_lng}, function(results, status) {
        
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {

                    // store formatted address
                    if(results[0].formatted_address != undefined) {
                        userLocationDetails.formatted_address = results[0].formatted_address;
                    }
                    
                    // find country name
                    for (var i = 0; i < results[0].address_components.length; i++) {
                        for (var b = 0; b < results[0].address_components[i].types.length; b++) {

                            // there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                            if (results[0].address_components[i].types[b] == "administrative_area_level_1") {

                                //this is the object you are looking for
                                userLocationDetails.city = results[0].address_components[i];
                                break;
                            }
                        }
                    }
                    // city data
                    if(userLocationDetails.city != undefined) {
                        if(userLocationDetails.city.short_name === userLocationDetails.city.long_name) {
                            userLocationDetails.city_display_name = userLocationDetails.city.short_name;
                        }
                        else {
                            userLocationDetails.city_display_name = userLocationDetails.city.short_name + " " + userLocationDetails.city.long_name;
                        }
                    }
                    
                    // create person's details of address when we already have user details
                    var markerInfoWindow = createAddressInfo_Internal(Number.MAX_VALUE, { person: _pageVisitorFriendlyName, address: userLocationDetails.formatted_address });

                    // subscribe to mouse 'click' event
                    subscribeToMouseClickEvent_Internal(marker, markerInfoWindow);
                }
                else {
                    userLocationDetails.formatted_address = "No location found";
                }
            }
            else {
                userLocationDetails.formatted_address = "No location found: " + status;
            }
         }
        );
    }

    function handleLocationError_Internal(browserHasGeolocation, position) {
        _infoWindow.setPosition(position);
        _infoWindow.setContent(
                              browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.'
                             );
        _infoWindow.open(_map);
    }

    function createLatLng_Internal(latitude, longitude) {
       return new google.maps.LatLng(latitude, longitude);        
    }

    function createAddressInfo_Internal(personUniqueId, dataObject) {
        // In this case Number.MAX_VALUE represents page visitor.
        if(personUniqueId === Number.MAX_VALUE) {
            return '<div class="markerInfoWindowGuest">' +
                                    '<div class="inline gravatarGuest" />' +
                                    '<div class="inline gravatarInfoGuest">' +
                                        '<div class="markerInfo">' + dataObject.person + '</div>' +
                                        '<div class="adressInfo">' + dataObject.address + '</div>' +                    
                                    '</div>' +
                   '</div>';
        }
        else {
            var allFamilyMembersTemplate = "";

            for(var i = 0; i < dataObject.family_members.length; i++) {
                var familyMemberTemplate = fillFamilyMemberTemplate_Internal(dataObject.family_members[i], i);
                
                allFamilyMembersTemplate += familyMemberTemplate;    
            }

            return '<div class="markerInfoWindow">' +
                        '<div class="family" style="height:' + ((dataObject.family_members.length * 11.1) /* this height of 10em increased by 1.1em for each family member multiplied by the number of family members  */ +
                                                                                                5 /* this is additional space of 4em which can be used from positioning containers */ +
                                                                                                1.3 /* this 1.3 */)  + 'em">' +
                            '<div class="familyInfo">' + dataObject.family_description + '</div>' +
                            '<div class="familyMembers" style="height:' + dataObject.family_members.length * 10 + 'em">' +
                                    allFamilyMembersTemplate +
                            '</div>' +
                        '</div>' +
                   '</div>';
        }
    }

    function fillFamilyMemberTemplate_Internal(dataObject, i) {
        return  '<div class="familyMember" style="top:' + 10 + 'px; left:' + (i > 4 ? -1 : -1) + 'px">' +
                    '<div class="gravatarFamilyMember" style="background-image:url(\'' + _baseAddress + 'images/family_faces/' + dataObject.friendly_image + '\')" />' +
                    '<div class="gravatarInfo">' +
                        '<div class="markerInfo">' + dataObject.friendly_name + '</div>' +
                        '<div class="adressInfo">' + dataObject.friendly_description + '</div>' +                    
                    '</div>' +
                '</div>';
    }

    function createMarker_Internal(who, lat_lng, websiteVisitorMarker) {
       return new google.maps.Marker(
                                        {  
                                           map: _map,
                                           title: who,
                                           position: lat_lng,
                                           icon: websiteVisitorMarker ? _websiteVisitorIconUrl : _ourHomeIconUrl,
                                           animation: google.maps.Animation.DROP,
                                           draggable: false
                                        }
                                     );
    }


    function updateGoogleMaps_Internal(marker) {
        _map.setCenter(marker.getPosition());        
    }

    /* module scope private functions end */



    /* Public API */

    self.initializeBaseAddressAndMapCriticalDataStorageLocation = function(baseAddress, abstractionOfData, useBackwardCompatibility) {
        return initializeBaseAddressAndMapCriticalDataStorageLocation_Internal(baseAddress, abstractionOfData, useBackwardCompatibility);
    }

    self.loadMapCriticalData = function(callbackFunction) {
        return loadMapCriticalData_Internal(callbackFunction);
    }

    self.geocodeAddress = function(callbackFunction) {
        return geocodeAddress_Internal(callbackFunction);
    }

    self.setMapContainerClassName = function(mapContainerClassName) {
        return setMapContainerClassName_Internal(mapContainerClassName);
    }

    self.initMap = function () {
        return initMap_Internal();
    }

    self.showGuestLocation = function() {
        if (navigator.geolocation) {
            // show user location
            navigator.geolocation.getCurrentPosition(showPosition_Internal);
        }
        else {
            // browser doesn't support Geolocation
            handleLocationError_Internal(false, _map.getCenter());
        }
    }

    /* Expose module API to the outside world */
    window.googleMapsUtilities = window.googleMapsUtilities || self;
})(window)
