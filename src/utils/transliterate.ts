import { PROVERBS } from '@/data/proverbs';

// Basic approximation mapping for Ethiopic block 0x1200 to 0x135A
const AMHARIC_CONSONANTS = [
  'h', 'l', 'h', 'm', 's', 'r', 's', 'sh', 'q', 'qw', 'qh', 'qhw', 
  'b', 'v', 't', 'ch', 'h', 'hw', 'n', 'ny', 'a', 'k', 'kw', 'x', 
  'xw', 'w', 'a', 'z', 'zh', 'y', 'd', 'j', 'g', 'gw', 'ng', 'ngw', 
  't', 'ch', 'p', 'ts', 'tz', 'f', 'p'
];

const AMHARIC_VOWELS = ['e', 'u', 'i', 'a', 'e', '', 'o'];

export function transliterateAmharic(text: string): string {
  if (!text) return '';
  
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    // Basic Ethiopic block bounds
    if (code >= 0x1200 && code <= 0x135A) {
      const offset = code - 0x1200;
      const consonantIndex = Math.floor(offset / 8);
      const vowelIndex = offset % 8;
      
      const consonant = AMHARIC_CONSONANTS[consonantIndex] || '';
      
      if (vowelIndex === 7) {
        result += consonant + 'wa';
      } else {
        const vowel = AMHARIC_VOWELS[vowelIndex] || '';
        result += consonant + vowel;
      }
    } else {
      result += text[i];
    }
  }
  
  // Clean up multiple spaces and capitalize
  result = result.replace(/\s+/g, ' ').trim();
  return result ? result.charAt(0).toUpperCase() + result.slice(1) : '';
}

export function getTransliteration(amharicText: string): string {
  // First, check if we have a hand-written, highly accurate transliteration in our static data
  const existing = PROVERBS.find(p => p.am === amharicText);
  if (existing && existing.translit) {
    return existing.translit;
  }
  
  // Otherwise, use a basic algorithmic transliteration
  return transliterateAmharic(amharicText);
}
