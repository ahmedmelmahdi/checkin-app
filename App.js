import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// The three study spots shown in the app
const SPOTS = ['Thomas Cooper Library', 'Russell House', 'Molinaroli College of Engineering and Computing'];

export default function App() {
  // Stores whatever the user types in the name box
  const [name, setName] = useState('');

  // Runs when the user taps Check In on a spot
  function handleCheckIn(spot) {
    Alert.alert('Check In', `${name} checked in at ${spot}`);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>StudySpot Check-In</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {SPOTS.map((spot) => (
        <View key={spot} style={styles.card}>
          <Text style={styles.spotName}>{spot}</Text>
          <Button title="Check In" onPress={() => handleCheckIn(spot)} />
        </View>
      ))}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  spotName: {
    fontSize: 18,
    marginBottom: 10,
  },
});
