import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

export function generateKey(size = 32, format = "base64") {
  const buffer = randomBytes(size);
  return buffer.toString(format);
}

export function compareKeys(storedKey: string, suppliedKey: string) {
  const [hashedPassword, salt] = storedKey.split(".");

  const buffer = scryptSync(suppliedKey, salt, 64) as Buffer;
  return timingSafeEqual(Buffer.from(hashedPassword, "hex"), buffer);
}

export function generateSecretHash(key: string) {
  const salt = randomBytes(8).toString("hex");
  const buffer = scryptSync(key, salt, 64) as Buffer;
  return `${buffer.toString("hex")}.${salt}`;
}
