import words from '../words';

const randomNumber = getRandomInteger(0, 50)

const wordToGuess = words[randomNumber].toUpperCase();

export function didUserGuees(word) {
    return wordToGuess == word;
}

export function createWordFromArray(arr) {
    let word = '';
    for(let i=0; i<arr.length; i++) {
        word += arr[i];
    }
    return word;
}