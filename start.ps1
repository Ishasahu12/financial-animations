Write-Host "Starting Financial Animations Studio..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Select a composition from the dropdown:" -ForegroundColor Yellow
Write-Host "  - Dashboard (full 15s animation)"
Write-Host "  - BarChart"  
Write-Host "  - PieChart"
Write-Host "  - LineChart"
Write-Host "  - NumberCounter"
Write-Host ""

Set-Location $PSScriptRoot
Start-Process "http://localhost:3000"
npm run dev
