function highlightForbiddenWords(text: string, forbiddenWords: string[]): string {
  if (!forbiddenWords.length || !text) {
    return text;
  }

  const pattern = new RegExp(`(?<!\\p{L})(${forbiddenWords.join('|')})(?!\\p{L})`, 'gui');

  return text.replace(pattern, '<del>$1</del>');
}

export default highlightForbiddenWords;