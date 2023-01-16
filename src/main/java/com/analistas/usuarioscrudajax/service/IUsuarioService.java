package com.analistas.usuarioscrudajax.service;

import java.util.List;

import com.analistas.usuarioscrudajax.entities.Permiso;
import com.analistas.usuarioscrudajax.entities.Usuario;

public interface IUsuarioService {
    
    public List<Usuario> buscarTodo();

    public List<Usuario> buscarPor(String texto);

    public Usuario buscarPor(Long id);

    public void guardar(Usuario usuario);

    public List<Permiso> buscarPermisos();
}
