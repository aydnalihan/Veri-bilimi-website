# Veri Bilimi Kulübü Web Sitesi

Modern ve dinamik bir topluluk web sitesi. React + Vite ile geliştirilmiştir.

## 🚀 Özellikler

- ✨ Modern ve responsive tasarım
- 📅 Etkinlik yönetimi ve takibi
- 📁 Proje vitrini
- 👥 Ekip tanıtımı
- 📝 Üyelik başvuru formu
- 🤝 Paydaşlık başvuru formu
- 💼 Sponsorluk başvuru formu
- 📖 Hakkımızda sayfası (Misyon, Vizyon, Tüzük)

## 📋 Gereksinimler

- Node.js 18+ 
- npm veya yarn
- Admin Panel Backend (API için)

## 🛠️ Kurulum

### 1. Projeyi klonlayın

```bash
git clone <repo-url>
cd Veri-bilimi-website
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. Ortam değişkenlerini ayarlayın

`.env` dosyası oluşturun:

```env
VITE_API_URL=http://localhost:5000/api
```

> **Production için:** Backend'in deploy edildiği URL'yi kullanın.
> Örnek: `VITE_API_URL=https://your-backend.onrender.com/api`

### 4. Geliştirme sunucusunu başlatın

```bash
npm run dev
```

Site `http://localhost:5173` adresinde çalışacaktır.

## 🌐 Deployment (Vercel)

### 1. Vercel'e Giriş Yapın
- [vercel.com](https://vercel.com) adresine gidin
- GitHub hesabınızla giriş yapın

### 2. Yeni Proje Oluşturun
- "Add New..." → "Project"
- GitHub repo'nuzu seçin
- Framework: **Vite** (otomatik algılanır)

### 3. Ortam Değişkeni Ekleyin
- **Environment Variables** bölümünde:
  - `VITE_API_URL` = `https://your-backend-url.onrender.com/api`

### 4. Deploy Edin
- "Deploy" butonuna tıklayın

### 5. Custom Domain (Opsiyonel)
- Settings → Domains → Add Domain
- DNS ayarlarınızı Vercel'in verdiği değerlere göre yapın

## 📁 Proje Yapısı

```
src/
├── App.jsx           # Ana uygulama bileşeni (tüm sayfalar burada)
├── main.jsx          # Giriş noktası
├── index.css         # Global stiller
├── context/
│   └── DataContext.jsx   # Global state yönetimi
├── services/
│   └── api.js            # API istemcisi
└── components/
    └── Skeletons.jsx     # Yükleme animasyonları
```

## 🔗 API Bağlantısı

Bu site, Admin Panel Backend'inden veri çeker. Backend olmadan site varsayılan (statik) verilerle çalışır.

**API Endpoint'leri:**
- `GET /api/events` - Etkinlikler
- `GET /api/projects` - Projeler
- `GET /api/team` - Ekip üyeleri
- `GET /api/stats` - İstatistikler
- `POST /api/applications/membership` - Üyelik başvurusu
- `POST /api/applications/sponsorship` - Sponsorluk başvurusu
- `POST /api/applications/partnership` - Paydaşlık başvurusu

## 📝 Sosyal Medya Linkleri

Footer ve diğer bölümlerdeki sosyal medya linklerini değiştirmek için `src/App.jsx` dosyasında arama yapın:
- Instagram: `instagram.com/...`
- LinkedIn: `linkedin.com/company/...`

## ⚙️ Özelleştirme

### Logo ve İsim Değiştirme
`src/App.jsx` dosyasında "Veri Bilimi" veya "VBK" aramayı yaparak ilgili yerleri bulabilirsiniz.

### Renk Teması
Tailwind CSS kullanılmaktadır. Ana renkler:
- Primary: `indigo-600`
- Secondary: `purple-600`
- Accent: `emerald-600`

## 🐛 Sorun Giderme

### API'ye bağlanamıyor
1. Backend'in çalıştığından emin olun
2. `VITE_API_URL` doğru ayarlandığından emin olun
3. CORS ayarlarının doğru olduğundan emin olun

### Build hatası
```bash
npm run build
```
komutuyla build alıp hataları kontrol edin.

## 📄 Lisans

MIT License

---

**Geliştirici:** Veri Bilimi Kulübü Ekibi
