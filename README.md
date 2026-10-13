# Sarnadim Bakul Ayam - Landing Page

Website promosi untuk **Sarnadim Bakul Ayam** (ayam kampung, burung dara, entog, dan telur segar) di Kabupaten Batang, Jawa Tengah. HTML, CSS, dan JavaScript murni, tanpa library tambahan.

## Struktur
```
sarnadim-bakul-ayam/
├── index.html
├── css/style.css
├── js/main.js
├── images/            # taruh logo.png dan foto sendiri di sini
└── README.md
```

## Cara pakai
1. Buka `index.html` di browser (atau Live Server di VS Code).
2. **Nomor WhatsApp**: ganti `6282223103422` di `index.html` (cari dengan Ctrl+F) dan `PHONE` di `js/main.js`. Format: `62` + nomor tanpa 0 di depan, tanpa spasi atau tanda hubung. Tampilan nomor di footer dan bagian lokasi ditulis manual.
3. **Logo**: simpan sebagai `images/logo.png`. Jika belum ada, ikon telur tampil otomatis.
4. **Ganti foto**: taruh foto di folder `images/`, lalu di `index.html` ubah
   `src="https://images.unsplash.com/..."` menjadi `src="images/nama-foto.jpg"`.
   Foto ada di: hero (2), produk (4), bagian "Kenapa kami" (1), galeri (4).
   Jika foto gagal dimuat, emoji tampil sebagai pengganti.
5. **Lokasi**: peta ada di bagian `id="lokasi"`. Untuk memindahkan titik, ubah koordinat pada `src` iframe
   (`q=-6.9004748,109.7303943`) atau ganti alamat dan jam buka di kartu sebelahnya.
6. **Produk**: nama, deskripsi, dan harga ada di dalam `<article class="product">`. Nama di `orderWA('...')` sebaiknya sama dengan judul produk.

## Fitur
- Responsif untuk HP, tablet, dan desktop (menu geser di HP)
- Foto berbentuk organik yang bergerak halus, parallax mengikuti kursor, kartu produk miring 3D
- Animasi muncul saat scroll, angka statistik berhitung, marquee
- Peta Google Maps, alamat, jam buka, dan tombol petunjuk arah
- Tombol WhatsApp melayang dan tombol pesan di tiap produk
- Menghormati pengaturan "kurangi gerakan" di perangkat
