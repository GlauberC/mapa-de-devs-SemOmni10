import React, { useState, useEffect } from "react";
import { Marker, Callout } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";

import {
  MapContainer,
  Mark,
  ImgDev,
  ViewCallOut,
  TextName,
  TextBio,
  TextTechs,
  ViewForm,
  Input,
  Btn
} from "./styles";

import api from "../../services/api";

export default function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState("");

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });
        const { latitude, longitude } = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }
    // loadInitialPosition(); // Não funciona no emulador
    setCurrentRegion({
      latitude: -5.8151849,
      longitude: -35.2166317,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04
    });
  }, []);

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;
    const response = await api.get("/search", {
      params: {
        latitude,
        longitude,
        techs
      }
    });
    setDevs(response.data);
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapContainer
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
      >
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1]
            }}
          >
            <ImgDev
              source={{
                uri: dev.avatar_url
              }}
            />
            <Callout
              onPress={() =>
                navigation.navigate("Profile", {
                  github_username: dev.github_username
                })
              }
            >
              <ViewCallOut>
                <TextName>{dev.name}</TextName>
                <TextBio>{dev.bio}</TextBio>
                <TextTechs>{dev.techs.join(", ")}</TextTechs>
              </ViewCallOut>
            </Callout>
          </Marker>
        ))}
      </MapContainer>
      <ViewForm>
        <Input
          placeholder='Buscar devs por tecnologias...'
          placeholderTextColor='#999'
          autoCapitalize='words'
          autoCorrect={false}
          value={techs}
          onChangeText={text => setTechs(text)}
        />
        <Btn onPress={loadDevs}>
          <MaterialIcons name='my-location' size={20} color='#fff' />
        </Btn>
      </ViewForm>
    </>
  );
}
