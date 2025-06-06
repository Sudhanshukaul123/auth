import { checkLengthScore, checkVarietyScore, estimateEntropy } from "./passwordUtils/scores";
import { checkCommonPasswords } from "./passwordUtils/commonPasswords";
import { checkDictionaryWords } from "./passwordUtils/dictionary";
import { checkPatternDetection } from "./passwordUtils/patterns";

export async function getPasswordStrength(pwd) {
  if (!pwd) return 0;
  let score = 0;
  score += checkLengthScore(pwd);
  score += checkVarietyScore(pwd);
  score += await checkCommonPasswords(pwd);
  score += await checkDictionaryWords(pwd);
  score += checkPatternDetection(pwd);
  score += estimateEntropy(pwd);
  return Math.min(score, 100);
}
