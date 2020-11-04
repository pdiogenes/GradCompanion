import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import Materias from "./components/Materias";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";

export default function App() {
  const [materias, setMaterias] = useState([
    { id: "t1", nome: "Matéria 1" },
    { id: "t2", nome: "Matéria 2" },
    { id: "t3", nome: "Matéria 3" },
  ]);

  const [field, setField] = useState("");
  let _input;
  const adicionarMateria = (m) => {
    if (m.length > 0) {
      const nova = { id: Date.now().toString(), nome: m };
      setMaterias([...materias, nova]);
      setField("");
      _input.blur();
    } else Alert.alert("Você deve digitar o nome da matéria.");
  };

  return (
    <KeyboardAvoidingView
      style={styles.app}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />
      <View style={styles.container}>
        <Navbar estado={`${materias.length}`} />
        <Menu />
        <Materias listaMaterias={materias} />
        <View style={styles.fieldBox}>
          <TextInput
            style={styles.field}
            placeholder="Nova Matéria"
            defaultValue={field}
            onChangeText={(field) => setField(field)}
            onSubmitEditing={() => adicionarMateria(field)}
            onBlur={Keyboard.dismiss}
            ref={(r) => {
              _input = r;
            }}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => adicionarMateria(field)}
          >
            <Text>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  app: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#303841",
  },
  container: {
    flexDirection: "column",
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: "space-evenly",
    backgroundColor: "#eeeeee",
  },
  fieldBox: {
    margin: 15,
    height: 50,
    flexDirection: "row",
  },
  field: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
    flex: 1,
  },
  btn: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#bbbfca",
  },
});
