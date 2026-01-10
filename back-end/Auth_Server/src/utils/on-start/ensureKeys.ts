import { join } from "node:path";
import { createAndActivateKey, keyIsOlderThanADay, readActiveKeyId } from "../helper/keysHelper";
import { error, log } from "node:console";

const KEYS_DIR = join(process.cwd(), "keys");

export default async function ensureKeys(): Promise<void> {
  const activeKid = await readActiveKeyId();

  if (!activeKid) {
    log("[crypto] No active key found, creating one");
    await createAndActivateKey();
    return;
  }

  const activeKeyDir = join(KEYS_DIR, activeKid, 'id_rsa_enc.pem');

  try {
    if (await keyIsOlderThanADay(activeKeyDir)) {
      console.log("[crypto] Active key is older than 24h, rotating");
      await createAndActivateKey();
    } else {
      console.log(`[crypto] Active rsa key valid: ${activeKid}`);
    }
  } catch (e) {
    error(`[crypto]: ${e} `);
  }
}
