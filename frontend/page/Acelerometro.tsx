import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Accelerometer } from 'expo-sensors';
import api from '../service/api';

export default function Acelerometro() {
  
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0
  });

  const [pocisionBalon, setPocisionBalon] = useState({
    x: 150,
    y: 300,
    z: 100

  });

  const [colorBalon, setColorBalon] = useState('blue');

  const postLogs = async () => {
    const postitionX = pocisionBalon.x;
    const positionY = pocisionBalon.y
    const fecha = new Date().toISOString().split('T')[0];
    try {
      const response = await api.post('logs', {
        postitionX,
        positionY,
        fecha,
      });
      
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar el log: ' + error);
    }
  };

  const updatePosicionBalon = ({ x, y }: any) => {
    setPocisionBalon((prev) => {
      const ejeX = Math.min(Math.max(prev.x + x * 10, 0), 300);
      const ejeY = Math.min(Math.max(prev.y + y * 10, 0), 600);
      
      // Cambiar el color aleatoriamente si X o Y cambian
      if (ejeX !== prev.x || ejeY !== prev.y) {
        setColorBalon(
          `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
        );
      }

      return { x: ejeX, y: ejeY, z: prev.z };
    });
  };

    
  useEffect(() => {
    //plugin acelerometro

    const suscription = Accelerometer.addListener((acelerometroData) => {
      //console.log(acelerometroData)

      setData(acelerometroData);
      updatePosicionBalon(acelerometroData)
        
    });

    Accelerometer.setUpdateInterval(15)//Intervalo de actualizacion

    return () => suscription.remove()


  }, [])

  useEffect(() => {
    if (pocisionBalon) {
      postLogs()
    }
  },[pocisionBalon])

  return (
    <View style={style.container}>
      
      <View style={[
            style.balon,
            {
            left: pocisionBalon.x,
            top: pocisionBalon.y,
            backgroundColor: colorBalon, // Aplicar color dinámico
          },
        ]
      
      }>

      </View>

      <Text style={style.texto}>Mover el dispositivo para ver efecto</Text>

    </View>
  )
}

const style = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent: 'center',
        position:'relative'
    },
    balon:{
        position:'absolute',
        width:50,
        height:50,
        backgroundColor:'blue',
        borderRadius:25
    },
    texto:{
        position:'absolute',
        bottom:50,
        fontSize:16,
        fontWeight:'bold'
    }


})