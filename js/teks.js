async function enkripsiTeks() {
  const teks = document.getElementById('teks-asli').value;
  const password = document.getElementById('password-teks').value;
  if (!teks || !password) {
    alert('Isi teks dan password!');
    return;
  }
  const hasil = await encryptBytes(encoder.encode(teks), password);
  document.getElementById('teks-hasil').value = toBase64(hasil);
}

async function dekripsiTeks() {
  const cipher = document.getElementById('teks-hasil').value.trim();
  const password = document.getElementById('password-teks').value;
  if (!cipher || !password) {
    alert('Isi cipher text dan password!');
    return;
  }
  try {
    const bytes = await decryptBytes(fromBase64(cipher), password);
    document.getElementById('teks-asli').value = decoder.decode(bytes);
  } catch (e) {
    alert('Gagal: password salah atau data rusak.');
  }
}