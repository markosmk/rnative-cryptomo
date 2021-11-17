import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
// Components
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';

export default function App() {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [reqApi, setReqApi] = useState(false);
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cotizarCripto = async () => {
      if (reqApi) {
        setLoading(true);
        // consultamos la api para obtener la cotizacion
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const result = await axios.get(url);

        // Ocultando el loader y mostrar data
        // setTimeout(() => {
        setResult(result.data.DISPLAY[criptomoneda][moneda]);
        setReqApi(false); // para poder volver a consultar la api
        setLoading(false);
        // }, 3000);
      }
    };
    cotizarCripto();
  }, [reqApi]);

  const loader = loading ? (
    <ActivityIndicator size="large" color="#5E49E2" />
  ) : (
    <Cotizacion result={result} />
  );

  return (
    <>
      <ScrollView>
        <Header />

        <Image style={styles.image} source={require('./assets/img/cryptomonedas.png')} />

        <View style={styles.content}>
          <Formulario
            moneda={moneda}
            criptomoneda={criptomoneda}
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
            setReqApi={setReqApi}
            loading={loading}
          />
        </View>
        <View style={styles.loader}>{loader}</View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  content: {
    marginHorizontal: '2.5%',
  },
  loader: {
    marginTop: 20,
  },
});
