package com.analistas.usuarioscrudajax.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.analistas.usuarioscrudajax.entities.Permiso;
import com.analistas.usuarioscrudajax.entities.Usuario;
import com.analistas.usuarioscrudajax.repository.IPermisoRepository;
import com.analistas.usuarioscrudajax.repository.IUsuarioRepository;

@Service
public class UsuarioServiceImpl implements IUsuarioService {

    @Autowired
    IUsuarioRepository usuarioRepository;

    @Autowired
    IPermisoRepository permisoRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Usuario> buscarTodo() {
        return usuarioRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Usuario> buscarPor(String texto) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public Usuario buscarPor(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public void guardar(Usuario usuario) {
        usuarioRepository.save(usuario);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Permiso> buscarPermisos() {
        return permisoRepository.findAll();
    }
    
}
