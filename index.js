import fetch from "node-fetch";
import "dotenv/config";

console.log( process.env.API_KEY );

//Creamos una promesa para la función addTestRun
async function addTestRun( request ) {
    const response = await fetch(  )
}
//devuelve una promesa
fetch("https://alm-itac.spiraservice.net/services/v5_0/RestService.svc/projects/37/test-runs/65900?username=esteban.gomez&api-key={" + process.env.API_KEY + "}").then( ( respuesta ) => {
    return respuesta.json(  );
} ).then( ( respuesta ) => {
    console.log( respuesta );
} );