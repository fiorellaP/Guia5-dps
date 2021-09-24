import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from "shortid";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import colors from "../src/utils/colors";
const Formulario = ({
  reservas,
  setReservas,
  guardarMostrarForm,
  guardarReservasStorage,
}) => {

    var radio_props = [
      { label: "Fumadores", value: "Fumadores" },
      { label: "No fumadores", value: "No fumadores" },
    ];


  //variables para el formulario
  const [cliente, guardarCliente] = useState("");
  const [fecha, guardarFecha] = useState("");
  const [hora, guardarHora] = useState("");
  const [cantidad, guardarCantidad] = useState("");
  const [seccion, guardarSeccion] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const confirmarFecha = (date) => {
    const opciones = { year: "numeric", month: "long", day: "2-digit" };
    guardarFecha(date.toLocaleDateString("es-ES", opciones));
    hideDatePicker();
  };
  // Muestra u oculta el Time Picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const confirmarHora = (hora) => {
    const opciones = { hour: "numeric", minute: "2-digit", hour12: false };
    guardarHora(hora.toLocaleString("es-ES", opciones));
    hideTimePicker();
  };
  // Crear nueva cita
  const crearNuevaReserva = () => {
    // Validar
    if (
      cliente.trim() === "" ||
      cantidad.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" 
    ) {
      // Falla la validación
      mostrarAlerta();
      return;
    }
    // Crear una nueva cita
    const reserva = { cliente, fecha, hora, cantidad, seccion };
    reserva.id = shortid.generate();
    // console.log(cita);
    // Agregar al state
    const reservasNuevo = [...reservas, reserva];
    setReservas(reservasNuevo);
    // Pasar las nuevas citas a storage
    guardarReservasStorage(JSON.stringify(reservasNuevo));
    // Ocultar el formulario
    guardarMostrarForm(false);
    // Resetear el formulario
    guardarCliente("");
    guardarCantidad("");
    guardarSeccion("");
    guardarHora("");
    guardarFecha("");
  };
  // Muestra la alerta si falla la validación
  const mostrarAlerta = () => {
    Alert.alert(
      "Error", // Titulo
      "Todos los campos son obligatorios", // mensaje
      [
        {
          text: "OK", // Arreglo de botones
        },
      ]
    );
  };
  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Nombre del cliente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => guardarCliente(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Cantidad de personas:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => guardarCantidad(texto)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.label}>Sección:</Text>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            onPress={(label) => { guardarSeccion(label) }}
          />
        </View>
        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
            headerTextIOS="Elige la fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{fecha}</Text>
        </View>
        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale="es_ES"
            headerTextIOS="Elige una Hora"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{hora}</Text>
        </View>

        <View>
          <TouchableHighlight
            onPress={() => crearNuevaReserva()}
            style={styles.btnSubmit}
          >
            <Text style={styles.textoSubmit}>Reservar</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  formulario: {
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    padding:10,
    borderColor: "#e1e1e1",
    borderWidth: 1,
    borderStyle: "solid",
  },
  btnSubmit: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: colors.BUTTON_COLOR,
    marginVertical: 10,
  },
  textoSubmit: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default Formulario;
