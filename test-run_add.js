import fetch from "node-fetch";

const generateParseDate = (  ) =>  "/Date(" + Date.parse( new Date(  ) ) + ")/";

const updateTestCaseTestRun =  async ( inputDate ) => {
    const endpointGetTestSteps = "https://alm-itac.spiraservice.net/services/v5_0/RestService.svc/projects/" + inputDate.idProject +"/test-cases/" + inputDate.idTestCase + 
    "/test-steps?username=" + inputDate.user.username + "&api-key=" + inputDate.user.apiKey + "";
    const responseBodyTestSteps =  await fetch( endpointGetTestSteps, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return responseBodyTestSteps.json(  );
};

function callFunctionUpdateTestRun( inputDate ) {
    try {
        if( !inputDate.idProject ) {
            throw { estado: 400, mensaje: "El parámetro idProject es requerido."};
        } else if( !inputDate.idRelease ) {
            throw { estado: 400, mensaje: "El parámetro idRelease es requerido."};
        } else if( !inputDate.idTestCase ) {
            throw { estado: 400, mensaje: "El parámetro idTestCase es requerido."};
        } else if( !inputDate.idTestSet ) {
            throw { estado: 400, mensaje: "El parámetro idTestSet es requerido."};
        } else if( inputDate.testFallido === undefined ) {
            throw { estado: 400, mensaje: "El parámetro testFallido es requerido."};
        } else {
            updateTestCaseTestRun( inputDate ).then( async ( arraySteps ) => {
                arraySteps[0].ConcurrencyDate = generateParseDate(  );
                arraySteps[0].LastUpdateDate = generateParseDate(  );
                ( inputDate.testFallido ) ? arraySteps[0].ExecutionStatusId = 1 : arraySteps[0].ExecutionStatusId = 2;
                const endpointUpdateTestRun = "https://alm-itac.spiraservice.net/services/v5_0/RestService.svc/projects/37/test-runs?end_date=&username=" + inputDate.user.username + 
                "&api-key=" + inputDate.user.apiKey + "";
                console.log( await fetch( endpointUpdateTestRun, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify( [{
                        "ArtifactTypeId": 5,
                        "ConcurrencyDate": generateParseDate(  ),
                        "CustomProperties": [],
                        "IsAttachments": false,
                        "ProjectId": inputDate.idProject,
                        "ActualDuration": 0,
                        "BuildId": null,
                        "EndDate": generateParseDate(  ),
                        "EstimatedDuration": null,
                        "ExecutionStatusId": ( inputDate.testFallido ) ? 1 : 2,
                        "Name": "Test run generated by Cypress",
                        "ReleaseId": inputDate.idRelease,
                        "StartDate": generateParseDate(  ),
                        "TestCaseId": inputDate.idTestCase,
                        "TestRunTypeId": 1,
                        "TestSetId": inputDate.idTestSet,
                        "TestSetTestCaseId": null,
                        "TesterId": 25,
                        "TestRunSteps": arraySteps
                    } ])
                } ))
            } );
        }
        return { estado: 200, mensaje: "Correcto."}
    } catch( error ) {
        console.log( "Error: " + error.mensaje );
        return error;
    }
}

export default callFunctionUpdateTestRun;