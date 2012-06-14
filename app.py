from flask import Flask
from flask import render_template
from flask import redirect
from flask import url_for
from flask_peewee.auth import Auth
from flask_peewee.db import Database
from flask_peewee.admin import Admin
from werkzeug import secure_filename

from pdf import to_pdf

app = Flask(__name__)
app.config.from_pyfile('config.py')

db = Database(app)
auth = Auth(app, db)
admin = Admin(app, auth)

import models
import forms

@app.route("/")
def principal():
    retiros = models.Retiro.select()
    return render_template("principal.html", retiros=retiros)

@app.route("/importar")
def importar():
    form = forms.EntradaForm(csrf_enabled=False)
    return render_template("importar.html", form=form)

@app.route("/procesar", methods=["POST"])
def importar_procesar():
    form = forms.EntradaForm(csrf_enabled=False)

    if form.validate_on_submit():
        filename = secure_filename(form.data['archivo'].filename)

    return render_template("procesar.html", filename=filename)

@app.route("/procesar")
def procesar():
    pass

@app.route("/to_pdf")
@to_pdf(duplicate=True)
def recibo():
    return render_template("recibo.html")

@app.route("/pdf/<recibo_id>")
def generar_recibo(recibo_id):
    pass

@app.route("/pdf/socios/<mes>")
def generar_recibo(mes):
    pass

if __name__ == "__main__":
    auth.register_admin(admin)
    admin.register(models.Retiro)
    admin.register(models.Socio)
    admin.setup()
    app.run()
