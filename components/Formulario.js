import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({
  moneda,
  criptomoneda,
  setMoneda,
  setCriptomoneda,
  setReqApi,
  loading,
}) => {
  const [criptos, setCriptos] = useState([]);

  // para mostrar la lista de los criptos mas usados
  useEffect(() => {
    const requestApi = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const result = await axios.get(url);
      setCriptos(result.data.Data);
    };
    requestApi();
  }, []);

  const cotizarPrice = () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      showAlert();
      return;
    }
    // pasa la validacion
    setReqApi(true);
  };

  const showAlert = () => {
    Alert.alert('Error...', 'Ambos campos son obligatorios', [{ text: 'OK' }]);
  };

  return (
    <>
      <View>
        <Text style={styles.label}>Moneda</Text>
        <Picker selectedValue={moneda} onValueChange={(item) => setMoneda(item)}>
          <Picker.Item label="- Seleccione -" value="" />
          <Picker.Item label="Dolar Estados Unidos" value="USD" />
          <Picker.Item label="Peso Mexicano" value="MXN" />
          <Picker.Item label="Peso Argentino" value="ARS" />
          <Picker.Item label="Euro" value="EUR" />
        </Picker>
        <Text style={styles.label}>Criptomoneda</Text>

        <Picker
          selectedValue={criptomoneda}
          onValueChange={(item) => setCriptomoneda(item)}
        >
          <Picker.Item label="- Seleccione -" value="" />
          {criptos?.map((cripto) => {
            const { Id, Name, FullName } = cripto.CoinInfo;
            return <Picker.Item key={Id} label={FullName} value={Name} />;
          })}
        </Picker>

        <TouchableHighlight
          style={styles.btnCotizar}
          onPress={() => cotizarPrice()}
          disabled={loading}
        >
          <Text style={styles.btnText}>Cotizar</Text>
        </TouchableHighlight>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
    borderRadius: 25,
  },
  btnText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default Formulario;
