import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const NewAtividade = (props) => {
  const [nome, setNome] = useState("");
  const [descp, setDescp] = useState(""); // DESCULPA !!
  const [valor, setValor] = useState("");

  return (
    <View>
      <Text style={styles.textHeader}>Adicionar Atividade</Text>
      <View style={styles.fieldBox}>
        <TextInput
          placeholder={"Nome da atividade"}
          style={styles.field}
          value={nome}
          onChangeText={(nome) => setNome(nome)}
        />
      </View>
      <View style={styles.fieldBox}>
        <TextInput
          placeholder={"Descrição da atividade"}
          style={styles.field}
          value={descp}
          onChangeText={(descp) => setDescp(descp)}
        />
      </View>
      <View style={styles.fieldBox}>
        <TextInput style={styles.field} placeholder={"Data de entrega"} />
      </View>
      <View style={styles.fieldBox}>
        <TextInput
          style={styles.field}
          value={valor}
          onChangeText={(valor) => setValor(valor)}
          placeholder={"Valor da atividade"}
        />
      </View>
      <View style={styles.btnArea}>
        <TouchableOpacity
          style={[styles.btnCancelar, styles.btn]}
          onPress={() => {
            props.onRetorno(props.idMateria);
          }}
        >
          <Text>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnAdicionar, styles.btn]}
          onPress={() => {
            let a = {
              id: Date.now().toString(),
              nome: nome,
              valor: valor,
              descp,
              idMateria: props.idMateria,
            };
            props.onAddAtividade(a);
            props.onRetorno(props.idMateria);
          }}
        >
          <Text>Adicionar Atividade</Text>
        </TouchableOpacity>
      </View>
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
  btnArea: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  textHeader: {
    fontSize: 20,
    textAlign: "center",
    padding: 15,
  },
  btnCancelar: {
    flex: 1,
    backgroundColor: "#d9534f",
  },
  btnAdicionar: {
    flex: 1,
    backgroundColor: "#5cb85c",
  },
});

export default NewAtividade;
