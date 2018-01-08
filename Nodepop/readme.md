#Arrancar MongoDB:
Situarse en la carpeta en la que se encuentra instalado MongoDB y ejecutar desde terminal:
./bin/mongod --dbpath ./data/db --directoryperdb
./arrancamongodb.sh
##Desplegue
Copiar .env.example a .env y revisar los valores
#Crear tablas de usuarios y anuncios con varios resgistros en cada una
#Desde el terminal:
#Para crear la tabla anuncios
npm run initAnuncios 
#Para crear la tabla usuarios
npm run initUsuarios
#Para ejecutar en modo desarrollo
npm run dev