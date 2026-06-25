-- Resolución del moderador tras revisar el reporte (nullable hasta que se revise)

ALTER TABLE `reportes`
ADD COLUMN `resultado_reporte` LONGTEXT NULL AFTER `estado`;
