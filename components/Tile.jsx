import { View, StyleSheet, Text, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';

const Tile = ({ letter, status }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (letter) {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();
    }
  }, [letter]);

  const tileStyles = [
    styles.tile,
    status === "green" && styles.greenTile,
    status === "orange" && styles.orangeTile,
    status === "gray" && styles.grayTile,
    { transform: [{ scale: scaleAnim }] }
  ];

  return (
    <Animated.View style={tileStyles}>
      <Text style={styles.letter}>{letter.toUpperCase()}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 55,
    height: 55,
    borderRadius: 8,
    borderWidth: 3,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E2A38',
    borderColor: '#555',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
  },
  
  greenTile: {
    backgroundColor: "#4CAF50",
    borderColor: "#388E3C",
  },
  
  orangeTile: {
    backgroundColor: "#FF9800",
    borderColor: "#F57C00",
  },
  
  grayTile: {
    backgroundColor: "#BDBDBD",
    borderColor: "#757575",
  },
  
  letter: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default Tile;
