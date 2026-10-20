function bacaFile(file) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function () { resolve(new Uint8Array(reader.result)); };
    reader.onerror = function () { reject(reader.error); };
    reader.readAsArrayBuffer(file);
  });
}

function unduh(bytes, namaFile, tipe) {
  const url = URL.createObjectURL(new Blob([bytes], { type: tipe }));
  const link = document.createElement('a');
  link.href = url;
  link.download = namaFile;
  link.click();
  URL.revokeObjectURL(url);
}

function namaDasar(nama) {
  const titik = nama.lastIndexOf('.');
  return titik > 0 ? nama.slice(0, titik) : nama;
}

async function enkripsiPDF() {
  const file = document.getElementById('inputPDF').files[0];
  const password = document.getElementById('password-pdf').value;
  const status = document.getElementById('status-pdf');

  if (!file || !password) {
    alert('Pilih file PDF dan isi password!');
    return;
  }
  status.innerText = 'Mengenkripsi...';
  const hasil = await encryptBytes(await bacaFile(file), password);
  unduh(hasil, namaDasar(file.name) + '.enc', 'application/octet-stream');
  status.innerText = 'Berhasil! File .enc sudah diunduh.';
}

async function dekripsiPDF() {
  const file = document.getElementById('inputENC').files[0];
  const password = document.getElementById('password-pdf').value;
  const status = document.getElementById('status-pdf');

  if (!file || !password) {
    alert('Pilih file .enc dan isi password!');
    return;
  }
  status.innerText = 'Mendekripsi...';
  try {
    const hasil = await decryptBytes(await bacaFile(file), password);
    unduh(hasil, namaDasar(file.name) + '_dekripsi.pdf', 'application/pdf');
    status.innerText = 'Berhasil! PDF sudah diunduh.';
  } catch (e) {
    status.innerText = 'Gagal: password salah atau file rusak.';
  }
}