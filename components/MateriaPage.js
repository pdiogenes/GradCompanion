import React, { useState, useEffect } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import Atividades from "./Atividades";

const MateriaPage = (props) => {
  const ativs = props.atividades.filter(
    (atividade) => atividade.idMateria == props.materia.id
  );

  ativs.sort((a, b) => {
    let c = new Date(a.data);
    let d = new Date(b.data);
    return c - d;
  });

  const [ordenacao, setOrdenacao] = useState(false);

  const [vetor, setVetor] = useState(ativs);

  const ordernarAtividades = () => {
    let ordered;
    if (ordenacao) {
      ordered = vetor.sort((a, b) => {
        let c = new Date(a.data);
        let d = new Date(b.data);
        return c - d;
      });
    } else {
      ordered = vetor.sort((a, b) => {
        let c = a.valor;
        let d = b.valor;
        return c - d;
      });
    }
    setVetor(ordered);
  };

  return (
    <React.Fragment>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btn} onPress={props.onRetorno}>
          <Text>Retornar</Text>
        </TouchableOpacity>

        <Text style={styles.headerNome}>{props.materia.nome}</Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => props.onChangePage("addAtiv")}
        >
          <Text> + </Text>
        </TouchableOpacity>
      </View>

      <Atividades
        atividades={vetor}
        onChangePage={props.onChangePage}
        onSelectAtividade={props.onSelectAtividade}
        onDelete={props.onDelete}
      />
      <View style={styles.switch}>
        <Text>Ordenar por Data</Text>

        <Switch
          onChange={() => {
            setOrdenacao(!ordenacao);
            ordernarAtividades();
          }}
          value={ordenacao}
        />
        <Text>Ordenar por Valor</Text>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  headerNome: {
    flex: 2,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  btn: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#bbbfca",
  },
  switch: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default MateriaPage;
