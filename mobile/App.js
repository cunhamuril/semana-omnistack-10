import React from 'react';
import { StatusBar, YellowBox } from "react-native";

import Routes from './src/routes'

// Ignorar tela de warning warning do websocket que aparece no app
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

export default function App() {
  return (
    <>
      {/* Configurações da barra de status do dispositivo */}
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Routes />
    </>
  );
}