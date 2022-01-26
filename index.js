import fetch from "node-fetch";
import "dotenv/config";

 /*function getDateFromAspNetFormat( date ) {
    const re = /-?\d+/;
    const m = re.exec(date);
    return parseInt(m[0], 10);
}


let myDate = new Date(getDateFromAspNetFormat('/Date(1643172900470-0500)/'));

console.log( new Date(  ) );*/

console.log( process.env.API_KEY );

function getStepsTestCases(  ) { 

}


//Creamos una promesa para la función addTestRun
async function addTestRun( request, countStepsFailed = 0 ) {
    const endpointService = "https://alm-itac.spiraservice.net/services/v5_0/RestService.svc/projects/37/test-runs?end_date=&username=" + process.env.USER_NAME + 
    "&api-key={" + process.env.API_KEY + "}";
    
    //Llamamos a la función fecth de la dependecia node_fetch. En el primer argumento se le pasa la url del servicio que se va a consumir, y el segundo, un objeto con las caracteristicas del
    //servicio.
    const response = await fetch( endpointService, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( [{
            "ArtifactTypeId": 5,
            "ConcurrencyDate": "/Date(1643171723693-0500)/",
            "CustomProperties": [],
            "IsAttachments": false,
            "ProjectId": request.idProject,
            "ActualDuration": 0,
            "BuildId": null,
            "EndDate": "/Date(1643179787797-0500)/",
            "EstimatedDuration": null,
            "ExecutionStatusId": 2,
            "Name": "test case automatizacion prueba - 26",
            "ReleaseId": request.idRelease,
            "StartDate": "/Date(1643171714553-0500)/",
            "TestCaseId": request.idTestCase,
            "TestRunTypeId": 1,
            "TestSetId": request.idTestSet,
            "TestSetTestCaseId": null,
            "TesterId": 43,
            "TestRunSteps": [
                {
                    "ActualDuration": 0,
                    "ActualResult": "<p>d22f</p>",
                    "Description": "Description",
                    "EndDate": "/Date(1643179787797-0500)/",
                    "ExecutionStatusId": 2,
                    "ExpectedResult": "Works as expected.",
                    "Position": 1,
                    "SampleData": null,
                    "StartDate": "/Date(1643171714553-0500)/",
                    "TestCaseId": 29619,
                    "TestStepId": 169427
                }
            ]
        } ])
    } );
    return response.json(  );
}

const request = {
    idProject: 37,
    idRelease: 1880,
    idTestCase: 29619,
    idTestSet: 1621
}

//Se le pasa como argumento una función callback, en donde se realiza el llamdo de la promesa addTestRun (este se va a ejcutar en un intervalo de 5 seg.)
setTimeout( (  ) => {
    try {
        addTestRun( request ).then( ( msg ) => { console.log( msg ); })
    } catch ( e ) {
        console.log( e );
    }
}, 5000 );






