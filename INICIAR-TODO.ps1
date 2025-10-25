# Script completo para iniciar Blog + CMS y abrir navegadores
# Edición Aular

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  INICIANDO SISTEMA COMPLETO" -ForegroundColor Cyan
Write-Host "  Edición Aular - Blog + CMS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# [1/4] Iniciar Frontend de Astro
Write-Host "[1/4] Iniciando servidor Astro..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Minimized
Start-Sleep -Seconds 3

# [2/4] Iniciar Servidor CMS
Write-Host "[2/4] Iniciando servidor CMS..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "node blog-server.js" -WindowStyle Minimized
Start-Sleep -Seconds 3

# [3/4] Esperar que inicien
Write-Host "[3/4] Esperando que los servidores inicien..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# [4/4] Abrir navegadores
Write-Host "[4/4] Abriendo navegadores..." -ForegroundColor Green
Start-Process "http://localhost:4321"
Start-Sleep -Seconds 2
Start-Process "http://localhost:3001/admin"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   TODO LISTO Y FUNCIONANDO" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "   Frontend:  " -NoNewline
Write-Host "http://localhost:4321" -ForegroundColor Yellow
Write-Host "   CMS Admin: " -NoNewline
Write-Host "http://localhost:3001/admin" -ForegroundColor Yellow
Write-Host ""
Write-Host "Los servidores están corriendo en segundo plano" -ForegroundColor Gray
Write-Host "Presiona cualquier tecla para cerrar esta ventana..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
