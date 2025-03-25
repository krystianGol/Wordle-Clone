import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Tile from './Tile'

const Grid = ({ guessedWords, statuses }) => {
  
    return (
        <View style={styles.gridContainer}>
            
            {guessedWords.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                {row.map((letter, colIndex) => (
                    <Tile 
                      key={colIndex} 
                      letter={letter} 
                      status={statuses[rowIndex]?.[colIndex] || "empty"}
                      />
                ))}
                </View>
            ))}
            </View>
  );
};
    
const styles = StyleSheet.create({
    gridContainer: {
      marginVertical: 20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });
  


export default Grid