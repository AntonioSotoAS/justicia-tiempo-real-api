-- Script de inicialización de la base de datos
-- Este script se ejecuta automáticamente cuando se crea el contenedor MySQL

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS csjsanta_indicadores;

-- Usar la base de datos
USE csjsanta_indicadores;

-- Crear usuario adicional si es necesario
-- CREATE USER IF NOT EXISTS 'justibot_user'@'%' IDENTIFIED BY 'justibot_pass';
-- GRANT ALL PRIVILEGES ON csjsanta_indicadores.* TO 'justibot_user'@'%';
-- FLUSH PRIVILEGES;

-- Mensaje de confirmación
SELECT 'Base de datos csjsanta_indicadores inicializada correctamente' as status;
