export function generateLicenseKey() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let key = "ADVANCE-";
  for (let i = 0; i < 12; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
    if ((i + 1) % 4 === 0 && i !== 11) key += "-";
  }
  return key;
}
