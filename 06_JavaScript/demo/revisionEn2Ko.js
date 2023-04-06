const EN_KO_QWERTY_MAP = {
  'q': 'ㅂ', 'w': 'ㅈ', 'e': 'ㄷ', 'r': 'ㄱ', 't': 'ㅅ',
  'a': 'ㅁ', 's': 'ㄴ', 'd': 'ㅇ', 'f': 'ㄹ', 'g': 'ㅎ',
  'z': 'ㅋ', 'x': 'ㅌ', 'c': 'ㅊ', 'v': 'ㅍ'
};
const SHIFT_EN_KO_QWERTY_MAP = {
  'Q': 'ㅃ', 'W': 'ㅉ', 'E': 'ㄸ', 'R': 'ㄲ', 'T': 'ㅆ'
};

const INIT_COSONANT = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const FINAL_CONSONANT = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

const KO_VOWEL = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
]; // 12623 ~ 12643

const FIRST_CONSONANT = 'ㄱ';
const FIRST_VOWEL = KO_VOWEL[0];
const FIRST_KOREAN_CHAR = '가';

const FIRST_CONSONANT_CODE = FIRST_CONSONANT.charCodeAt();
const FIRST_VOWEL_CODE = FIRST_VOWEL.charCodeAt();

function transform(value, test) {
  if (value.length >= 2) {
    const firstChar = value[0];
    const firstKoChar = SHIFT_EN_KO_QWERTY_MAP[firstChar] || EN_KO_QWERTY_MAP[firstChar.toLowerCase()] || null;
    
    if (firstKoChar) {
      const firstCharCode = firstKoChar.charCodeAt();
      const vowel = value[1];

      let revision = 0;
      let gap = firstCharCode - FIRST_CONSONANT_CODE;

      if (gap > 19) {
        revision = 11
      } else if (gap > 15) {
        revision = 10;
      } else if (gap > 3) {
        revision = 3;
      } else if (gap > 2) {
        revision = 1;
      }

      if (KO_VOWEL.indexOf(vowel) > -1) {
        const init = firstCharCode - FIRST_CONSONANT_CODE - revision;
        const middle = vowel.charCodeAt() - FIRST_VOWEL_CODE;

        const combineCode = FIRST_KOREAN_CHAR.charCodeAt() + (init * KO_VOWEL.length * FINAL_CONSONANT.length) + (middle * FINAL_CONSONANT.length);

        value = String.fromCharCode(combineCode);
      }
    }
  }

  return value;
}

console.log(transform('Qㅏ', '빠'))
