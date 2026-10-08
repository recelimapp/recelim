# Reçelim — recelim.com

Dünyanın en çok çeşit reçeli: 1001 çeşit, tek kiler. Siparişler çok yakında.

Düz HTML/CSS/JS ile yazılmış statik bir sitedir; derleme adımı yoktur. `main` dalına gönderilen her değişiklik Vercel üzerinden otomatik yayına çıkar.

## Sayfalar
- `index.html` — Ana sayfa
- `cesitler.html` — 1001 çeşit (arama ve kategori filtresi)
- `fazlasi.html` — Reçelden fazlası: kullanım fikirleri, eşleşmeler, tarifler
- `yakinda.html` — Sipariş / sıraya gir
- `404.html` — Bulunamayan sayfa

## Dosyalar
- `assets/css/style.css` — ortak tasarım (renkler, yazılar, butonlar, kavanozlar)
- `assets/js/site.js` — kavanoz çizimi, tıklayınca altın toza dönen butonlar, menü, kayıt formu
- `assets/js/jams.js` — 1001 kavanozluk liste (ilk 8'i gerçek ürünler, 333'ü mühürlü)
- `assets/logo/` — logo dosyaları, `assets/favicon.svg` — sekme ikonu

## Kayıt formu
Varsayılan olarak kayıtlar yalnızca ziyaretçinin tarayıcısında tutulur. Kayıtları toplamak için
`assets/js/site.js` içindeki `WAITLIST_ENDPOINT` değerine bir form servisi adresi (ör. Formspree) yazın.

## Yerelde açmak
```
python3 -m http.server 8000
```
ardından http://localhost:8000
