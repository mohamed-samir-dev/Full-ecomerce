Write-Host "==================================" -ForegroundColor Cyan
Write-Host "   تحسين الأداء - Performance" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# التحقق من المجلد
if (!(Test-Path "package.json")) {
    Write-Host "خطأ: يجب تشغيل السكريبت من مجلد Frontend" -ForegroundColor Red
    exit 1
}

Write-Host "1. مسح الملفات القديمة..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "   ✓ تم مسح .next" -ForegroundColor Green
}

Write-Host ""
Write-Host "2. تثبيت المكتبات..." -ForegroundColor Yellow
npm install
Write-Host "   ✓ تم التثبيت" -ForegroundColor Green

Write-Host ""
Write-Host "3. بناء المشروع..." -ForegroundColor Yellow
npm run build
Write-Host "   ✓ تم البناء" -ForegroundColor Green

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "   تم التحسين بنجاح! ✓" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "الخطوات التالية:" -ForegroundColor Yellow
Write-Host "1. npm start - لتشغيل المشروع" -ForegroundColor White
Write-Host "2. npm run lighthouse - لاختبار الأداء" -ForegroundColor White
Write-Host ""
