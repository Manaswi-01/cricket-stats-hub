# Website Testing Script
# Comprehensive test of Cricket Stats Hub

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Cricket Stats Hub - Full Site Test" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$baseUrl = "http://localhost:3000"
$tests = @()
$passed = 0
$failed = 0

function Test-Endpoint {
    param($name, $url)
    
    Write-Host "Testing: $name..." -NoNewline
    
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
        
        if ($response.StatusCode -eq 200) {
            Write-Host " ✓ PASS" -ForegroundColor Green
            $script:passed++
            return $true
        } else {
            Write-Host " ✗ FAIL (Status: $($response.StatusCode))" -ForegroundColor Red
            $script:failed++
            return $false
        }
    } catch {
        Write-Host " ✗ FAIL (Error: $($_.Exception.Message))" -ForegroundColor Red
        $script:failed++
        return $false
    }
}

function Test-API {
    param($name, $url, $expectedField)
    
    Write-Host "Testing API: $name..." -NoNewline
    
    try {
        $response = Invoke-RestMethod -Uri $url -UseBasicParsing -TimeoutSec 10
        
        if ($response.success -and $response.$expectedField) {
            Write-Host " ✓ PASS (Count: $($response.count))" -ForegroundColor Green
            $script:passed++
            return $response
        } else {
            Write-Host " ✗ FAIL (Missing data)" -ForegroundColor Red
            $script:failed++
            return $null
        }
    } catch {
        Write-Host " ✗ FAIL (Error: $($_.Exception.Message))" -ForegroundColor Red
        $script:failed++
        return $null
    }
}

Write-Host "`n--- HOMEPAGE TEST ---" -ForegroundColor Yellow
Test-Endpoint "Homepage" "$baseUrl/"

Write-Host "`n--- API ENDPOINTS TEST ---" -ForegroundColor Yellow
$playersData = Test-API "Players API" "$baseUrl/api/players" "data"
$teamsData = Test-API "Teams API" "$baseUrl/api/teams" "data"
$matchesData = Test-API "Matches API" "$baseUrl/api/matches" "data"

Write-Host "`n--- PLAYER PAGES TEST ---" -ForegroundColor Yellow
if ($playersData) {
    Test-Endpoint "Players Listing" "$baseUrl/players"
    
    # Test first 3 players
    $playersData.data | Select-Object -First 3 | ForEach-Object {
        Test-Endpoint "Player: $($_.name)" "$baseUrl/players/$($_.id)"
    }
}

Write-Host "`n--- TEAM PAGES TEST ---" -ForegroundColor Yellow
if ($teamsData) {
    Test-Endpoint "Teams Listing" "$baseUrl/teams"
    
    # Test all teams
    $teamsData.data | ForEach-Object {
        Test-Endpoint "Team: $($_.name)" "$baseUrl/teams/$($_.id)"
    }
}

Write-Host "`n--- MATCH PAGES TEST ---" -ForegroundColor Yellow
if ($matchesData) {
    Test-Endpoint "Matches Listing" "$baseUrl/matches"
    
    # Test first 3 matches
    $matchesData.data | Select-Object -First 3 | ForEach-Object {
        Test-Endpoint "Match: $($_.title)" "$baseUrl/matches/$($_.id)"
    }
}

Write-Host "`n--- INDIVIDUAL PLAYER API TEST ---" -ForegroundColor Yellow
if ($playersData) {
    $player = $playersData.data[0]
    Test-API "Player Detail: $($player.name)" "$baseUrl/api/players/$($player.id)" "data"
}

Write-Host "`n--- INDIVIDUAL TEAM API TEST ---" -ForegroundColor Yellow
if ($teamsData) {
    $team = $teamsData.data[0]
    Test-API "Team Detail: $($team.name)" "$baseUrl/api/teams/$($team.id)" "data"
}

Write-Host "`n--- INDIVIDUAL MATCH API TEST ---" -ForegroundColor Yellow
if ($matchesData) {
    $match = $matchesData.data[0]
    Test-API "Match Detail" "$baseUrl/api/matches/$($match.id)" "data"
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  TEST RESULTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Total Tests Run: $($passed + $failed)" -ForegroundColor White
Write-Host "Passed: $passed" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Green" })

if ($failed -eq 0) {
    Write-Host "`n✓ ALL TESTS PASSED!" -ForegroundColor Green
    Write-Host "Your website is fully functional! 🎉" -ForegroundColor Green
} else {
    Write-Host "`n✗ Some tests failed. Check errors above." -ForegroundColor Red
}

Write-Host "`n--- DATA SOURCE INFO ---" -ForegroundColor Yellow
if ($playersData) {
    Write-Host "Data Source: $($playersData.source)" -ForegroundColor $(if ($playersData.source -eq "live-api") { "Green" } else { "Yellow" })
    Write-Host "Players: $($playersData.count)" -ForegroundColor White
    Write-Host "Teams: $($teamsData.count)" -ForegroundColor White
    Write-Host "Matches: $($matchesData.count)" -ForegroundColor White
}

Write-Host "`n========================================`n" -ForegroundColor Cyan
