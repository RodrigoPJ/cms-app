function pemToArrayBuffer(pem: string) {
  const base64 = pem
    .replace(/-----BEGIN PUBLIC KEY-----/, '')
    .replace(/-----END PUBLIC KEY-----/, '')
    .replace(/\s/g, '');

  const binary = atob(base64);
  const buffer = new ArrayBuffer(binary.length);
  const view = new Uint8Array(buffer);

  for (let i = 0; i < binary.length; i++) {
    view[i] = binary.charCodeAt(i);
  }
  return buffer;
}

async function generateAESKey() {
  return crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}

async function encryptWithAES(aesKey: CryptoKey, data: object) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(data));

  const encryptedBuffer = new Uint8Array(
    await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      aesKey,
      encoded
    )
  );

  // Split payload to obtain tag
  const authTagLength = 16;
  const ciphertext = encryptedBuffer.slice(
    0,
    encryptedBuffer.length - authTagLength
  );
  const authTag = encryptedBuffer.slice(
    encryptedBuffer.length - authTagLength
  );

  return {
    iv: btoa(String.fromCharCode(...iv)),
    ciphertext: btoa(String.fromCharCode(...ciphertext)),
    tag: btoa(String.fromCharCode(...authTag))
  };
}

async function encryptAESKey(aesKey: CryptoKey, publicKeyPem: string) {
  const rawKey = await crypto.subtle.exportKey('raw', aesKey);

  const publicKey = await crypto.subtle.importKey(
    'spki',
    pemToArrayBuffer(publicKeyPem),
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    false,
    ['encrypt']
  );

  const encryptedKey = await crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    publicKey,
    rawKey
  );

  return btoa(
    String.fromCharCode(...new Uint8Array(encryptedKey))
  );
}



export {
    generateAESKey,
    encryptWithAES,
    encryptAESKey
}