const encoder = new TextEncoder();
const decoder = new TextDecoder();

// Mengubah password menjadi kunci AES 256-bit
async function buatKunci(password, salt) {
  const bahan = await crypto.subtle.importKey(
    'raw', encoder.encode(password), 'PBKDF2', false, ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: salt, iterations: 250000, hash: 'SHA-256' },
    bahan,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

// Format hasil: [salt 16 byte][iv 12 byte][data terenkripsi]
async function encryptBytes(bytes, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const kunci = await buatKunci(password, salt);
  const cipher = new Uint8Array(
    await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, kunci, bytes)
  );
  const hasil = new Uint8Array(28 + cipher.length);
  hasil.set(salt, 0);
  hasil.set(iv, 16);
  hasil.set(cipher, 28);
  return hasil;
}

// Akan melempar error jika password salah atau data diubah orang lain
async function decryptBytes(data, password) {
  const salt = data.slice(0, 16);
  const iv = data.slice(16, 28);
  const cipher = data.slice(28);
  const kunci = await buatKunci(password, salt);
  return new Uint8Array(
    await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, kunci, cipher)
  );
}

function toBase64(bytes) {
  let s = '';
  bytes.forEach(function (b) { s += String.fromCharCode(b); });
  return btoa(s);
}

function fromBase64(str) {
  return Uint8Array.from(atob(str), function (c) { return c.charCodeAt(0); });
}