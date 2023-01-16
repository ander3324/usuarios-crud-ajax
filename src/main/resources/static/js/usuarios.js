
const limpiar = () => {
	// Limpiar form de cargas anteriores...
	$("span").closest(".error-span").remove();

	// Remover border rojos si los hay...
	$(".is-invalid").removeClass("is-invalid");

    //Limpiar textos...
    $("#form :input").each(function() {
		$(this).val("");
	});
}

const clearInputs = () => {
	$("#form :input").each(function() {
		$(this).val("");
	});
	//$("#edt_img").attr("src", "");
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

	//Titulo...
	$("#titleModal").text("Nuevo Usuario");

	/* $("#descripcion").select();
	$("#linkImagen").val("");
	$("#edt_img").attr("src", link);
	$("#precioCosto").val(0.00);
	$("#precioVenta").val(0.00);
	$("#precioEspecial").val(0.00);
	$("#stock").val(0);
	$("#stockCritico").val(0); */

	//Abrir bs5 dialog...
	let tareaModal = new bootstrap.Modal(document.getElementById("usuariosModal"), { backdrop: 'static', keyboard: false });
	tareaModal.show();
});

//
// Borrar
// 

$(".borrar").on("click", function() {

    let id = Number($(this).attr('id'));

    if(id !== 1) {
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
                  url:'/borrar/' + id,
                  type:'GET',
                 }).done(function(resp){
                   location.reload();
                 });
            }
          }); 
    } else {
        Swal.fire("Ops!", "No se puede deshabilitar el usuario 'administrador'!", "warning");
    } 
        
});