let pemindai = null;

function mulaiScan() {
  pemindai = new Html5Qrcode('reader');
  pemindai.start(
    { facingMode: 'environment' },
    { fps: 10, qrbox: 250 },
    function (teks) {
      document.getElementById('hasil-scan').value = teks;
      pemindai.stop();
    }
  ).catch(function () {
    alert('Kamera tidak bisa dibuka. Pastikan izin kamera aktif dan alamat memakai localhost atau HTTPS.');
  });
}

async function dekripsiScan() {
  const cipher = document.getElementById('hasil-scan').value.trim();
  const password = document.getElementById('password-scan').value;
  const area = document.getElementById('hasil-identitas');

  if (!cipher || !password) {
    alert('Scan QR dan isi password!');
    return;
  }
  try {
    const bytes = await decryptBytes(fromBase64(cipher), password);
    const data = JSON.parse(decoder.decode(bytes));
    area.innerHTML = '';
    ['nim', 'nama', 'jurusan', 'tgl'].forEach(function (k) {
      const p = document.createElement('p');
      p.textContent = k.toUpperCase() + ': ' + data[k];
      area.appendChild(p);
    });
  } catch (e) {
    alert('Gagal: password salah atau QR tidak valid.');
  }
}
async function scanGambar(input) {
  const file = input.files[0];
  const status = document.getElementById('status-gambar');

  if (!file) {
    return;
  }

  // Matikan kamera lebih dulu jika sedang menyala
  try {
    if (pemindai) {
      await pemindai.stop();
    }
  } catch (e) {
    // kamera memang tidak menyala, abaikan
  }

  status.innerText = 'Membaca gambar...';
  const pembaca = new Html5Qrcode('reader-file');

  try {
    const teks = await pembaca.scanFile(file, false);
    document.getElementById('hasil-scan').value = teks;
    status.innerText = 'QR terbaca. Sekarang isi password lalu klik Buka Data.';
  } catch (e) {
    status.innerText = '';
    alert('QR tidak terbaca. Pastikan gambar adalah QR hasil Download PNG, utuh dan tidak terpotong.');
  }

  try {
    pembaca.clear();
  } catch (e) {
    // abaikan
  }

  // Kosongkan kolom agar file yang sama bisa dipilih lagi
  input.value = '';
}