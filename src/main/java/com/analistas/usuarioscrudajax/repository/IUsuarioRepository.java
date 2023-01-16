package com.analistas.usuarioscrudajax.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.analistas.usuarioscrudajax.entities.Usuario;

public interface IUsuarioRepository extends JpaRepository<Usuario, Long> {
    
}
