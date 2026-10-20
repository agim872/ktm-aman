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