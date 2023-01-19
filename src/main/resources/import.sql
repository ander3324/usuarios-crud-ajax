/* Script para la generación de valores iniciales */

/* Roles */
INSERT INTO permisos (nombre) VALUES ('ROLE_ADMIN');
INSERT INTO permisos (nombre) VALUES ('ROLE_CAJERO');
INSERT INTO permisos (nombre) VALUES ('ROLE_REPOSITOR');

/* Usuarios - en las pruebas todas las claves son 'usuario' */
INSERT INTO usuarios (activo, nombre, clave, id_permiso) VALUES (1, 'claudio', '$2a$10$nmsnELze.Ca7dMnsbfGIuuczJlKMAk9SGCkgDczmosj91zCAMsFoO', 1);
INSERT INTO usuarios (activo, nombre, clave, id_permiso) VALUES (1, 'alexis', 'cajero', 2);
INSERT INTO usuarios (activo, nombre, clave, id_permiso) VALUES (1, 'exequiel', 'repositor', 3);
