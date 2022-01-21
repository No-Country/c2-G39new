# CRIPTO CHECK

Este proyecto está siendo desarrollado con ReactJS para el FrontEnd y Django para el Backend, utilizando Webpack para conectarlos.

## Pasos para levantar el proyecto

1. Clonar el repositorio e ingresar al directorio del proyecto.
2. Instalar librerias de Javascript ejecutando (requiere tener NodeJS instalado):

### `npm install`

3. Crear entorno virtual de python ejecutando (requiere tener python instalado):

### `python -m venv env`

4. Activar entorno de desarrollo de python ejecutando en la consola en el directorio raiz del proyecto:

### `env\Scripts\activate`

5. Instalar dependencias de python ejecutando:

### `pip install -r requirements.txt`

6. Compilar el bundle de webpack para ser consumido por Django ejecutando:

### `npm build`
Ejecuta un script definido en el package.json

7. En otra consola con el entorno de desarollo de python activado levantar el servidor de Django ejecutando:

### `python django_react_demo\manage.py runserver`
