import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

import DatePicker from "react-native-datepicker";

// Componente que representa o formulário de inserção da nova atividade.
const NewAtividade = (props) => {
  const [nome, setNome] = useState("");
  const [desc, setDescp] = useState("");
  const [valor, setValor] = useState("");

  // essa função inicializa uma data para o input do tipo data
  const inicializaData = () => {
    let d = new Date();
    d.setDate(d.getDate() > 0 ? d.getDate() - 1 : d.getDate());
    return d;
  };
  const [data, setData] = useState(inicializaData());

  // Valida os dados ao criar uma atividade
  const dadosSaoValidos = () => {
    if (nome.length <= 0) {
      Alert.alert("Atividade precisa de nome!");
      return false;
    }
    if (desc.length <= 0) {
      Alert.alert("Atividade precisa de descrição!");
      return false;
    }
    if (new Date(data).getTime() <= Date.now()) {
      Alert.alert("Data está errada!");
      return false;
    }
    if (valor.length <= 0) {
      Alert.alert("Atividade precisa de valor!");
      return false;
    }
    return true;
  };

  // Salva a atividade, caso os dados sejam válidos
  const tentarSalvar = () => {
    if (dadosSaoValidos()) {
      let a = {
        id: Date.now().toString(),
        nome: nome,
        valor: valor,
        data: new Date(data),
        desc: desc,
        idMateria: props.idMateria,
      };
      console.log(a);
      props.onAddAtividade(a);
      props.onRetorno(props.idMateria);
    }
  };

  return (
    <KeyboardAvoidingView>
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
          value={desc}
          onChangeText={(descp) => setDescp(descp)}
        />
      </View>
      <View style={[styles.fieldBox, styles.dateBox]}>
        <Text>Data de entrega: </Text>
        <DatePicker
          style={styles.datePicker}
          date={data}
          onDateChange={setData}
        />
      </View>

      <View style={styles.fieldBox}>
        <TextInput
          style={styles.field}
          value={valor}
          onChangeText={(valor) => setValor(valor)}
          keyboardType={"number-pad"}
          maxLength={3}
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
            tentarSalvar();
          }}
        >
          <Text>Adicionar Atividade</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  datePicker: {
    flex: 1,
  },
  dateBox: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default NewAtividade;
