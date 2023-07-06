const EN_KO_QWERTY_MAP = {
  'Q': 'ㅃ', 'W': 'ㅉ', 'E': 'ㄸ', 'R': 'ㄲ', 'T': 'ㅆ',
  'q': 'ㅂ', 'w': 'ㅈ', 'e': 'ㄷ', 'r': 'ㄱ', 't': 'ㅅ',
  'a': 'ㅁ', 's': 'ㄴ', 'd': 'ㅇ', 'f': 'ㄹ', 'g': 'ㅎ',
  'z': 'ㅋ', 'x': 'ㅌ', 'c': 'ㅊ', 'v': 'ㅍ'
};
const ALL_CONSONANT =   'ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'
const INIT_CONSONANT =  'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const FINAL_CONSONANT = 'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ';

const KO_VOWEL = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'; // 12623 ~ 12643

const FIRST_CONSONANT = 'ㄱ';
const FIRST_VOWEL = KO_VOWEL[0];
const FIRST_KOREAN_CHAR = '가';

const FIRST_CONSONANT_CODE = FIRST_CONSONANT.charCodeAt();
const FIRST_VOWEL_CODE = FIRST_VOWEL.charCodeAt();

function getConsonantCorrection(charCode) {
  if (!isNaN(charCode)) {
    charCode = String.fromCharCode(charCode);
  }

  if (INIT_CONSONANT.indexOf(charCode) === -1) {
    throw new Error('incorrect consonant character.');
  }

  return ALL_CONSONANT.indexOf(charCode) - INIT_CONSONANT.indexOf(charCode);
}

function transform(value, test) {
  if (value.length >= 2) {
    const firstChar = value[0];
    const firstKoChar =  EN_KO_QWERTY_MAP[firstChar] || EN_KO_QWERTY_MAP[firstChar.toLowerCase()] || null;

    if (firstKoChar) {
      const firstCharCode = firstKoChar.charCodeAt();
      const vowel = value[1];

      let revision = getConsonantCorrection(firstKoChar)

      if (KO_VOWEL.indexOf(vowel) > -1) {
        const init = firstCharCode - FIRST_CONSONANT_CODE - revision;
        const middle = vowel.charCodeAt() - FIRST_VOWEL_CODE;

        const combineCode = FIRST_KOREAN_CHAR.charCodeAt() + (init * KO_VOWEL.length * 28) + (middle * 28);

        value = String.fromCharCode(combineCode);
      }
    }
  }

  return value;
}

console.log(transform('Qㅏ', '빠'));

function transform2(value) {
  const KOREAN_INITIAL = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
  const KOREAN_MEDIAL = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
  const KOREAN_FINAL = ['', ...'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ'];

  let transformed = '';

  for (let i = 0; i < value.length; i += 2) {
    const initialIndex = KOREAN_INITIAL.indexOf(value[i]);
    const medialIndex = KOREAN_MEDIAL.indexOf(value[i + 1]);
    const finalIndex = KOREAN_FINAL.indexOf(value[i + 2]);

    const syllableCode = 44032 + (initialIndex * 21 * 28) + (medialIndex * 28) + finalIndex;
    transformed += String.fromCharCode(syllableCode);
  }

  return transformed;
}

console.log(transform2('Qㅏ', '빠'));

