export const keyboardPatterns = [
  "qwerty",
  "asdfgh",
  "zxcvbn",
  "123456",
  "password",
  "iloveyou",
];

export function hasRepeatedSequence(str) {
  const len = str.length;
  for (let i = 1; i <= Math.floor(len / 2); i++) {
    const pattern = str.slice(0, i);
    if (pattern.repeat(Math.floor(len / i)) === str) return true;
  }
  return false;
}

export function containsKeyboardPattern(password) {
  const lower = password.toLowerCase();
  return keyboardPatterns.some((pat) => lower.includes(pat));
}

export function isSameCharRepeated(password) {
  return /^([a-zA-Z0-9])\1+$/.test(password);
}

export function checkPatternDetection(pwd) {
  let score = 10;
  if (hasRepeatedSequence(pwd)) score -= 5;
  if (containsKeyboardPattern(pwd)) score -= 5;
  if (isSameCharRepeated(pwd)) score -= 5;
  return Math.max(0, score);
}
