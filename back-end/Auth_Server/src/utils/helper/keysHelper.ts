import { writeFile, readFile, mkdir, readlink, unlink, symlink, stat, } from "node:fs/promises";
import { join } from "node:path";
import dotenv from "dotenv";
import path from "path";
import { generateKeyPairSync, createPublicKey, createPrivateKey } from "crypto";
import { log } from "node:console";

const env = process.env.NODE_ENV || "devlocal";
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

const rsaFilesPassphrase = process.env.RSA_PASSPHRASE;
const KEYS_DIR = join(process.cwd(), "keys");
const ACTIVE_SYMLINK = join(KEYS_DIR, "active");
const MAX_KEY_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours
const ACTIVE_LINK = join(KEYS_DIR, "active");

function generateKeyId() {
  return `rsa-${new Date().toISOString().slice(0, 10)}`;
}

/** Creates a new pair of RSA keys, and exports them to a string
 ** and into an object that is returned
 ** @returns An object containing both keys.                    */
function generateRSAKeyPair() {
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      // === ENCRYPTION OPTIONS ===
      cipher: "aes-256-cbc", // The encryption algorithm
      passphrase: rsaFilesPassphrase, // The passphrase for encryption
    },
  });
  return {
    publicKey,
    privateKey,
  };
}

function createPublicKeyObjectFromString(publicKeyString: string) {
  const publicKeyObject = createPublicKey({
    key: publicKeyString,
    format: "pem",
    type: "spki",
  });
  return publicKeyObject;
}

function createPrivateKeyObjectFromString(privateKeyString: string) {
  const privateKeyObject = createPrivateKey({
    key: privateKeyString,
    passphrase: rsaFilesPassphrase,
  });
  return privateKeyObject;
}

/** Looks for the current active key and its id, if not found returns null 
 * @returns Object with key id(kid) and current public key or null if not found
*/
async function readActiveKey() {
  try {
    const activeDir = await readlink(ACTIVE_SYMLINK, "utf-8");
    const keyDir = join(KEYS_DIR, activeDir.trim());
    const publicKey = await readFile(join(keyDir, "id_rsa_pub.pem"), "utf-8");

    return {
      kid: activeDir.trim(),
      publicKey,
    };
  } catch {
    return null;
  }
}

async function readActiveKeyId(): Promise<string | null> {
  try {
    const activeKeyId = await readlink(ACTIVE_LINK, "utf-8")
    return activeKeyId.trim();
  } catch {
    return null;
  }
}


async function createAndActivateKey() {
  const kid = generateKeyId();
  const keyDir = join(KEYS_DIR, kid);
  const { publicKey, privateKey } = generateRSAKeyPair();

  await mkdir(keyDir, { recursive: true });
  await writeFile(join(keyDir, "id_rsa_pub.pem"), publicKey, "utf-8");
  await writeFile(join(keyDir, "id_rsa_enc.pem"), privateKey, "utf-8");

   // remove old symlink if it exists
  try {
    await unlink(ACTIVE_SYMLINK);
  } catch {
    log('No existing active symlink');
  }

  // create new symlink
  await symlink(kid, ACTIVE_SYMLINK);

  return { kid, publicKey };
}

async function keyIsOlderThanADay(keyDir: string): Promise<boolean> {
  const stats = await stat(keyDir);
  return (Date.now() - stats.birthtimeMs) > MAX_KEY_AGE_MS;
}

/** Looks for the key with the provided kid 
 * @returns private key for the kid provided
*/
async function readKey(kid: string) {
  const keyDir = join(KEYS_DIR, kid);
  try {
    const publicKey = await readFile(join(keyDir, "id_rsa_enc.pem"), "utf-8");
    return publicKey;
  } catch (error) {
    log(error);
    return null;
  }
}


export {
  generateKeyId,
  readActiveKey,
  createAndActivateKey,
  generateRSAKeyPair,
  createPrivateKeyObjectFromString,
  createPublicKeyObjectFromString,
  keyIsOlderThanADay,
  readActiveKeyId,
  readKey
};
