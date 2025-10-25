@echo off
echo ========================================
echo   INICIANDO BLOG + CMS
echo   Edicion Aular - Sistema Completo
echo ========================================
echo.
echo [1/2] Iniciando Frontend de Astro...
start "Astro Frontend" cmd /k "npm run dev"
timeout /t 2 /nobreak > nul
echo.
echo [2/2] Iniciando Servidor CMS...
start "CMS Backend" cmd /k "node blog-server.js"
timeout /t 2 /nobreak > nul
echo.
echo ========================================
echo   SERVIDORES INICIADOS
echo ========================================
echo.
echo   Frontend: http://localhost:4321
echo   CMS Admin: http://localhost:3001/admin
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul
