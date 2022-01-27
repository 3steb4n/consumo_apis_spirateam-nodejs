import fetch from "node-fetch";
import "dotenv/config";

 /*function getDateFromAspNetFormat( date ) {
    const re = /-?\d+/;
    const m = re.exec(date);
    return parseInt(m[0], 10);
}


let myDate = new Date(getDateFromAspNetFormat('/Date(1643172900470-0500)/'));

console.log( new Date(  ) );*/
const updateTestCaseTestRun =  async ( inputDate ) => {
    try {
        if( !inputDate.idTestCase ) {
            throw "El parámetro idTestCase es obligatorio.";
        } else if( !inputDate.idProject ) {
            throw "El parámetro idProject es obligatorio";
        } else {
            const endpointGetTestSteps = "https://alm-itac.spiraservice.net/services/v5_0/RestService.svc/projects/" + inputDate.idProject +"/test-cases/" + inputDate.idTestCase + 
            "/test-steps?username=" + process.env.USER_NAME + "&api-key={" + process.env.API_KEY + "}";
            const responseBodyTestSteps =  await fetch( endpointGetTestSteps, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return responseBodyTestSteps.json(  );
        }
    } catch( error ) {
        console.log( "Error: " + error );
    } finally {
        console.log( "Proceso de ejecución del TestCase finalizado" );
    }
};

function callFunctionUpdateTestRun( inputDate ) {
    updateTestCaseTestRun( inputDate ).then( async ( message ) => {
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
                "ExecutionStatusId": 2,
                "Name": "test case automatizacion prueba - 100",
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
        console.log( message[0].ArtifactTypeId );
    } );
}

const request = {
    idProject: 37,
    idRelease: 1880,
    idTestCase: undefined,
    idTestSet: 1621
}

callFunctionUpdateTestRun( request );
