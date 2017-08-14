(
 function (window) {
    var self = this;
    

    /* module scope variables begining */

    var _isFlatFileStorage = false;
    var _isDatabaseStorage = false;
    var _isWebServiceStorage = false;

    var _moduleDOM_Object;

    /* module scope variables end */


    
    /* module scope private functions begining */

    function setModuleDOM_Object_Internal(moduleDOM_Object) {
        _moduleDOM_Object = moduleDOM_Object;
    }

    function readDataFromFile_Internal(filePath, callback) {
          var temporaryContainer = $("<div />");

          $(temporaryContainer).load(
                                        filePath,
                                        function(responseTxt, textStatus, jqXHR) {
                                                if(textStatus == "success") {
                                                    callback(responseTxt);
                                                }
                                        }
                                ); 
    }

    function parseConfig_Internal(configData) {        
        // parse config to JSON object
        var configJsonObject = JSON.parse(configData);

        // parse config JSON
        parseConfigJsonObject_Internal(configJsonObject);
    }

    function parseConfigJsonObject_Internal(configJsonObject) {
        // validate object
        var isValid = validate_SALM_Params_Object_Internal(configJsonObject);
        if(!isValid) {
            throw Error("SALM invalid params object passed");
        }
        
        // parse object
        var storageObject = parse_SALM_Params_Object_Internal(configJsonObject);
        
        // performm actual storage data fetching asynchronously
        return doRetrieval_Internal(storageObject);
    }

    function validate_SALM_Params_Object_Internal(salpo) {
        var isValid = false;

        // validate storage type

        if(salpo.isFile !== 'undefined' && salpo.isFile === true) {
            _isFlatFileStorage = true;
        }
        else if(salpo.isDatabase !== 'undefined' && salpo.isDatabase === true) {
            _isDatabaseStorage = true;
        }
        else if(salpo.isService !== 'undefined' && salpo.isService === true) {
            _isWebServiceStorage = true;
        }

        // evaluate validation result
        isValid = _isFlatFileStorage || _isDatabaseStorage || _isWebServiceStorage;


        // validate storage type metadata if #1 validation phase passed
        if(isValid) {

            //reset flags to check the second validation phase
            isValid = _isFlatFileStorage = _isDatabaseStorage = _isWebServiceStorage = false;


            if(
                        salpo.isFile === true &&
                        salpo.storageLocation !== 'undefined' && salpo.storageLocation !== ""
              )
                    {
                        _isFlatFileStorage = true;
                    }
            else if(
                        salpo.isDatabase === true &&
                        salpo.serverSideScriptUrl !== 'undefined' && salpo.serverSideScriptUrl !== "" &&
                        salpo.contentType !== 'undefind' && salpo.contentType !== "" &&
                        salpo.dataType !== 'undefind' && salpo.dataType !== "" &&
                        salpo.serverName !== 'undefined' && salpo.serverName !== "" &&
                        salpo.portNumber !== 'undefined' && salpo.portNumber !== 0 &&
                        salpo.databaseName !== 'undefined' && 
                        salpo.userName !== 'undefined' && salpo.userName !== "" &&
                        salpo.userPassword !== 'undefined' && salpo.userPassword !== "" &&
                        salpo.queryString !== 'undefined' && salpo.queryString !== ""
                   )
                     {
                        _isDatabaseStorage = true;

                        if(salpo.databaseRequestRequiresAuth === true && salpo.databaseRequestAuth == undefined) {
                            _isDatabaseStorage = false;
                        }
                     }
            else if(
                        salpo.isService === true &&
                        salpo.serviceUrl !== 'undefined' && salpo.serviceUrl !== "" &&
                        salpo.contentType !== 'undefind' && salpo.contentType !== "" &&
                        salpo.dataType !== 'undefind' && salpo.dataType !== ""                        
                   )
                     {
                        _isWebServiceStorage = true;


                        var serviceMethodParamsValidationPassed = true;

                        if(salpo.serviceMethodRequiresParams === true && salpo.serviceMethodParams == undefined) {
                           serviceMethodParamsValidationPassed = false;
                        }


                        var serviceMethodAuthValidationPassed = true;

                        if(salpo.serviceMethodRequiresAuth === true && salpo.serviceMethodAuth == undefined) {
                            serviceMethodAuthValidationPassed = false;
                        }


                        _isWebServiceStorage = _isWebServiceStorage && serviceMethodParamsValidationPassed && serviceMethodAuthValidationPassed;
                     }
        }

        // evaluate validation result
        isValid = _isFlatFileStorage || _isDatabaseStorage || _isWebServiceStorage;

        return isValid;
    }

    function parse_SALM_Params_Object_Internal(salpo) {
        var storageDataObject;

        if(_isFlatFileStorage) {
            storageDataObject = convertTo_FlatFile_AbstractionLayer_Internal(salpo);
        }
        else if(_isDatabaseStorage) {
            storageDataObject = convertTo_Database_AbstractionLayer_Internal(salpo);
        }
        else if(_isWebServiceStorage) {
            storageDataObject = convertTo_WebService_AbstractionLayer_Internal(salpo);
        }

        // add callback function to handle storage abstraction response data
        storageDataObject.callback = handleStorageAbstractionResponseData_Internal;

        return storageDataObject;
    }

    function convertTo_FlatFile_AbstractionLayer_Internal(salpo) {
        
        var result = {
            storageLocation : salpo.storageLocation,
            isFlatFile : _isFlatFileStorage
        };
        
        if(_moduleDOM_Object.use_flat_file_storage_view_bag_data === true) {
            result.storageLocation += _moduleDOM_Object.flat_file_storage_view_bag_data;
        }

        return result;
    }

    function convertTo_Database_AbstractionLayer_Internal(salpo) {

        var result = {
            serverSideScriptUrl : salpo.serverSideScriptUrl,
            contentType : salpo.contentType,
            dataType : salpo.dataType,
            serverName : salpo.serverName,
            portNumber : salpo.portNumber,
            databaseName : salpo.databaseName,
            userName : salpo.userName,
            userPassword : salpo.userPassword,
            queryString : salpo.queryString,
            databaseRequestRequiresAuth : salpo.databaseRequestRequiresAuth,
            databaseRequestAuth : salpo.databaseRequestAuth,            
            isDatabase : _isDatabaseStorage
        };

        return result;
    }

    function convertTo_WebService_AbstractionLayer_Internal(salpo) {

        var result = {
            serviceUrl : salpo.serviceUrl,
            contentType : salpo.contentType,
            dataType : salpo.dataType,            
            serviceMethodRequiresParams : salpo.serviceMethodRequiresParams,
            serviceMethodParams : salpo.serviceMethodParams,
            serviceMethodRequiresAuth : salpo.serviceMethodRequiresAuth,
            serviceMethodAuth : salpo.serviceMethodAuth,
            isWebService : _isWebServiceStorage
        };

        return result;
    }

    function doRetrieval_Internal(storageObject) {
        // fetch data from external source
        return fetchDataFromStorage_Internal(storageObject);
    }

    function fetchDataFromStorage_Internal(storageDataObject) {
        if(storageDataObject.isFlatFile) {
                jsUtilities.loadDynamicallyContent(
                                                    storageDataObject.storageLocation,
                                                    storageDataObject.callback
                                                  );
        }
        else if(storageDataObject.isDatabase) {
            $.ajax(
                    {
                        type: "GET",
                        url: storageDataObject.serverSideScriptUrl,
                        data:
                                                {
                                                    "ServerName" : storageDataObject.serverName,
                                                    "PortNumber" : storageDataObject.portNumber,
                                                    "DatabaseName" : storageDataObject.databaseName,
                                                    "UserName" : storageDataObject.userName,
                                                    "UserPassword" : storageDataObject.userPassword,
                                                    "QueryString" : storageDataObject.queryString
                                                },
                        contentType: storageDataObject.contentType,
                        dataType: storageDataObject.dataType,
                        processData: true,
                        crossDomain: true,
                        beforeSend: function (xhr) {
                            if(storageDataObject.databaseRequestRequiresAuth) {
                                xhr.setRequestHeader('Authorization', prepareUserAuthenticationData_Internal(storageDataObject.databaseRequestAuth));
                            }
                        },
                        success: function (data) {
                            return storageDataObject.callback(data);
                        },
                        error: function (jqXHR, textStatus, err) {
                            console.log("[AJAX error]: " + textStatus + ' : ' + err);
                        }
                    }
            );

        }
        else if(storageDataObject.isWebService) {
            $.ajax(
                    {
                        type: "GET",
                        url: storageDataObject.serviceUrl,
                        data: storageDataObject.serviceMethodRequiresParams ?
                                                                                JSON.stringify(storageDataObject.serviceMethodParams)
                                                                            :                        
                                                                                null,
                        contentType: storageDataObject.contentType,
                        dataType: storageDataObject.dataType,
                        processData: true,
                        crossDomain: true,
                        beforeSend: function (xhr) {
                            if(storageDataObject.serviceMethodRequiresAuth) {
                                xhr.setRequestHeader('Authorization', prepareUserAuthenticationData_Internal(storageDataObject.serviceMethodAuth));
                            }
                        },  
                        success: function (data) {
                            return storageDataObject.callback(data);
                        },
                        error: function (jqXHR, textStatus, err) {
                            console.log("[AJAX error]: " + err + ", [Status]: " + textStatus);
                        }
                    }
            );
        }
        else {
            throw Error("Unsupported abstraction layer");
        }
    }

    function prepareUserAuthenticationData_Internal(operationAuthObject) {
        var token = operationAuthObject.user + ':' + operationAuthObject.password;
        var hash = window.btoa(token);

        return 'Basic ' + hash;        
    }

    function handleStorageAbstractionResponseData_Internal(storageData) {
        // check whether return data immediately or load it into application DOM
        if(_moduleDOM_Object.return_data_instead_of_loading_into_DOM === true) {
            // this method is invoked on successfull fetching data from storage abstraction & returning it to the caller
            _moduleDOM_Object.successfullCompletionCallback(storageData);
        }
        else {
            // load data into application DOM
            jsUtilities.fillChildContainersUnderGivenParentContainer_2(
                                                                        storageData,
                                                                        _moduleDOM_Object.parentContainerCssClass,
                                                                        _moduleDOM_Object.dataDivContainerCssClassName,
                                                                        _moduleDOM_Object.dataDivLineDefinitionContainerCssClassName,
                                                                        _moduleDOM_Object.errorDivContainerCssClassName,
                                                                        _moduleDOM_Object.isFirstLineHoldingTitle,
                                                                        _moduleDOM_Object.isLastLineHoldingCreationDate,
                                                                        _moduleDOM_Object.titleCssClassName,
                                                                        _moduleDOM_Object.creationDateCssClassName
                                                                    );

            // this method is invoked on successfull fetching data from storage abstraction & fullfiling application DOM
            _moduleDOM_Object.successfullCompletionCallback();
        }
    }

    /* module scope private functions end */

    

    /* Public API */

    self.getModuleData = function (pathToConfig, moduleDOM_Object) {
        
        setModuleDOM_Object_Internal(moduleDOM_Object);
        
        return readDataFromFile_Internal(pathToConfig, parseConfig_Internal)
    }

    /* ~ Public API */



    /* Expose module API to the outside world */
    window.salm = window.salm || self;
 }
)(window)