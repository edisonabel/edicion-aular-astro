@echo off
chcp 65001 > nul
title Iniciando Blog + CMS - Edicion Aular

echo.
echo ========================================
echo    INICIANDO SISTEMA COMPLETO
echo    Edicion Aular - Blog + CMS
echo ========================================
echo.

echo [1/4] Iniciando servidor Astro...
start "Astro Frontend" /MIN cmd /k "npm run dev"
timeout /t 3 /nobreak > nul

echo [2/4] Iniciando servidor CMS...
start "CMS Backend" /MIN cmd /k "node blog-server.js"
timeout /t 3 /nobreak > nul

echo [3/4] Esperando que los servidores inicien...
timeout /t 5 /nobreak > nul

echo [4/4] Abriendo navegadores...
start "" "http://localhost:4321"
timeout /t 2 /nobreak > nul
start "" "http://localhost:3001/admin"

echo.
echo ========================================
echo    TODO LISTO Y FUNCIONANDO
echo ========================================
echo.
echo    Frontend:  http://localhost:4321
echo    CMS Admin: http://localhost:3001/admin
echo.
echo Los servidores estan corriendo en segundo plano
echo Cierra esta ventana cuando termines de trabajar
echo.
pause
