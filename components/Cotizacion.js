import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Cotizacion = ({ result }) => {
  if (Object.keys(result).length === 0) return null;
  return (
    <>
      <View style={styles.result}>
        <Text style={[styles.text, styles.price]}>
          <Text style={styles.span}>{result.PRICE}</Text>
        </Text>
        <Text style={styles.text}>
          Precio mas alto del dia:
          <Text style={styles.span}>{result.HIGHDAY}</Text>
        </Text>
        <Text style={styles.text}>
          Precio mas bajo del dia:
          <Text style={styles.span}>{result.LOWDAY}</Text>
        </Text>
        <Text style={styles.text}>
          Variacion ultimas 24hrs:
          <Text style={styles.span}>{result.CHANGEPCT24HOUR} %</Text>
        </Text>
        <Text style={styles.text}>
          Ultima Actualizacion: <Text style={styles.span}>{result.LASTUPDATE}</Text>
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  result: {
    backgroundColor: '#5E49E2',
    padding: 20,
  },
  text: {
    color: '#FFF',
    fontFamily: 'Lato-Regular',
    marginBottom: 10,
    fontSize: 18,
  },
  price: {
    fontSize: 38,
  },
  span: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Cotizacion;
