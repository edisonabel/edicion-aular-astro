# Script para iniciar Frontend + CMS del Blog
# Edición Aular

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  INICIANDO BLOG + CMS" -ForegroundColor Cyan
Write-Host "  Edicion Aular - Sistema Completo" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Iniciar Frontend de Astro
Write-Host "[1/2] Iniciando Frontend de Astro..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"
Start-Sleep -Seconds 2

# Iniciar Servidor CMS
Write-Host "[2/2] Iniciando Servidor CMS..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "node blog-server.js"
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   SERVIDORES INICIADOS" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "   Frontend:  " -NoNewline
Write-Host "http://localhost:4321" -ForegroundColor Yellow
Write-Host "   CMS Admin: " -NoNewline
Write-Host "http://localhost:3001/admin" -ForegroundColor Yellow
Write-Host ""
Write-Host "Presiona cualquier tecla para cerrar..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
