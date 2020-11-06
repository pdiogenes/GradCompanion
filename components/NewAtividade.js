import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
const NewAtividade = (props) => {
  return (
    <View>
      <TextInput />
      <TextInput />
      <TextInput />
      <TextInput />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          let a = {
            id: "teste1",
            nome: "tests1",
            valor: "10",
            idMateria: "t1",
          };
          props.onAddAtividade(a);
          props.onRetorno();
        }}
      >
        <Text>LOULE!</Text>
      </TouchableOpacity>
    </View>
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

export default NewAtividade;
