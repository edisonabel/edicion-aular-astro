@echo off
echo.
echo ========================================
echo   INICIANDO CMS DEL BLOG
echo ========================================
echo.
echo Abriendo CMS en puerto 3001...
echo.
start cmd /k "node blog-server.js"
timeout /t 3 /nobreak >nul
echo.
echo Abriendo Astro en puerto 4321...
echo.
start cmd /k "npm run dev"
timeout /t 3 /nobreak >nul
echo.
echo ========================================
echo   SERVIDORES INICIADOS
echo ========================================
echo.
echo   CMS Admin: http://localhost:3001/admin
echo   Tu Blog:   http://localhost:4321/blog
echo.
echo Presiona cualquier tecla para abrir el navegador...
pause >nul
start http://localhost:3001/admin
start http://localhost:4321/blog
