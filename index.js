import express from "express";
import routes from "./routes.js";

const app = express(  );
app.set( "port", process.env.PORT || 8080 );
app.use( express.json(  ) );

//Rutas-----------
/*app.get( "/", ( req, resp ) => {
    resp.send( "Bienvenido a mi api" );
} )

app.get( "/crear/test-run", ( req, resp ) => {
    resp.send( "crear test run" );
} )*/

app.use( "/test-case/ejecutar", routes );

//server running
app.listen( app.get( "port" ), (  ) => {
    console.log( "Escuchando en puerto " + app.get( "port" ) );
} )