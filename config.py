import os

DEBUG = True
SECRET_KEY = 'lula'

DATABASE = {
    'name': os.path.join(os.path.dirname(os.path.abspath(__file__)), 'recibos.db'),
    'engine': 'peewee.SqliteDatabase',
}

UPLOAD_FOLDER = '/tmp'
