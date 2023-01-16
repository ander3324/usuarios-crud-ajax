package com.analistas.usuarioscrudajax.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

import com.analistas.usuarioscrudajax.entities.Permiso;
import com.analistas.usuarioscrudajax.entities.Usuario;
import com.analistas.usuarioscrudajax.service.IUsuarioService;

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

    @GetMapping("/borrar/{id}")
	public ResponseEntity<?> habDeshab(@PathVariable Long id){ 
		
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
