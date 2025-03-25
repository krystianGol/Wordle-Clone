import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import Keyboard from '../components/Keyboard'; 
import Grid from '../components/Grid'
import SuccessModal from '../components/SuccessModal';
import FailureModal from '../components/FailureModal';
import { useState } from 'react';
import { createWordFromArray, checkUserGuess, getCurrentWord, generateNewWord } from '../lib/gameLogic';

export default function App() {

  const handleRetry = () => {
    setGuessedWords(Array(5).fill("").map(() => Array(5).fill("")));
    setStatuses(Array(5).fill("").map(() => Array(5).fill("")));
    setCurrentRow(0);
    setCurrentColumn(0);
    setIsWinner(false);
    setIsGameOver(false);
    setCorrectWord(generateNewWord());
  }

  const [isWinner, setIsWinner] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [correctWord, setCorrectWord] = useState(getCurrentWord());

  const [guessedWords, setGuessedWords] = useState([
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
  ]);

  const [statuses, setStatuses] = useState([ 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
  ]);

  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);

  const handleKeyPress = (letter) => {
    if (letter === '⌦' && currentColumn > 0) {
      const newGuessWords = [...guessedWords.map(row => [...row])]; 
      const newColumn = currentColumn - 1; 
      newGuessWords[currentRow][newColumn] = ''; 

    setGuessedWords(newGuessWords);
    setCurrentColumn(newColumn);
    }
    else if (currentColumn < 5 && letter != '⌦') {
      const newGuessWords = [...guessedWords];
      newGuessWords[currentRow][currentColumn] = letter;

      if (currentColumn === 4) {
        let word = createWordFromArray(guessedWords[currentRow]);
        let letterStatuses = checkUserGuess(word);

        if (letterStatuses.every(status => status === 'green'))
          setIsWinner(true);

        const newStatuses = statuses.map((row, rowIndex) => 
          rowIndex === currentRow ? letterStatuses : row
        );
        setStatuses(newStatuses);

        if (currentRow === 4)
          setIsGameOver(true);
      }
      setGuessedWords(newGuessWords);
      setCurrentColumn(currentColumn + 1);
      if (currentColumn === 4 && currentRow < 5) {
        setCurrentColumn(0);
        setCurrentRow(currentRow + 1);
      }
    }
  }

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.wordleText}>Wordle</Text>
        <Grid guessedWords={guessedWords} statuses={statuses} />
        <Keyboard onKeyPress={handleKeyPress} />
        <SuccessModal visible={isWinner} onRetry={handleRetry} />
        <FailureModal visible={isGameOver} onRetry={handleRetry} correctWord={correctWord} />
      </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A2A37', 
  },

  wordleText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 3,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 20,
  },

});
