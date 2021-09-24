import React from "react";
import { Text, StyleSheet, View, TouchableHighlight } from "react-native";
const Reserva = ({ item, eliminarCliente }) => {
  const dialogoEliminar = (id) => {
    console.log("eliminando....", id);
    eliminarCliente(id);
  };
  return (
    <View style={styles.reserva}>
      <View>
        <Text style={styles.label}>Nombre del cliente: </Text>
        <Text style={styles.texto}>{item.cliente}</Text>
      </View>
      <View>
        <Text style={styles.label}>Fecha: </Text>
        <Text style={styles.texto}>{item.fecha}</Text>
      </View>
      <View>
        <Text style={styles.label}>Hora: </Text>
        <Text style={styles.texto}>{item.hora}</Text>
      </View>
      <View>
        <Text style={styles.label}>Cantidad: </Text>
        <Text style={styles.texto}>{item.cantidad}</Text>
      </View>
      <View>
        <Text style={styles.label}>Tipo de sección: </Text>
        <Text style={styles.texto}>{item.seccion}</Text>
      </View>
      <View>
        <TouchableHighlight
          onPress={() => dialogoEliminar(item.id)}
          style={styles.btnEliminar}
        >
          <Text style={styles.textoEliminar}> Eliminar &times; </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  reserva: {
    backgroundColor: "#f0ebeb",
    borderBottomColor: "#e1e1e1",
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  texto: {
    fontSize: 18,
    padding:10,
  },
  btnEliminar: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: "red",
    marginVertical: 10,
  },
  textoEliminar: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default Reserva;
