import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import DatePicker from "react-native-datepicker";

// Componente para edição da Atividade selecionada
const AtividadePage = (props) => {
  console.log("props -> AtividadePage", props);
  const [nome, setNome] = useState(props.atividade.nome);
  const [descricao, setDesc] = useState(props.atividade.desc);
  const [valor, setValor] = useState(props.atividade.valor);
  const [data, setData] = useState(new Date(props.atividade.data));

  const [editNome, setEditNome] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [editValor, setEditValor] = useState(false);
  const [editData, setEditData] = useState(false);

  // Edita o nome e desativa o campo de edição
  const editarNome = (n) => {
    console.log(n);
    setNome(n);
    setEditNome(false);
  };

  // Edita a descrição e desativa o campo de edição
  const editarDesc = (desc) => {
    setEditDesc(false);
    setDesc(desc);
  };

  // Edita o valor e desativa o campo de edição
  const editarValor = (valor) => {
    setEditValor(false);
    setValor(valor);
  };

  // Verifica os dados e solta um alerta de acordo com o campo inválido.
  const dadosSaoValidos = () => {
    if (nome.length <= 0) {
      Alert.alert("Atividade precisa de nome!");
      return false;
    }
    if (descricao.length <= 0) {
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

  // Se os dados forem salvos, salva e volta para a pagina das atividades da Matéria selecionada.
  const tentarSalvar = () => {
    if (dadosSaoValidos()) {
      const a = {
        ...props.atividade,
        valor,
        nome,
        desc: descricao,
        data: data,
      };
      props.onRetorno(a);
    }
  };

  return (
    <KeyboardAvoidingView>
      {editNome ? (
        <View style={styles.fieldBox}>
          <TextInput
            placeholder={"Nome da atividade"}
            style={styles.field}
            defaultValue={nome}
            onChangeText={(n) => setNome(n)}
            onBlur={() => editarNome(nome)}
            onSubmitEditing={() => editarNome(nome)}
          />
        </View>
      ) : (
        <View style={styles.fieldBox}>
          <Text style={styles.field}>{nome}</Text>
          <TouchableOpacity
            style={styles.btnEditar}
            onPress={() => setEditNome(true)}
          >
            <Text>Editar</Text>
          </TouchableOpacity>
        </View>
      )}
      {editDesc ? (
        <View style={styles.fieldBox}>
          <TextInput
            placeholder={"Descrição da Atividade"}
            style={styles.field}
            defaultValue={descricao}
            onChangeText={(d) => setDesc(d)}
            onBlur={() => editarDesc(descricao)}
            onSubmitEditing={() => editarDesc(descricao)}
          />
        </View>
      ) : (
        <View style={styles.fieldBox}>
          <Text style={styles.field}>{descricao ? descricao : null}</Text>
          <TouchableOpacity
            style={styles.btnEditar}
            onPress={() => setEditDesc(true)}
          >
            <Text>Editar</Text>
          </TouchableOpacity>
        </View>
      )}
      {editData ? (
        <View style={[styles.fieldBox, styles.dateBox]}>
          <Text>Data de entrega: </Text>
          <DatePicker
            style={styles.datePicker}
            date={data}
            onDateChange={setData}
          />
        </View>
      ) : (
        <View style={styles.fieldBox}>
          <Text style={styles.field}>
            {data.getDate()}/{data.getMonth() + 1}/{data.getFullYear()}
          </Text>
          <TouchableOpacity
            style={styles.btnEditar}
            onPress={() => setEditData(true)}
          >
            <Text>Editar</Text>
          </TouchableOpacity>
        </View>
      )}
      {editValor ? (
        <View style={styles.fieldBox}>
          <TextInput
            placeholder={"Valor da atividade"}
            style={styles.field}
            defaultValue={valor}
            onChangeText={(v) => setValor(v)}
            keyboardType={"number-pad"}
            maxLength={3}
            onBlur={() => editarValor(valor)}
            onSubmitEditing={() => editarValor(valor)}
          />
        </View>
      ) : (
        <View style={styles.fieldBox}>
          <Text style={styles.field}>{valor}</Text>
          <TouchableOpacity
            style={styles.btnEditar}
            onPress={() => setEditValor(true)}
          >
            <Text>Editar</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.btnArea}>
        <TouchableOpacity
          style={[styles.btnCancelar, styles.btn]}
          onPress={() => {
            tentarSalvar();
          }}
        >
          <Text>Voltar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  btnCancelar: {
    flex: 1,
    backgroundColor: "#d9534f",
  },
  btnEditar: {
    borderColor: "#eFc73C",
    backgroundColor: "#FFE74C50",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    borderRadius: 10,
    padding: 15,
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

export default AtividadePage;
