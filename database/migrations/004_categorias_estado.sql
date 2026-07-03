-- Borrado lógico de categorías: 1 = activa, 0 = eliminada

ALTER TABLE `categorias`
ADD COLUMN `estado` TINYINT NOT NULL DEFAULT 1 AFTER `icono`;

UPDATE `categorias` SET `estado` = 1;
