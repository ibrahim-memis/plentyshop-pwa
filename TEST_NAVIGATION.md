# Navigasyon Test Rehberi

## 🚀 Sunucuyu Başlatma

```bash
npm run dev
```

Sunucu başladıktan sonra http://localhost:3000 adresine gidin.

## 📝 Test Adımları

### 1. Ana Sayfa Kontrolü
- [ ] Ana sayfa yükleniyor mu?
- [ ] MegaMenu görünüyor mu?
- [ ] Üst kategoriler (topCategories) listeleniyor mu?

### 2. Kategori Linklerini İnceleme

#### Tarayıcı Geliştirici Araçları ile:
1. F12 tuşuna basın
2. Elements/Öğeler sekmesine gidin
3. MegaMenu içindeki kategori linklerini bulun
4. `<a>` etiketlerinin `href` özelliklerini kontrol edin

**Kontrol edilecekler:**
- Link formatı nedir? (örn: `/kategori-adi`, `/tr/kategori-adi`, `/c/123/kategori-adi`)
- Locale prefix var mı? (`/tr/`, `/en/`, `/de/`)

### 3. Kategori Linkine Tıklama
1. Bir kategori linkine tıklayın
2. Sonucu gözlemleyin:
   - [ ] Kategori sayfası açıldı mı?
   - [ ] "Page not found" hatası mı geldi?
   - [ ] URL ne oldu?

### 4. Konsol Hatalarını Kontrol
Tarayıcı konsolunda (F12 → Console) hata var mı?

### 5. Network Sekmesini İnceleme
1. F12 → Network sekmesi
2. Kategori linkine tıklayın
3. Hangi istekler yapıldı?
4. Hangi istekler 404 döndü?

## 🔍 Bilgi Toplama

Lütfen şu bilgileri kaydedin:

1. **Kategori Link Örnekleri:**
   ```
   Örnek 1: /tr/elektronik
   Örnek 2: /giyim
   Örnek 3: ...
   ```

2. **Tıklama Sonrası URL:**
   ```
   Tıklanan link: /tr/elektronik
   Sonuç URL: /tr/elektronik
   Durum: 404 / Başarılı
   ```

3. **Konsol Hataları:**
   ```
   (Varsa kopyalayın)
   ```

4. **Network İstekleri:**
   ```
   GET /api/... → 404
   GET /api/... → 200
   ```

## 🐛 Debug İçin Console Komutları

Tarayıcı konsolunda şu komutları çalıştırabilirsiniz:

```javascript
// Mevcut route bilgisi
console.log($nuxt.$route)

// Kategori ağacı
console.log($nuxt.$pinia.state.value.categoryTree)

// Locale bilgisi
console.log($nuxt.$i18n.locale.value)
```

## 📊 Beklenen Sonuçlar

**Başarılı Senaryo:**
- Kategori linkine tıklayınca kategori sayfası açılmalı
- URL doğru kategori path'ini göstermeli
- Ürünler veya alt kategoriler listelenmeli

**Hatalı Senaryo:**
- 404 sayfası görünüyor
- "Page not found" mesajı
- Boş sayfa

## 🔧 Ek Kontroller

### ProductCard Linkleri
Eğer ana sayfada ürün kartları varsa:
1. Bir ürün kartına tıklayın
2. Ürün detay sayfası açılıyor mu?
3. URL formatı: `/product/[slug]` olmalı

### Breadcrumb Linkleri
Kategori sayfasında breadcrumb varsa:
1. Breadcrumb linklerine tıklayın
2. Doğru sayfalara yönlendiriyor mu?

## 📸 Ekran Görüntüleri

Lütfen şu ekran görüntülerini alın:
1. Ana sayfa - MegaMenu açık
2. Kategori linki üzerine mouse hover (link URL'si görünsün)
3. Kategori sayfası (başarılı ise)
4. 404 sayfası (hata varsa)
5. Tarayıcı konsolu (hatalar varsa)
6. Network sekmesi (istekler görünsün)

## 💡 İpuçları

- Chrome DevTools'da "Preserve log" seçeneğini aktif edin (Network sekmesinde)
- Konsol hatalarını tam olarak kopyalayın
- URL'lerdeki her detay önemli (slash, locale prefix, vb.)
