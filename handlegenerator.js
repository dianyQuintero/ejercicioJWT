let jwt = require( 'jsonwebtoken' );
let config = require( './config' );
let getUsers = require('./connection');

// Clase encargada de la creación del token
class HandlerGenerator {

    login( req, res ) {
    
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    let username = req.body.username;
    let password = req.body.password;

    // Si se especifico un usuario y contraseña, proceda con la validación
    // de lo contrario, un mensaje de error es retornado
    if( username && password ) {

    //Llamo a l funcion que obtiene los usuarios que tengan el username que se lee    
    getUsers((docs)=>{
        //Se obtiene la posición 1 del arreglo que corresponde a la contraseña del usuario buscado y se compara con la que se recibe
        if( docs[1] === password) {
        
            // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
            let token = jwt.sign( { username: username },
              config.secret, { expiresIn: '24h' } );
            
            // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
            res.json( {
              success: true,
              message: 'Authentication successful!',
              token: token
            } );
    
          } else {
            
            // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
            res.send( 403 ).json( {
              success: false,
              message: 'Incorrect username or password'
            } );
    
          }
    
    
    },username)
      // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
      // de lo contrario, un mensaje de error es retornado
      

    } else {

      // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
      res.send( 400 ).json( {
        success: false,
        message: 'Authentication failed! Please check the request'
      } );

    }

  }

  index( req, res ) {
    
    // Retorna una respuesta exitosa con previa validación del token
    res.json( {
      success: true,
      message: 'Index page'
    } );

  }
}

module.exports = HandlerGenerator;