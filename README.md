# Ovolt Elektrikli Araç Şarj İstasyonu Web Sitesi

Modern, responsive ve kullanıcı dostu bir elektrikli araç şarj istasyonu web sitesi.

## 🚗⚡ Özellikler

### 🎨 Tasarım
- **Modern ve Temiz Tasarım**: Teknoloji odaklı, profesyonel görünüm
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm (mobil, tablet, desktop)
- **Renk Paleti**: 
  - Koyu Lacivert (#1a2c3d) - Ana renk
  - Elektrik Sarısı (#ffda00) - Vurgu rengi
  - Açık Mavi (#00bcd4) - Logo elementleri
  - Beyaz (#ffffff) - Arka plan ve metin

### 📱 Kullanıcı Deneyimi
- **Smooth Scrolling**: Yumuşak sayfa geçişleri
- **Hamburger Menü**: Mobil cihazlarda kullanışlı navigasyon
- **Tab Sistemi**: Bireysel/Filo seçenekleri için
- **Form Validasyonu**: İletişim formu için akıllı doğrulama
- **Animasyonlar**: Scroll-based animasyonlar ve hover efektleri

### 🔧 Teknik Özellikler
- **Semantic HTML5**: Erişilebilir ve SEO dostu yapı
- **CSS Grid & Flexbox**: Modern layout sistemleri
- **Vanilla JavaScript**: Framework bağımlılığı olmadan
- **Performance Optimized**: Hızlı yükleme ve smooth animasyonlar
- **Accessibility**: WCAG standartlarına uygun

## 📁 Proje Yapısı

```
Ovolt/
├── index.html              # Ana HTML dosyası
├── assets/
│   ├── css/
│   │   └── style.css       # Ana CSS dosyası
│   ├── js/
│   │   └── main.js         # JavaScript dosyası
│   └── img/                # Görsel dosyalar
│       ├── ovolt-logo.svg
│       ├── hero-flash.svg
│       ├── station-img.png
│       └── ... (diğer görseller)
└── README.md
```

## 🚀 Kurulum ve Kullanım

1. **Dosyaları İndirin**: Tüm dosyaları web sunucunuza yükleyin
2. **Görselleri Kontrol Edin**: `assets/img/` klasöründeki görsellerin doğru yolda olduğundan emin olun
3. **Tarayıcıda Açın**: `index.html` dosyasını tarayıcınızda açın

### Yerel Geliştirme
```bash
# Basit HTTP sunucusu ile test etmek için
python -m http.server 8000
# veya
npx serve .
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px ve üzeri
- **Tablet**: 768px - 1023px
- **Mobile**: 767px ve altı

## 🎯 Bölümler

1. **Header**: Logo, navigasyon menüsü, CTA butonları
2. **Hero**: Ana başlık, alt başlık, CTA butonu
3. **Hizmet Noktaları**: Şarj istasyonu sayısı ve açıklama
4. **Tarifeler**: AC/DC şarj fiyatlandırması
5. **Bireysel/Filo**: Tab sistemi ile farklı kullanıcı türleri
6. **İletişim**: İletişim formu ve iletişim bilgileri
7. **Özellikler**: 3 sütunlu özellik kartları
8. **Ortaklıklar**: İş ortağı logoları
9. **Mobil Uygulama**: Uygulama tanıtımı ve indirme linkleri
10. **Sürdürülebilirlik**: Çevre dostu mesaj
11. **Footer**: Detaylı site haritası ve sosyal medya linkleri

## 🛠️ Özelleştirme

### Renkleri Değiştirme
`assets/css/style.css` dosyasındaki CSS değişkenlerini düzenleyin:

```css
:root {
    --primary-dark: #1a2c3d;
    --primary-yellow: #ffda00;
    --primary-blue: #00bcd4;
    /* ... diğer renkler */
}
```

### İçerik Güncelleme
`index.html` dosyasındaki metinleri doğrudan düzenleyebilirsiniz.

### Görsel Değiştirme
`assets/img/` klasöründeki görselleri aynı isimle değiştirin.

## 📊 Performans

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimize edilmiş
- **Image Optimization**: Lazy loading ve responsive images
- **CSS/JS Minification**: Production için önerilir

## 🔒 Güvenlik

- **Form Validation**: Client-side ve server-side doğrulama önerilir
- **HTTPS**: Production ortamında SSL sertifikası kullanın
- **Content Security Policy**: Güvenlik başlıkları ekleyin

## 🌐 Tarayıcı Desteği

- **Modern Tarayıcılar**: Chrome, Firefox, Safari, Edge (son 2 versiyon)
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Fallbacks**: Eski tarayıcılar için graceful degradation

## 📈 SEO Optimizasyonu

- **Semantic HTML**: Doğru HTML5 elementleri
- **Meta Tags**: Title, description, keywords
- **Alt Text**: Tüm görseller için açıklayıcı alt metinler
- **Structured Data**: Schema.org markup eklenebilir

## 🚀 Gelecek Geliştirmeler

- [ ] Dark mode desteği
- [ ] Çoklu dil desteği (i18n)
- [ ] PWA (Progressive Web App) özellikleri
- [ ] CMS entegrasyonu
- [ ] Analytics entegrasyonu
- [ ] A/B testing desteği

## 📞 Destek

Herhangi bir sorun veya öneri için:
- **E-posta**: info@ovolt.com
- **Telefon**: +90 (212) 123 45 67

## 📄 Lisans

© 2024 Ovolt. Tüm hakları saklıdır.

---

**Geliştirici Notu**: Bu web sitesi modern web standartları kullanılarak geliştirilmiştir. Performans, erişilebilirlik ve kullanıcı deneyimi öncelikli olarak tasarlanmıştır.
