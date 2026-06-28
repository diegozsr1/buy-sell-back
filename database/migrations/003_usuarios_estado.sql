-- Borrado lógico de usuarios: 1 = activo, 0 = eliminado

ALTER TABLE `usuarios`
ADD COLUMN `estado` TINYINT NOT NULL DEFAULT 1 AFTER `bloqueado`;

UPDATE `usuarios` SET `estado` = 1;
