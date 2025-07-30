# UKM Kewirausahaan UNESA Kampus 5 Website

Website resmi UKM Kewirausahaan UNESA Kampus 5 Magetan - Platform digital untuk mengembangkan jiwa entrepreneur mahasiswa.

## 🚀 Deskripsi

Website ini dibangun untuk UKM Kewirausahaan UNESA Kampus 5 Magetan yang baru didirikan pada tahun 2025. Website ini berfungsi sebagai platform utama untuk menampilkan profil organisasi, program-program yang dijalankan, startup mahasiswa, dan sebagai media rekrutmen anggota baru.

## ✨ Fitur Utama

- **Homepage Interaktif**: Hero slider dengan animasi, statistik real-time, dan countdown recruitment
- **Profil Organisasi**: Visi, misi, struktur pengurus, dan timeline perkembangan
- **Program & Kegiatan**: Inkubasi bisnis, workshop, seminar, dan bazar kampus
- **Startup Mahasiswa**: Showcase startup yang dikembangkan oleh anggota
- **Galeri**: Dokumentasi kegiatan dan event
- **Blog**: Artikel tentang kewirausahaan dan tips bisnis
- **Sistem Recruitment**: Form pendaftaran online untuk anggota baru
- **Kontak & Lokasi**: Informasi lengkap dan Google Maps

## 🎨 Desain & UI/UX

- **Warna Tema**: Kuning Emas (#FFD700), Biru Tua (#27548A), Putih (#FFFFFF)
- **Typography**: Poppins (heading), Inter (body text)
- **Responsive Design**: Mobile-first approach dengan breakpoints optimal
- **Animasi**: Smooth scrolling, hover effects, dan micro-interactions
- **Dark Mode**: Toggle tema gelap/terang
- **Accessibility**: WCAG 2.1 compliant

## 🛠️ Teknologi

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **CSS Framework**: Custom CSS dengan metodologi BEM
- **Animasi**: CSS Animations + JavaScript
- **Icons**: Emoji dan Unicode symbols
- **Fonts**: Google Fonts (Poppins, Inter)
- **Images**: Pexels stock photos

## 📁 Struktur Direktori

```
/
├── index.html              # Homepage
├── about/                  # Halaman tentang
│   ├── index.html         # Profil UKM
│   └── structure.html     # Struktur pengurus
├── programs/              # Program & kegiatan
│   └── index.html
├── startups/              # Startup mahasiswa
│   └── index.html
├── gallery/               # Galeri foto
│   └── index.html
├── blog/                  # Blog & artikel
│   └── index.html
├── join/                  # Pendaftaran anggota
│   └── index.html
├── contact/               # Kontak & lokasi
│   └── index.html
├── css/                   # Stylesheet
│   ├── main.css          # Style utama
│   └── components/        # Komponen CSS
│       ├── navbar.css
│       ├── hero.css
│       ├── cards.css
│       ├── buttons.css
│       └── forms.css
├── js/                    # JavaScript
│   ├── main.js           # Script utama
│   ├── animations.js     # Animasi
│   └── forms.js          # Form handling
├── assets/               # Asset files
│   └── images/           # Gambar
└── README.md            # Dokumentasi
```

## 🎯 Target Audience

- **Mahasiswa UNESA Kampus 5**: Calon anggota UKM
- **Praktisi Bisnis**: Potential mentors dan partners
- **Akademisi**: Dosen dan staff kampus
- **Startup Community**: Komunitas entrepreneur lokal
- **Media**: Dokumentasi dan publikasi kegiatan

## 🚀 Instalasi & Penggunaan

1. **Clone Repository**
   ```bash
   git clone [repository-url]
   cd ukm-entrepreneur-unesa
   ```

2. **Buka di Browser**
   - Langsung buka `index.html` di browser
   - Atau gunakan local server seperti Live Server

3. **Development**
   ```bash
   # Untuk development dengan live reload
   npx live-server
   ```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Panduan Desain

### Warna
- **Primary**: #FFD700 (Kuning Emas)
- **Secondary**: #27548A (Biru Tua)
- **Accent**: #FF6B35 (Orange)
- **Text**: #2C3E50 (Dark), #7F8C8D (Light)
- **Background**: #FFFFFF (White), #F5F5F5 (Light Gray)

### Typography
- **Heading**: Poppins (600, 700)
- **Body**: Inter (400, 500)
- **Line Height**: 1.5 (body), 1.2 (heading)

### Spacing
- **Base Unit**: 8px
- **Small**: 8px, 16px
- **Medium**: 24px, 32px
- **Large**: 48px, 64px

## 🔧 Kustomisasi

### Mengubah Warna Tema
Edit CSS variables di `css/main.css`:
```css
:root {
    --primary-color: #FFD700;
    --secondary-color: #27548A;
    --accent-color: #FF6B35;
}
```

### Menambah Halaman Baru
1. Buat file HTML baru di direktori yang sesuai
2. Copy structure dari halaman existing
3. Update navigation di semua halaman
4. Tambahkan CSS khusus jika diperlukan

### Mengubah Konten
- Edit HTML files untuk mengubah konten
- Update gambar di folder `assets/images/`
- Modify JavaScript untuk fitur interaktif

## 📊 Fitur Interaktif

### Hero Slider
- Auto-slide setiap 5 detik
- Manual navigation dengan tombol
- Responsive indicators

### Stats Counter
- Animasi counter saat scroll
- Customizable target numbers
- Intersection Observer API

### Countdown Timer
- Real-time countdown untuk recruitment
- Customizable target date
- Responsive design

### Form Validation
- Real-time validation
- Custom error messages
- File upload dengan drag & drop

## 🎪 Animasi

### Scroll Animations
- Fade in saat element terlihat
- Stagger animations untuk lists
- Parallax effects untuk background

### Hover Effects
- Card hover transformations
- Button hover states
- Icon animations

### Loading States
- Loading screen dengan animasi
- Form submission loading
- Skeleton screens

## 📝 SEO & Performance

### Meta Tags
- Descriptive titles dan descriptions
- Open Graph untuk social sharing
- Structured data markup

### Performance
- Optimized images dari Pexels
- Minified CSS dan JavaScript
- Lazy loading untuk images
- Efficient animations

## 🔐 Security

- Form validation di client-side
- XSS protection
- CSRF protection untuk forms
- Content Security Policy headers

## 🧪 Testing

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Mobile Testing
- iOS Safari
- Android Chrome
- Responsive design testing

## 📈 Analytics & Monitoring

### Tracking
- Google Analytics integration ready
- Event tracking untuk interactions
- Performance monitoring

### Metrics
- Page load times
- User interactions
- Form submissions
- Mobile vs desktop usage

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

### Code Style
- Use BEM methodology untuk CSS
- JavaScript ES6+ features
- Consistent indentation (2 spaces)
- Descriptive variable names

## 📞 Support

Untuk pertanyaan atau dukungan:
- **Email**: ukm.kewirausahaan@unesa.ac.id
- **WhatsApp**: +62 xxx-xxxx-xxxx
- **Instagram**: @ukm_kewirausahaan_unesa

## 📄 License

© 2025 UKM Kewirausahaan UNESA Kampus 5. All rights reserved.

## 🎉 Acknowledgments

- **UNESA Kampus 5 Magetan**: Dukungan institusi
- **Pexels**: Stock photography
- **Google Fonts**: Typography
- **Community**: Feedback dan suggestions

---

**Tagline**: "Generate Ideas, Grow Business, Impact the World"

*Website ini dibangun dengan ❤️ untuk mengembangkan jiwa entrepreneur mahasiswa UNESA Kampus 5 Magetan.*