## Instalación

Para instalar el sistema, es aconsejable crear un entorno
e instalar todas las dependencias:

    mkvirtualenv recibos
    workon recibos
    pip install -r requirements.txt

Estamos usando submodules de git. Es necarios clonar las
dependencias:

    git submodule init
    git submodule update


Luego tienes que iniciar la base de datos (solamente la primera
vez)

    python deploy.py


## Ejecutar en modo desarrollo

Una vez instaladas las dependencias, para abrir la aplicación
tendrías que ejecutar:

    python app.py

## Ejecutar en modo producción

Usamos [gunicorn][gunicorn], así que simplemente tienes que
ejecutar el siguiente comando:

    gunicorn app:app -w 4 -D

Luego, para administrar los recursos de la aplicación puedes
ejecutar:

    gunicorn-console

[gunicorn]: http://gunicorn.org/
