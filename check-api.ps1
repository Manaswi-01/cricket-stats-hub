# Quick API Status Check
# Run this to see if your live Cricket API is working

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Cricket API Status Check" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check environment variable
$envFile = ".env.local"
if (Test-Path $envFile) {
    $apiKey = (Get-Content $envFile | Select-String "CRICKET_API_KEY=(.+)").Matches.Groups[1].Value.Trim()
    if ($apiKey) {
        Write-Host "API Key: $($apiKey.Substring(0,10))..." -ForegroundColor Green
    } else {
        Write-Host "No API Key Found" -ForegroundColor Red
    }
}

Write-Host "`nTesting Players API..." -ForegroundColor White

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/players" -UseBasicParsing
    
    Write-Host "`nResult:" -ForegroundColor Yellow
    Write-Host "  Players: $($response.count)" -ForegroundColor White
    Write-Host "  Source: " -NoNewline
    
    if ($response.source -eq 'live-api') {
        Write-Host "LIVE API ✓" -ForegroundColor Green
        Write-Host "`n  ✓ Successfully fetching real-time cricket data!" -ForegroundColor Green
    } else {
        Write-Host "Static Data" -ForegroundColor Yellow
        Write-Host "`n  Using curated static data (API key may be invalid)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "`n  Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n========================================`n" -ForegroundColor Cyan
