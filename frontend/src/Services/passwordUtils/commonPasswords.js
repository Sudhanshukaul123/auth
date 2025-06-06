let commonPasswordsSet = null;

async function loadFile(filePath) {
  const response = await fetch(filePath);
  if (!response.ok) throw new Error("Failed to fetch");
  return await response.text();
}

export async function loadCommonPasswords() {
  if (commonPasswordsSet) return commonPasswordsSet;
  const text = await loadFile("/common-passwords.txt");
  const list = text.split("\n").map((w) => w.trim());
  commonPasswordsSet = new Set(list);
  return commonPasswordsSet;
}

export async function checkCommonPasswords(pwd) {
  const set = await loadCommonPasswords();
  return set.has(pwd.toLowerCase()) ? 0 : 15;
}
