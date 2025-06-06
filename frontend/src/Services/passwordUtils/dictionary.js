let dictwordSet = null;

async function loadFile(filePath) {
  const response = await fetch(filePath);
  if (!response.ok) throw new Error("Failed to fetch");
  return await response.text();
}

export async function loadDictionaryWords() {
  if (dictwordSet) return dictwordSet;
  const text = await loadFile("/dictionary-words.txt");
  const list = text.split("\n").map((w) => w.trim());
  dictwordSet = new Set(list);
  return dictwordSet;
}

export async function checkDictionaryWords(pwd) {
  const set = await loadDictionaryWords();
  return set.has(pwd) ? 0 : 10;
}
