$(document).ready(function (){

  function mostrar_mensaje(mensaje, tipo) {
    var tipo = tipo || 'success';
    var placeholder = $(".contenido .span8 form");
    var template = '<div class="alert alert-block alert-{{tipo}}">{{{close_button}}} <p>{{{mensaje}}}</p></div>';
    var values = {
        close_button: '<a class="close" data-dismiss="alert" href="#">×</a>',
        mensaje: mensaje,
        tipo: tipo 
    }
    var html = Mustache.render(template, values);

    placeholder.before(html);
  }

  function borrar_mensajes() {
    $(".close").click();
  }

  function mostrar_mensaje_progreso(mensaje){
    var imagen = "<img src='/static/images/progress.gif'> ";
    mostrar_mensaje(imagen + mensaje, 'info');
  }

  function reemplazar_boton_generar_pdf_concatenados(){
    $("#submit_pdf").click(function(){
          $(this).attr('disabled', 'disabled');
          $("#submit_zip").attr('disabled', 'disabled');
          $.ajax({
              type: "POST",
              url: $("#formulario_recibos").attr('action'),
              data: $("#formulario_recibos").serialize(),
              dataType: "json",
              beforeSend: function(objeto){
                borrar_mensajes();
                mostrar_mensaje_progreso("Procesando...");
              },
              success: function(data){
                borrar_mensajes();
                template = "El archivo pdf ha sido generado. <a href='/descargar/{{name}}'>Descargar archivo</a>.";
                mostrar_mensaje(Mustache.render(template, data));
              },
              error: function(_, _, motivo){
                borrar_mensajes();
                mostrar_mensaje(motivo, "error");
              }
          });

          return false;
      });
  }

  function reemplazar_boton_generar_zip(){
    $("#submit_zip").click(function(){
          $(this).attr('disabled', 'disabled');
          $("#submit_pdf").attr('disabled', 'disabled');
          $.ajax({
              type: "POST",
              url: "/zip_contenedor",
              data: $("#formulario_recibos").serialize(),
              dataType: "json",
              beforeSend: function(objeto){
                borrar_mensajes();
                mostrar_mensaje_progreso("Procesando...");
              },
              success: function(data){
                borrar_mensajes();
                template = "El archivo zip ha sido generado. <a href='/descargar/{{name}}'>Descargar archivo</a>.";
                mostrar_mensaje(Mustache.render(template, data));
              },
              error: function(_, _, motivo){
                borrar_mensajes();
                mostrar_mensaje(motivo, "error");
              }
          });

          return false;
      });
  }

  reemplazar_boton_generar_pdf_concatenados();
  reemplazar_boton_generar_zip();
})
