package com.analistas.usuarioscrudajax.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.analistas.usuarioscrudajax.entities.Permiso;

public interface IPermisoRepository extends JpaRepository<Permiso, Long> {
    
}
