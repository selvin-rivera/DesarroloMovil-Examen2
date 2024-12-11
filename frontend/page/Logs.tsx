import { View, Text, Alert, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import api from '../service/api';  // Asegúrate de que api esté configurado correctamente.
import { Logs } from '../modelo/Logs';  // Tu modelo de Logs.

export default function LogsScreen() {
  const [logs, setLogs] = useState<Logs[]>([]);  // Estado para almacenar los logs.
  const [positionX, setPositionX] = useState<number>(0); // Para controlar la posición X.
  const [positionY, setPositionY] = useState<number>(0); // Para controlar la posición Y.
  const [fecha, setFecha] = useState<Date>(new Date()); // Fecha actualizada como Date.
  
  // Función para obtener los logs desde la API
  const getLogs = async () => {
    try {
      const response = await api.get('logs');  // Cambia el endpoint a 'logs'.
      setLogs(response.data); // Asumiendo que los logs vienen en 'response.data'.
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener los logs: ' + error);
    }
  };

  
  
  // Llamada inicial para obtener los logs
  useEffect(() => {
    getLogs();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Logs</Text>

      <FlatList
        data={logs}
        keyExtractor={(item: Logs) => item.IdLog.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>ID Log: {item.IdLog}</Text>
            <Text>Posición X: {item.postitionX}</Text>
            <Text>Posición Y: {item.positionY}</Text>
            <Text>Fecha: {item.fecha}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 5,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
