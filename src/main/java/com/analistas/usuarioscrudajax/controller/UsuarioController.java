package com.analistas.usuarioscrudajax.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.analistas.usuarioscrudajax.entities.Permiso;
import com.analistas.usuarioscrudajax.entities.Usuario;
import com.analistas.usuarioscrudajax.service.IUsuarioService;

import jakarta.validation.Valid;

@Controller
public class UsuarioController {

    @Autowired
    IUsuarioService usuarioService;
    
    @GetMapping("/")
    public String listar(Model model) {

        model.addAttribute("titulo", "Listado de Usuarios");
        model.addAttribute("usuarios", usuarioService.buscarTodo());

        return "usuarios/list";
    }

    @GetMapping("/editar/{id}")
	public ResponseEntity<?> preEdicion(@PathVariable Long id) {
		
        Usuario u = usuarioService.buscarPor(id);

		return ResponseEntity.ok(u);
	}

    @PostMapping("/guardar")
	public ResponseEntity<?> guardar(@Valid Usuario usuario, BindingResult result) {

		if (result.hasErrors()) {
			Map<String, String> errors = new HashMap<>();
			for (FieldError error : result.getFieldErrors()) {
				errors.put(error.getField(), error.getDefaultMessage());
			}
			return ResponseEntity.unprocessableEntity().body(errors);
		}

        //No olvidar de usar PasswordEncoder aquí.
        //Para ello, añadir la dependencia de Spring Security.
		usuario.setActivo(true);
		usuarioService.guardar(usuario);
		
		return ResponseEntity.ok().build();
	}

    @GetMapping("/borrar/{id}")
	public ResponseEntity<?> cambiarEstado(@PathVariable Long id){ 
		
		Usuario u =  usuarioService.buscarPor(id);
		u.setActivo(!u.isActivo());
		usuarioService.guardar(u);
		
		return ResponseEntity.ok().build();
	}

    @ModelAttribute("permisos")
    public List<Permiso> getPermisos() {
        return usuarioService.buscarPermisos();
    }
}
