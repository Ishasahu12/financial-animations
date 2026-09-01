@echo off
echo Starting Financial Animations Studio...
echo.
echo Once opened, select a composition from the dropdown:
echo   - Dashboard (full animation)
echo   - BarChart
echo   - PieChart  
echo   - LineChart
echo   - NumberCounter
echo.
cd /d "%~dp0"
npm run dev
pause
