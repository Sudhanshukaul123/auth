export function checkLengthScore(pwd) {
  const len = pwd.length;
  if (len >= 12) return 25;
  if (len >= 10) return 20;
  if (len >= 8) return 15;
  if (len >= 6) return 10;
  if (len >= 4) return 5;
  return 0;
}

export function checkVarietyScore(pwd) {
  const hasLower = /[a-z]/.test(pwd);
  const hasUpper = /[A-Z]/.test(pwd);
  const digits = (pwd.match(/\d/g) || []).length;
  const specials = (pwd.match(/[!@#$%^&*()_\-+=\[\]{}|\\;:'",.<>/?]/g) || []).length;

  let score = 0;
  if (hasLower) score += 5;
  if (hasUpper) score += 5;
  score += digits >= 3 ? 10 : digits >= 1 ? 5 : 0;
  score += specials > 3 ? 10 : specials >= 1 ? 5 : 0;

  return score;
}

export function estimateEntropy(pwd) {
  let pool = 0;
  if (/[a-z]/.test(pwd)) pool += 26;
  if (/[A-Z]/.test(pwd)) pool += 26;
  if (/\d/.test(pwd)) pool += 10;
  if (/[!@#$%^&*()_\-+=\[\]{}|\\;:'",.<>/?]/.test(pwd)) pool += 32;
  return Math.min(10, Math.floor(((Math.log2(pool) * pwd.length) / 60) * 10));
}
