import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Callout } from "react-native-maps";
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api'

function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState('')

  useEffect(() => {
    /**
     * Função responsável por carregar a posição inicial no mapa
     */
    async function loadInitialPosition() {
      // granted é a permissão do usuário, para poder pegar a localização atual
      const { granted } = await requestPermissionsAsync()

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true, // pegar localização pelo GPS
          // Se for false, vai pegar localização via Wi-Fi ou rede móvel
        })

        const { latitude, longitude } = coords

        setCurrentRegion({
          latitude,
          longitude,
          // Calculos navais para determinar o zoom do mapa
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        })
      }
    }

    loadInitialPosition()
  }, []);

  // Chamada a API
  async function loadDevs() {
    const { latitude, longitude } = currentRegion

    const response = await api.get('/search', {
      params: { latitude, longitude, techs }
    })

    setDevs(response.data.devs)
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region)
  }

  // Se não tiver nenhuma posição definida, não retorna nada, apenas uma tela em branco
  if (!currentRegion) {
    return null
  }

  return (
    <>
      <MapView
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
        style={styles.map}
      >
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              latitude: dev.location.coordinates[1],
              longitude: dev.location.coordinates[0]
            }}
          >
            <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />

            <Callout onPress={() => {
              // navegação
              // 1º parâmetro: tela que vai navegar
              // 2º parâmetro: dados
              navigation.navigate('Profile', { github_username: dev.github_username })
            }}>
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words" // cada palavra começa com letra maiúscula
          autoCorrect={false} // não corrigir texto
          value={techs}
          // poderia ser assim: onChangeText={text => setTechs(text)}
          // mas pode ser assim também:
          onChangeText={setTechs}
        />
        <TouchableOpacity onPress={() => loadDevs()} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1 // Ocupar toda a tela
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FFF'
  },

  callout: {
    width: 260,
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  devBio: {
    color: '#666',
    marginTop: 5,
  },

  devTechs: {
    marginTop: 5,
  },

  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row'
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4DFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  }
})

export default Main;
