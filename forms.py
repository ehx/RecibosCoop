# -*- coding: utf-8 -*-
from datetime import datetime
from flaskext.wtf import (
    Form,
    TextAreaField,
    Required,
    DateField,
    TextField,
    SelectField,
    IntegerField)


class ImportarForm(Form):
    montos = TextAreaField('Montos a retirar', validators=[Required()])
    concepto = TextAreaField('Concepto', validators=[Required()])
    fecha = DateField("Fecha", format='%d/%m/%Y', validators=[Required()])
    del_anio = IntegerField(u'del año', default=lambda: datetime.now().year)
