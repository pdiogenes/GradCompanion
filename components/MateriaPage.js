import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Atividades from "./Atividades";

const MateriaPage = (props) => {
  const ativs = props.atividades.filter(
    (atividade) => atividade.idMateria == props.materia.id
  );

  return (
    <React.Fragment>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btn} onPress={props.onRetorno}>
          <Text>Retornar</Text>
        </TouchableOpacity>

        <Text style={styles.headerNome}>{props.materia.nome}</Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => props.onClickAdd("addAtiv")}
        >
          <Text> + </Text>
        </TouchableOpacity>
      </View>

      <Atividades atividades={ativs} />
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
});

export default MateriaPage;
