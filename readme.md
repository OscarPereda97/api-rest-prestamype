# prestamype-app

Bienvenido, aquí tenemos la documentación de uso de esta API realizada para el proceso de selección de Prestamype.

Esta API utiliza las siguientes tecnologías y librerías:
- Typescript
- MongoDB
- Axios
- Json Web Tokens

El endpoint para poder hacer las pruebas correspondientes del aplicativo es:
https://prestamype-app.herokuapp.com/prestamype-service/api/v1/client

En este documento, también se muestra la guía para poder levantar el proyecto en Heroku, utilizándolo como un prototipo.

## Documentación para levantar el proyecto en Heroku
### Requerimientos previos
Para poder iniciar este proyecto, debemos tener instalado npm y heroku en nuestros dispositivos. aquí dejo la documentación de como instalar cada uno de estos servicios.

- npm: https://phoenixnap.com/kb/install-node-js-npm-on-windows
- heroku: https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli

### Creamos una app en Heroku 
Una vez iniciada la sesión, nos vamos hasta la sección de ***new/create new app*** , luego de eso, colocamos el nombre y le damos en **create app**

### Colocamos las variables de entorno
Nos vamos hasta la sección de **Settings**, y luego descendemos hasta **Config vars**,  allí podemos agregar las variables respectivas con su *key* y *value*.

### Subimos la aplicación a Heroku
Nos situamos en el directorio de nuestra aplicación y ejecutamos el siguiente comando

    heroku git:remote -a prestamype-app

Con esto, podemos enlazar nuestro repositorio a Heroku.
Para realizar el deploy, debemos ejecutar lo siguiente:

    git add .
    git commit -m "commit"
    git push heroku <nombre_de_rama>

## Documentación de Endpoints 
##### POST */auth/signin*

    body:{
	    "email": "string",
	    "password": "string"
    }

##### POST */auth/login*

    body:{
	    "email": "string",
	    "password": "string"
    }

##### POST */exchange/step-1

    {	
	    headers:{
		    "x-access-token": JWT string
	    },
		body:{
		    "tipoCambio": "string",
		    "monto": "number"
	    }    
    }
    

##### GET */exchange/users

    {	
	    headers:{
		    "x-access-token": JWT string
	    }
    }
    

##### GET */exchange/user/:id

    {	
	    headers:{
		    "x-access-token": JWT string
	    }
    }
    

##### DELETE */exchange/user/:id*

    {	
	    headers:{
		    "x-access-token": JWT string
	    }
    }
    
