# CRIPTO CHECK

Es una aplicacion de compra y venta de criptomonedas con un dashboard en el que se lista el precio de las 100 criptomonedas de mayor capitalizacion bursatil, permitiendo filtrarlas por nombre o simbolo.
La aplicacion requiere estar logueado con un usuario registrado en la página para permitir el ingreso al dashboard de criptomonedas.

Este proyecto está siendo desarrollado con ReactJS para el FrontEnd y Django para el Backend, utilizando Webpack para conectarlos.

El equipo esta conformado por:
**Edgar Ocampo**, **Matias Gonzalez** y **Jonatan Alcaraz**

La aplicacion web se encuentra desplegada en Heroku y se puede acceder desde el siguiente link:
https://criptoshop.herokuapp.com/

## Pasos para levantar el proyecto en modo desarrollo

1. Clonar el repositorio e ingresar al directorio del proyecto.
```
git clone https://github.com/No-Country/c2-G39new.git
cd c2-G39new
```
2. Moverse al directorio ./assets e instalar librerias de Javascript ejecutando (requiere tener NodeJS instalado):
```
cd assets
npm install
```
3. Compilar el bundle de webpack para ser consumido por Django ejecutando:
```
npm run build
```
No cerrar la terminal, este comando ejecuta un script definido en el package.json que compila todo el codigo JavaScript, CSS e imagenes en el proyecto React y lo empaqueta de forma que puede ser consumido por Django a traves de la libreria django-webpack-loader. El comando queda corriendo en modo watch de forma que detecta los cambios guardados y genera el nuevo bundle a ser consumido de forma automatica. 

4. Abrir una nueva terminal en la raiz del proyecto y crear entorno virtual de python ejecutando (requiere tener python instalado):
```
python -m venv env
```

5. Activar entorno de desarrollo de python ejecutando en el directorio raiz del proyecto:
```
#En terminal de windows
env\Scripts\activate
#En terminal de Linux
source ./env/Scripts/activate
```

6. Instalar dependencias de python ejecutando:
```
pip install -r requirements.txt
```

7. Antes de levantar el servidor de Django por primera ver se deben crear las migraciones de la base de datos de las aplicaciones de Django para que la aplicacion web levante correctamente. Para ello ejecutamos en el directorio raiz del proyecto:
```
python manage.py makemigrations api
python manage.py migrate

8. Por ultimo, levantamos el servidor de Django ejecutando:
```
python manage.py runserver
```
