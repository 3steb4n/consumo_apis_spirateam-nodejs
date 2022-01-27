import fetch from "node-fetch";
import "dotenv/config";

const updateTestCaseTestRun =  async ( inputDate ) => {
    const endpointGetTestSteps = "https://alm-itac.spiraservice.net/services/v5_0/RestService.svc/projects/" + inputDate.idProject +"/test-cases/" + inputDate.idTestCase + 
    "/test-steps?username=" + process.env.USER_NAME + "&api-key={" + process.env.API_KEY + "}";
    const responseBodyTestSteps =  await fetch( endpointGetTestSteps, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return responseBodyTestSteps.json(  );
};

function callFunctionUpdateTestRun( inputDate, countCasesFailed = 0 ) {
    try {
        if( !inputDate.idProject ) {
            throw "El parámetro idProject es requerido.";
        } else if( !inputDate.idRelease ) {
            throw "El parámetro idRelease es requerido.";
        } else if( !inputDate.idTestCase ) {
            throw "El parámetro idTestCase es requerido.";
        } else if( !inputDate.idTestSet ) {
            throw "El parámetro idTestSet es requerido.";
        } else {
            updateTestCaseTestRun( inputDate ).then( async ( message ) => {
                ( countCasesFailed > 0 ) ? message[0].ExecutionStatusId = 1 : message[0].ExecutionStatusId = 2;
                const endpointUpdateTestRun = "https://alm-itac.spiraservice.net/services/v5_0/RestService.svc/projects/37/test-runs?end_date=&username=" + process.env.USER_NAME + 
                "&api-key={" + process.env.API_KEY + "}";
                console.log( await fetch( endpointUpdateTestRun, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify( [{
                        "ArtifactTypeId": 5,
                        "ConcurrencyDate": "/Date(1643171723693-0500)/",
                        "CustomProperties": [],
                        "IsAttachments": false,
                        "ProjectId": inputDate.idProject,
                        "ActualDuration": 0,
                        "BuildId": null,
                        "EndDate": "/Date(1643179787797-0500)/",
                        "EstimatedDuration": null,
                        "ExecutionStatusId": ( countCasesFailed > 0 ) ? 1 : 2,
                        "Name": "test case automatizacion prueba - 200",
                        "ReleaseId": inputDate.idRelease,
                        "StartDate": "/Date(1643171714553-0500)/",
                        "TestCaseId": inputDate.idTestCase,
                        "TestRunTypeId": 1,
                        "TestSetId": inputDate.idTestSet,
                        "TestSetTestCaseId": null,
                        "TesterId": 43,
                        "TestRunSteps": message
                    } ])
                } ))
                console.log( message[0] );
            } );
        }
    } catch( error ) {
        console.log( "Error: " + error );
    } finally {
        console.log( "Proceso de validación del TestCase finalizado" );
    }
}

module.exports = {
    callFunctionUpdateTestRun
}