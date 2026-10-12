import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseConfig';

const SPOTS = ['Thomas Cooper Library', 'Russell House', 'Molinaroli College of Engineering and Computing'];

function getTime(checkin) {
  return checkin.createdAt ? checkin.createdAt.toMillis() : Date.now();
}

export default function App() {
  const [name, setName] = useState('');
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'checkins'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCheckins(data);
    });
    return unsubscribe;
  }, []);

  async function handleCheckIn(spot) {
    try {
      await addDoc(collection(db, 'checkins'), {
        name: name,
        spot: spot,
        createdAt: serverTimestamp(),
      });
      Alert.alert('Checked In', `${name} checked in at ${spot}`);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
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

      {SPOTS.map((spot) => {
        const spotCheckins = checkins
          .filter((c) => c.spot === spot)
          .sort((a, b) => getTime(b) - getTime(a));
        const recent = spotCheckins.slice(0, 5);

        return (
          <View key={spot} style={styles.card}>
            <Text style={styles.spotName}>{spot}</Text>
            <Text style={styles.count}>Check-ins: {spotCheckins.length}</Text>

            {recent.length === 0 ? (
              <Text style={styles.name}>No check-ins yet</Text>
            ) : (
              recent.map((c) => (
                <Text key={c.id} style={styles.name}>• {c.name}</Text>
              ))
            )}

            <View style={styles.buttonSpacing}>
              <Button title="Check In" onPress={() => handleCheckIn(spot)} />
            </View>
          </View>
        );
      })}

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
    marginBottom: 5,
  },
  count: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    marginLeft: 5,
  },
  buttonSpacing: {
    marginTop: 10,
  },
});
