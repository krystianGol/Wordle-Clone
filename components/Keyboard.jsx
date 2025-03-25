import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('window').width;
const keyPadding = 4; 
const keyboardWidth = screenWidth * 0.95; 
const keySize = (keyboardWidth / 10) - keyPadding; 

const letters = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const ButtonWithLetter = ({ letter, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.key, style, { width: keySize, height: keySize }]} onPress={() => onPress(letter)}>
      <Text style={styles.keyText}>{letter}</Text>
    </TouchableOpacity>
  );
};

const Keyboard = ({ onKeyPress }) => {
  return (
    <View style={styles.keyboardContainer}>
      {letters.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((letter) => (
            <ButtonWithLetter key={letter} letter={letter} onPress={onKeyPress} />
          ))}
        </View>
      ))}
      {/* DELETE BUTTON ON ITS OWN ROW */}
      <View style={styles.row}>
        <ButtonWithLetter style={styles.deleteButton} key={'⌦'} letter={'⌦'} onPress={onKeyPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    width: keyboardWidth,  
    alignItems: 'center',
    marginTop: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 6,
  },

  key: {
    backgroundColor: '#243B55',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginHorizontal: keyPadding / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  keyText: {
    color: '#E0E0E0',
    fontSize: 22,
    fontWeight: '600',
  },

  deleteButton: {
    backgroundColor: '#E63946',
    width: keySize * 1.5, 
    height: keySize,  
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
});

export default Keyboard;
