
$("#repeat").on("change", () => {
  if ($("#clave").val() !== $("#repeat").val() && !$(`#repeat`).hasClass("is-invalid")) {
    $(`#repeat`).addClass("is-invalid");
    $(`#error-repeat`).addClass("invalid-feedback").append("<span class='error-span'>Las contraseñas no coinciden</span>");
  } else {
    $(`#repeat`).removeClass("is-invalid");
    $(`#error-repeat`).removeClass("invalid-feedback").find(".error-span").remove();
  }
});

const limpiar = () => {
  // Limpiar form de cargas anteriores...
  $("span").closest(".error-span").remove();

  // Remover border rojos si los hay...
  $(".is-invalid").removeClass("is-invalid");
}

const borrarTextos = () => {
  
  //Limpiar textos...
  $("#form :input").each(function () {
    $(this).val("");
  });
}


/* 
 *
 *  Botones CRUD
 *
 */

//
//Abrir form nuevo:
//
$("#btn-crear").on("click", () => {

  limpiar();
  borrarTextos();

  $("#titleModal").text("Nuevo Usuario");
  //$("#permiso").prop("selectedIndex", 1).val();

  //Abrir bs5 dialog...
  let tareaModal = new bootstrap.Modal(document.getElementById("usuariosModal"), { backdrop: 'static', keyboard: false });
  tareaModal.show();
});

//
//Abrir form editar:
//

$(".editar").on("click", function () {

  let id = Number($(this).attr('id'));

  $.ajax({
    method: "GET",
    url: `/editar/${id}`,
    beforeSend: function () {

      limpiar();

      //Titulo...
      $("#titleModal").text("Editar Usuario");

      //Abrir bs5 dialog...
      let usuarioModal = new bootstrap.Modal(document.getElementById("usuariosModal"), { backdrop: 'static', keyboard: false });
      usuarioModal.show();
    },
    success: function (data) {
      $("#numero").val(data.id);
      $("#nombre").val(data.nombre);
      $("#clave").val(data.clave);
      $("#permiso").val(data.permiso.id);
      $("#img_perfil").attr('src', '/uploads/' + data.rutaImagen);
    },
    error: function (xhr) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo comunicar con el servidor!',
        footer: 'Verifique su conexión a internet o comuníquese con el administrador'
      });
    }
  });
});

//
// Hacer el submit del usuario
//

$("#btn-guardar").on("click", function () {

  // Crear objeto:
  var usuario = {};

  usuario.nombre = $("#nombre").val();
  usuario.clave = $("#clave").val();
  usuario.permiso = $("#permiso").val();
  usuario.rutaImagen = document.getElementById('ruta_img').files[0].name;
  //usuario.rutaImagen = $("#ruta_img").val();

  if ($("#numero").val() !== "")
    usuario.id = $("#numero").val();
  else
    usuario.id = 0;

  $.ajax({
    method: "POST",
    url: `/guardar`,
    data: usuario,
    beforeSend: function () {
      // Remover errores previos...
      limpiar();
    },
    success: function () {

      $("#usuariosModal").modal("hide");

      Swal.fire({
        title: 'Éxito!',
        text: 'Usuario guardado.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        location.reload();
      });
    },
    statusCode: {
      422: function (xhr) {
        console.log("Status Error: " + xhr.status);
        var errors = $.parseJSON(xhr.responseText);
        $.each(errors, function (key, val) {
          $(`#${key}`).addClass("is-invalid");
          $(`#error-${key}`).addClass("invalid-feedback").append("<span class='error-span'>" + val + "</span>");
        });

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Datos erróneos o faltantes!',
          footer: 'Verifique los mensajes de error'
        });
      },
      404: function (xhr) {
        console.log("Status Error: " + xhr.status);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo comunicar con el servidor!',
          footer: 'Verifique su conexión a internet o comuníquese con el administrador'
        });
      }
    }
  });
});

//
// Borrar
// 

$(".borrar").on("click", function () {

  let id = Number($(this).attr('id'));

  if (id !== 1) {
    //var prov = getUsuario();

    Swal.fire({
      title: '¡Atención!',
      text: "Está por cambiar el estado del usuario . ¿Desea continuar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {

        $.ajax({
          url: '/borrar/' + id,
          type: 'GET',
        }).done(function (resp) {
          location.reload();
        });
      }
    });
  } else {
    Swal.fire("Ops!", "No se puede deshabilitar el usuario 'administrador'!", "warning");
  }

});