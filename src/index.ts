import highlightForbiddenWords from './highlightForbiddenWords.js';

// Елементи з DOM
const textInput = document.getElementById('text-input') as HTMLTextAreaElement | null;
const wordsInput = document.getElementById('words-input') as HTMLInputElement | null;
const checkBtn = document.getElementById('check-btn') as HTMLButtonElement | null;
const resultDiv = document.getElementById('result') as HTMLDivElement | null;

function processText() {
  if (!textInput || !wordsInput || !resultDiv) return;

  const text = textInput.value;
  
  const forbiddenWords = wordsInput.value
    .split(',')
    .map(word => word.trim())
    .filter(word => word.length > 0);

  const highlightedText = highlightForbiddenWords(text, forbiddenWords);
  resultDiv.innerHTML = highlightedText;
}

if (checkBtn) {
  checkBtn.addEventListener('click', processText);
}

processText();