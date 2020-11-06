import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import Materias from "./Materias";
const Main = (props) => {
  const [field, setField] = useState("");
  let _input;

  return (
    <React.Fragment>
      <Materias onSelect={props.onSelect} listaMaterias={props.materias} />
      <View style={styles.fieldBox}>
        <TextInput
          style={styles.field}
          placeholder="Nova Matéria"
          defaultValue={field}
          onChangeText={(field) => setField(field)}
          onSubmitEditing={() => {
            props.onAddMateria(field);
            setField("");
            _input.blur();
          }}
          onBlur={Keyboard.dismiss}
          ref={(r) => {
            _input = r;
          }}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            props.onAddMateria(field);
            setField("");
            _input.blur();
          }}
        >
          <Text>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
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

export default Main;
