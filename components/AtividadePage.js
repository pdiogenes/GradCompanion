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

const AtividadePage = (props) => {
  // alert(JSON.stringify(props));
  const [nome, setNome] = useState(props.atividade.nome);
  const [descricao, setDesc] = useState(props.atividade.descp); // DESCULPA !!
  const [valor, setValor] = useState(props.atividade.valor);

  const [editNome, setEditNome] = useState(false);
  const [editDesc, setEditDesc] = useState(false); // DESCULPA !!
  const [editValor, setEditValor] = useState(false);

  const editarNome = (n) => {
    // alert(n);
    console.log(n);
    setNome(n);
    setEditNome(false);
  };

  const editarDesc = (desc) => {
    setEditDesc(false);
    setDesc(desc);
  };

  const editarValor = (valor) => {
    setEditValor(false);
    setValor(valor);
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
      <View style={styles.fieldBox}>
        <TextInput style={styles.field} placeholder={"Data de entrega"} />
      </View>
      {editValor ? (
        <View style={styles.fieldBox}>
          <TextInput
            placeholder={"Valor da atividade"}
            style={styles.field}
            defaultValue={valor}
            onChangeText={(v) => setValor(v)}
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
            // voltar passando o obj atualizado
            const a = {
              ...props.atividade,
              valor,
              nome,
              descp: descricao,
            };
            props.onRetorno(a);
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
});

export default AtividadePage;
