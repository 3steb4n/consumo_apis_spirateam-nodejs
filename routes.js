import callFunctionUpdateTestRun from "./test-run_add.js";
import express from "express";

const routes = express.Router(  );

routes.post( "/", ( req, res ) => {
    const a = callFunctionUpdateTestRun( req.body );
    if( a.estado === 400 ) {
        res.status( 400 );
        res.send( {
            "datosEnviado": req.body,
            "mensaje": a.mensaje,
            "estado": a.estado
        } );
    } else if( a.estado === 200 ){
        res.status( 200 );
        res.send( {
            "datosEnviado": req.body,
            "mensaje": a.mensaje,
            "estado": a.estado
        } );
    }
} )

export default routes;