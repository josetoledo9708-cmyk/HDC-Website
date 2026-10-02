$url = "https://shop.hololivepro.com/en/collections/all/products.json?limit=250";
$all_prods = @();
for ($p = 1; $p -le 10; $p++) {
    try {
        $res = Invoke-RestMethod -Uri "https://shop.hololivepro.com/en/collections/all/products.json?page=$p&limit=250" -Headers @{"User-Agent"="Mozilla/5.0"};
        if (!$res.products -or $res.products.Count -eq 0) { break; }
        $all_prods += $res.products;
    } catch { break; }
}

$tcg = $all_prods | Where-Object { $_.title -like "*hololive OFFICIAL CARD GAME*" };
Write-Host "Found total official TCG items:" $tcg.Count;

foreach ($item in $tcg) {
    if ($item.images -and $item.images.Count -gt 0) {
        $imgUrl = $item.images[0].src;
        $cleanName = ($item.title -replace "[^a-zA-Z0-9]", "_").ToLower();
        if ($cleanName.Length -gt 40) { $cleanName = $cleanName.Substring(0, 40) }
        $outPath = "C:\Dev\TCGHolo\website\images\shop_$cleanName.png";
        
        try {
            Invoke-WebRequest -Uri $imgUrl -OutFile $outPath -UserAgent "Mozilla/5.0";
            Write-Host "Saved: $cleanName -> $imgUrl";
        } catch {
            Write-Host "Failed to download $imgUrl";
        }
    }
}
