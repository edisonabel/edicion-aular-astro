@echo off
chcp 65001 > nul
title Iniciando Blog + CMS SEGURO - Edicion Aular

echo.
echo ========================================
echo    INICIANDO SISTEMA COMPLETO SEGURO
echo    Edicion Aular - Blog + CMS
echo ========================================
echo.

echo [1/4] Iniciando servidor Astro...
start "Astro Frontend" /MIN cmd /k "npm run dev"
timeout /t 3 /nobreak > nul

echo [2/4] Iniciando servidor CMS SEGURO...
start "CMS Backend Seguro" /MIN cmd /k "node blog-server-secure.js"
timeout /t 3 /nobreak > nul

echo [3/4] Esperando que los servidores inicien...
timeout /t 5 /nobreak > nul

echo [4/4] Abriendo navegadores...
start "" "http://localhost:4321"
timeout /t 2 /nobreak > nul
start "" "http://localhost:3001/admin/login"

echo.
echo ========================================
echo    TODO LISTO Y FUNCIONANDO
echo ========================================
echo.
echo    Frontend:  http://localhost:4321
echo    CMS Login: http://localhost:3001/admin/login
echo.
echo    Usuario: admin_ea_2024
echo    Contrasena: Ver CREDENCIALES-CMS.md
echo.
echo Los servidores estan corriendo en segundo plano
echo Cierra esta ventana cuando termines de trabajar
echo.
pause
