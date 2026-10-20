# Panduan Presentasi Modul KTM Digital Aman

## Identitas Presentasi

- **Judul:** Aplikasi KTM Digital Aman Berbasis Web
- **Topik utama:** Pengamanan data mahasiswa menggunakan enkripsi AES dan QR Code
- **Teknologi:** HTML, CSS, JavaScript, Web Crypto API, QR Code, Git, dan GitHub Pages
- **Jenis proyek:** Proyek pembelajaran tanpa backend dan database

---

## Slide 1 — Pembukaan

### Poin yang ditampilkan

- KTM biasanya berisi data pribadi mahasiswa.
- QR Code biasa dapat dibaca oleh siapa saja.
- Data di dalam QR perlu dilindungi sebelum disimpan.

### Penjelasan lisan

> Pada proyek ini, saya membuat aplikasi KTM Digital Aman berbasis web. Tujuannya adalah melindungi data mahasiswa yang disimpan dalam QR Code. Data tidak langsung dimasukkan sebagai teks biasa, tetapi dienkripsi terlebih dahulu menggunakan password.

---

## Slide 2 — Tujuan Modul

Modul ini membimbing pemula dari tahap menyiapkan perangkat sampai aplikasi dapat diakses melalui internet.

Setelah menyelesaikan modul, pengguna dapat:

1. Membuat tampilan aplikasi dengan HTML dan CSS.
2. Menambahkan fungsi interaktif dengan JavaScript.
3. Mengenkripsi data identitas mahasiswa.
4. Menyimpan hasil enkripsi ke dalam QR Code.
5. Memindai dan membuka QR menggunakan password.
6. Mengenkripsi teks dan file PDF.
7. Menguji serta menerbitkan aplikasi melalui GitHub Pages.

### Penjelasan lisan

> Modul ini bukan hanya mengajarkan cara membuat QR Code. Modul juga mengenalkan struktur aplikasi web, enkripsi, pemrosesan file, pengujian, Git, dan publikasi website.

---

## Slide 3 — Fitur Utama Aplikasi

### 1. Buat QR Identitas

Pengguna mengisi:

- NIM;
- nama lengkap;
- jurusan;
- tanggal lahir; dan
- password.

Data tersebut dienkripsi dan dimasukkan ke QR Code. QR kemudian dapat diunduh sebagai gambar PNG.

### 2. Scan dan Buka QR

Kamera membaca QR Code. Data identitas hanya ditampilkan apabila pengguna memasukkan password yang benar.

### 3. Enkripsi Teks

Teks biasa dapat diubah menjadi cipher text yang terlihat seperti rangkaian karakter acak. Cipher text dapat dikembalikan dengan password yang sama.

### 4. Enkripsi PDF

File PDF dapat diubah menjadi file `.enc`. File tersebut tidak bisa dibuka sebagai PDF sebelum didekripsi menggunakan password yang benar.

### Penjelasan lisan

> Aplikasi mempunyai empat menu utama. Dua menu berhubungan dengan KTM dan QR Code, sedangkan dua lainnya menunjukkan bahwa modul enkripsi yang sama juga dapat digunakan untuk teks dan dokumen PDF.

---

## Slide 4 — Teknologi yang Digunakan

| Teknologi | Fungsi |
|---|---|
| HTML | Membuat struktur halaman dan formulir |
| CSS | Mengatur tampilan dan membuat halaman responsif |
| JavaScript | Menjalankan fitur, validasi, enkripsi, dan pemrosesan file |
| Web Crypto API | Menyediakan fungsi kriptografi dari browser |
| QRCode.js | Membuat gambar QR Code |
| Html5Qrcode | Membaca QR melalui kamera |
| Live Server | Menjalankan aplikasi secara lokal |
| Git dan GitHub | Menyimpan serta mengunggah kode |
| GitHub Pages | Menerbitkan aplikasi melalui HTTPS |

### Penjelasan lisan

> Aplikasi dibuat tanpa framework dan tanpa server khusus. Semua enkripsi dan dekripsi dilakukan langsung di browser menggunakan Web Crypto API.

---

## Slide 5 — Struktur Proyek

```text
ktm-aman/
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── crypto.js
│   ├── pdf.js
│   ├── qr.js
│   ├── scan.js
│   └── teks.js
└── index.html
```

Keterangan singkat:

- `index.html` berisi susunan halaman dan formulir.
- `style.css` mengatur tampilan aplikasi.
- `app.js` mengatur perpindahan tab.
- `crypto.js` menjadi pusat fungsi enkripsi dan dekripsi.
- `qr.js`, `scan.js`, `teks.js`, dan `pdf.js` menangani fitur masing-masing.

### Penjelasan lisan

> Kode dipisahkan berdasarkan fungsinya agar lebih mudah dipahami dan diperbaiki. Semua fitur keamanan menggunakan modul yang sama, yaitu `crypto.js`.

---

## Slide 6 — Cara Kerja Data KTM

```text
Data mahasiswa
      ↓
Diubah menjadi JSON
      ↓
Password diproses menjadi kunci
      ↓
Data dienkripsi dengan AES-GCM
      ↓
Hasil diubah menjadi Base64
      ↓
Dimasukkan ke QR Code
```

Proses pembukaan QR berjalan dengan urutan sebaliknya:

```text
QR dipindai
      ↓
Teks Base64 diubah menjadi byte
      ↓
Password dimasukkan
      ↓
Data didekripsi
      ↓
JSON dibaca
      ↓
Identitas mahasiswa ditampilkan
```

### Penjelasan lisan

> QR Code tidak menyimpan identitas dalam bentuk yang langsung terbaca. Scanner biasa hanya akan melihat teks acak. Aplikasi memerlukan password yang sesuai untuk mengembalikannya menjadi data mahasiswa.

---

## Slide 7 — Sistem Keamanan

Aplikasi menggunakan beberapa komponen keamanan:

- **AES-GCM 256-bit** untuk mengenkripsi data dan mendeteksi perubahan.
- **PBKDF2 dengan SHA-256** untuk mengubah password menjadi kunci enkripsi.
- **250.000 iterasi PBKDF2** untuk memperlambat percobaan password berulang.
- **Salt acak 16 byte** agar password yang sama menghasilkan kunci berbeda.
- **IV acak 12 byte** agar data yang sama menghasilkan cipher text berbeda.

Format hasil enkripsi:

```text
[salt 16 byte] + [IV 12 byte] + [data terenkripsi dan authentication tag]
```

Salt dan IV tidak harus dirahasiakan. Bagian yang harus dijaga adalah password.

### Penjelasan lisan

> AES-GCM tidak hanya menyamarkan data, tetapi juga memeriksa keutuhannya. Jika password salah atau satu karakter hasil enkripsi diubah, proses dekripsi akan gagal.

---

## Slide 8 — Tahapan Pembuatan

Modul memiliki 12 langkah, yaitu Langkah 0 sampai Langkah 11:

1. Memasang VS Code, Live Server, Git, dan menyiapkan GitHub.
2. Membuat folder serta file proyek.
3. Membuat kerangka halaman HTML.
4. Mengatur tampilan dengan CSS.
5. Membuat navigasi antartab.
6. Membuat modul enkripsi.
7. Membuat QR Code terenkripsi.
8. Menambahkan enkripsi teks.
9. Menambahkan enkripsi PDF.
10. Menambahkan pemindai QR melalui kamera.
11. Menguji seluruh fitur.
12. Menerbitkan aplikasi melalui GitHub Pages.

### Penjelasan lisan

> Tahapannya dibuat berurutan untuk pemula. Setiap langkah memiliki tujuan, kode, penjelasan, dan pemeriksaan hasil sebelum masuk ke langkah berikutnya.

---

## Slide 9 — Pengujian Aplikasi

Pengujian yang disarankan dalam modul meliputi:

- setiap menu dapat dibuka;
- QR berhasil dibuat dan diunduh;
- QR dapat dibuka dengan password yang benar;
- password yang salah menghasilkan pesan gagal;
- dua QR dari data yang sama memiliki isi berbeda;
- perubahan satu karakter pada cipher text terdeteksi;
- teks, termasuk emoji, kembali dengan benar setelah didekripsi;
- PDF hasil dekripsi sama dan dapat dibuka;
- kamera dapat membaca QR melalui localhost atau HTTPS; dan
- aplikasi tampil dengan baik di laptop dan ponsel.

### Penjelasan lisan

> Pengujian tidak hanya dilakukan pada kondisi berhasil. Modul juga menguji password salah, data rusak, input kosong, dan file yang tidak valid agar aplikasi memberikan pesan yang jelas dan tidak berhenti mendadak.

---

## Slide 10 — Publikasi Aplikasi

Aplikasi diunggah menggunakan Git, kemudian diterbitkan melalui GitHub Pages.

Contoh alamat aplikasi:

```text
https://USERNAME.github.io/ktm-aman/
```

HTTPS diperlukan karena akses kamera dan fitur keamanan browser di internet membutuhkan koneksi yang aman.

Kode pada repository publik dapat dilihat siapa saja. Password atau data pribadi asli tidak boleh ditulis langsung di dalam kode.

### Penjelasan lisan

> GitHub Pages dipilih karena gratis dan sudah menyediakan HTTPS. Aplikasi tidak menyimpan data di GitHub; GitHub hanya menyajikan file HTML, CSS, dan JavaScript kepada browser.

---

## Slide 11 — Kelebihan Aplikasi

- Dapat dijalankan tanpa backend dan database.
- Proses enkripsi berlangsung di perangkat pengguna.
- Password tidak dikirim ke server.
- Data dalam QR tidak dapat dibaca sebagai identitas biasa.
- Perubahan data dapat dideteksi oleh AES-GCM.
- Tampilan dapat digunakan melalui laptop dan ponsel.
- Cocok untuk mempelajari web, keamanan data, QR Code, dan Git.

---

## Slide 12 — Batasan Aplikasi

- Keamanan bergantung pada kekuatan password.
- Password harus diberikan melalui saluran yang aman dan tidak disimpan bersama QR.
- Belum ada tanda tangan digital untuk membuktikan bahwa QR diterbitkan oleh kampus.
- Belum ada login, database mahasiswa, hak akses, dan riwayat verifikasi.
- Data terlalu panjang dapat melebihi kapasitas QR Code.
- PDF besar dapat memperlambat browser karena seluruh file dimuat ke memori.
- Library QR dan scanner diambil dari CDN sehingga membutuhkan koneksi internet.
- Proyek ini belum dapat menggantikan sistem KTM resmi kampus.

### Penjelasan lisan

> Enkripsi memberikan kerahasiaan dan pemeriksaan keutuhan data, tetapi belum memberikan bukti penerbit. Karena itu, sistem produksi masih memerlukan tanda tangan digital dan database resmi kampus.

---

## Slide 13 — Pengembangan Selanjutnya

Beberapa pengembangan yang disarankan:

1. Menambahkan tanda tangan digital untuk membedakan QR resmi dan palsu.
2. Membuat backend dengan Node.js dan Express.
3. Menyimpan data mahasiswa serta riwayat verifikasi dalam database SQLite.
4. Menambahkan login dan hak akses mahasiswa atau petugas.
5. Menyimpan password pengguna dalam bentuk hash, misalnya menggunakan bcrypt.
6. Menempatkan aplikasi di server sendiri dengan Nginx, HTTPS, dan firewall.

---

## Slide 14 — Kesimpulan

### Poin yang ditampilkan

- Aplikasi melindungi identitas, teks, dan PDF menggunakan enkripsi.
- QR hanya dapat dibuka dengan password yang sesuai.
- Semua proses berlangsung di browser.
- Modul cocok sebagai dasar sebelum membangun sistem KTM yang lebih lengkap.

### Contoh kalimat penutup

> Kesimpulannya, modul ini menunjukkan cara menerapkan AES-GCM dan QR Code dalam aplikasi web sederhana. Aplikasi sudah dapat menjaga kerahasiaan serta keutuhan data, tetapi masih memerlukan tanda tangan digital, backend, database, dan pengelolaan pengguna sebelum digunakan sebagai sistem KTM resmi.

---

## Urutan Demonstrasi

Jika melakukan demo langsung, gunakan urutan berikut:

1. Buka aplikasi dan tunjukkan empat menu.
2. Masukkan contoh identitas yang bukan data pribadi asli.
3. Buat QR menggunakan password contoh.
4. Tunjukkan bahwa scanner QR biasa hanya membaca teks acak.
5. Pindai atau salin isi QR ke menu **Scan QR**.
6. Masukkan password yang benar dan tampilkan identitas.
7. Coba password salah untuk menunjukkan proses dekripsi ditolak.
8. Demonstrasikan enkripsi dan dekripsi teks.
9. Jika waktu cukup, demonstrasikan enkripsi dan dekripsi PDF kecil.

### Data aman untuk demonstrasi

```text
NIM       : 123456789
Nama      : Budi Contoh
Jurusan   : Informatika
Tanggal   : 2000-01-01
Password  : DemoKTM-2026!
```

Jangan memakai data pribadi atau password asli saat presentasi.

---

## Pertanyaan yang Mungkin Muncul

### Mengapa menggunakan AES-GCM?

AES-GCM dapat mengenkripsi sekaligus mendeteksi apakah data telah diubah. Password salah atau data rusak akan menyebabkan dekripsi gagal.

### Apakah salt dan IV harus dirahasiakan?

Tidak. Salt dan IV disimpan bersama hasil enkripsi. Password adalah bagian yang harus dirahasiakan.

### Mengapa dua QR dari data yang sama bisa berbeda?

Setiap proses enkripsi menggunakan salt dan IV acak. Karena itu, hasil enkripsinya selalu berbeda meskipun data dan password sama.

### Apakah data dikirim ke server?

Tidak. Pada versi dalam modul, seluruh proses dilakukan di browser dan tidak ada backend atau database.

### Apakah QR ini sudah membuktikan keaslian KTM?

Belum. QR sudah melindungi isi data, tetapi belum mempunyai tanda tangan digital yang membuktikan siapa penerbitnya.

### Apa yang terjadi jika password lupa?

Data tidak dapat dipulihkan karena aplikasi tidak menyimpan password atau kunci cadangan.

### Mengapa aplikasi harus memakai localhost atau HTTPS?

Browser membatasi akses kamera dan Web Crypto pada konteks yang aman. Live Server menyediakan localhost untuk pengembangan, sedangkan GitHub Pages menyediakan HTTPS untuk penggunaan melalui internet.

---

## Naskah Presentasi Singkat

> Modul ini membahas pembuatan aplikasi KTM Digital Aman berbasis HTML, CSS, dan JavaScript. Aplikasi memiliki empat fitur, yaitu membuat QR identitas terenkripsi, memindai dan membuka QR, mengenkripsi teks, serta mengenkripsi file PDF.
>
> Pengamanannya menggunakan AES-GCM 256-bit. Password diproses menjadi kunci melalui PBKDF2 dengan SHA-256 dan 250.000 iterasi. Setiap enkripsi memakai salt dan IV acak, sehingga data serta password yang sama tetap menghasilkan cipher text berbeda. AES-GCM juga membuat proses dekripsi gagal apabila password salah atau data telah diubah.
>
> Semua proses dilakukan langsung di browser. Aplikasi tidak memiliki backend dan tidak menyimpan password atau data mahasiswa di server. Setelah selesai dibuat, aplikasi diuji di laptop dan ponsel, lalu diterbitkan melalui GitHub Pages agar memperoleh alamat HTTPS.
>
> Aplikasi ini cocok sebagai proyek pembelajaran, tetapi belum menjadi sistem KTM resmi. Sistem produksi masih memerlukan tanda tangan digital, database resmi, login, hak akses, dan pengelolaan password yang lebih lengkap.

