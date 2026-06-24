-- Tabla de usuarios favoritos de un usuario
-- usuarios_id: usuario que guarda el favorito
-- usuario_favorito_id: usuario marcado como favorito

CREATE TABLE IF NOT EXISTS `usuarios_favoritos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuarios_id` int NOT NULL,
  `usuario_favorito_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_usuario_favorito` (`usuarios_id`, `usuario_favorito_id`),
  KEY `fk_usuarios_favoritos_usuario_idx` (`usuarios_id`),
  KEY `fk_usuarios_favoritos_favorito_idx` (`usuario_favorito_id`),
  CONSTRAINT `fk_usuarios_favoritos_usuario`
    FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_usuarios_favoritos_favorito`
    FOREIGN KEY (`usuario_favorito_id`) REFERENCES `usuarios` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
