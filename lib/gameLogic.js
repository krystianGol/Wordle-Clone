import words from '../words';

let wordToGuess = generateNewWord(); 

export function generateNewWord() {
    const randomNumber = Math.floor(Math.random() * words.length);
    wordToGuess = words[randomNumber].toUpperCase()
    return wordToGuess;
}

export function getCurrentWord() {
    return wordToGuess; 
}

export function checkUserGuess(word) {
    let result = Array(word.length).fill("gray")

    for (let i = 0; i < word.length; i++) {
        if (word[i] === wordToGuess[i]) {
            result[i] = "green"; 
        }
    }

        for(let i=0; i<word.length; i++) {
            if (wordToGuess.includes(word[i]) && result[i] !== 'green') {
                result[i] = 'orange';
            }
    }
    
    return result;
}

export function createWordFromArray(arr) {
    let word = '';
    for(let i=0; i<arr.length; i++) {
        word += arr[i];
    }
    return word;
}