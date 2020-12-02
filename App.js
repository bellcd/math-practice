import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const generateNumber = () => {
    return Math.floor(Math.random() * 10)
  };

  const generatePrompt = (first, second) => {
    return `${first} + ${second}`;
  };

  const [value, setValue] = useState('');
  const [first, setFirst] = useState(generateNumber());
  const [second, setSecond] = useState(generateNumber());
  const [prompt, setPrompt] = useState(generatePrompt(first, second));
  const [isCorrect, setIsCorrect] = useState(false);
  const [answer, setAnswer] = useState(0);

  useEffect(() => {
    setPrompt(generatePrompt(first, second))
  }, [first, second])

  useEffect(() => {
    setAnswer(first + second);
  }, [prompt])

  const handleSubmit = () => {
    // check if value is the answer to prompt
    if (Number(value) === answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    // regenerate prompt
    setFirst(generateNumber());
    setSecond(generateNumber());
  };


  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{prompt}</Text>
      <TextInput
        value={value}
        onChangeText={value => setValue(value)}
        style={styles.input}
      ></TextInput>
      <Button
        onPress={handleSubmit}
        title="submit"
      ></Button>
      <Text>{isCorrect ? 'correct' : 'try again!'}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent:
  },
  cell: {
    backgroundColor: 'powderblue',
    height: 100,
    width: 100
  },
  cellText: { // TODO: not sure why this is not working ...
    alignItems: 'center',
    justifyContent: 'center'
  },
  prompt: {
    fontSize: 50
  },
  input: {
    height: 40,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1
  }
});
