async function buatQR() {
  const data = JSON.stringify({
    nim: document.getElementById('nim').value,
    nama: document.getElementById('nama').value,
    jurusan: document.getElementById('jurusan').value,
    tgl: document.getElementById('tgl').value
  });
  const password = document.getElementById('password-qr').value;
  if (!password) {
    alert('Isi password terlebih dahulu!');
    return;
  }
  const terenkripsi = await encryptBytes(encoder.encode(data), password);
  const teks = toBase64(terenkripsi);
  const area = document.getElementById('qr-output');
  area.innerHTML = '';
  new QRCode(area, {
    text: teks,
    width: 260,
    height: 260,
    correctLevel: QRCode.CorrectLevel.M
  });
}

function downloadQR() {
  const canvas = document.querySelector('#qr-output canvas');
  if (!canvas) {
    alert('Buat QR terlebih dahulu!');
    return;
  }

  const skala = 3;
  const tepi = 40;
  const besar = canvas.width * skala + tepi * 2;

  const hasil = document.createElement('canvas');
  hasil.width = besar;
  hasil.height = besar;

  const ctx = hasil.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, besar, besar);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(canvas, tepi, tepi, canvas.width * skala, canvas.height * skala);

  const link = document.createElement('a');
  link.href = hasil.toDataURL('image/png');
  link.download = 'ktm-qr.png';
  link.click();
}