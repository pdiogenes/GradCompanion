import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import Constants from "expo-constants";

import MainMaterias from "./components/MainMaterias";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import MateriaPage from "./components/MateriaPage";
import NewAtividade from "./components/NewAtividade";

export default function App() {
  const [materias, setMaterias] = useState([
    { id: "t1", nome: "Matéria 1" },
    { id: "t2", nome: "Matéria 2" },
    { id: "t3", nome: "Matéria 3" },
  ]);

  const [atividades, setAtividades] = useState([
    { id: "at1", nome: "Atividade da Matéria 1", idMateria: "t1", valor: "10" },
    { id: "at2", nome: "Atividade da Matéria 2", idMateria: "t2", valor: "10" },
    { id: "at3", nome: "Atividade da Matéria 3", idMateria: "t3", valor: "10" },
    {
      id: "at4",
      nome: "Atividade 2 da Matéria 3",
      idMateria: "t3",
      valor: "15",
    },
  ]);

  const [tela, setTela] = useState("materias");
  const [materiaAtual, setMateriaAtual] = useState("");

  const selectMateria = (idMateria) => {
    let idm = materias.findIndex((materia) => materia.id == idMateria);
    setMateriaAtual(idm);
    setTela("atvMaterias");
  };

  const retorna = () => {
    setMateriaAtual("");
    setTela("materias");
  };

  const adicionarMateria = (m) => {
    if (m.length > 0) {
      const nova = { id: Date.now().toString(), nome: m };
      setMaterias([...materias, nova]);
    } else Alert.alert("Você deve digitar o nome da matéria.");
  };

  const adicionarAtividade = (a) => {
    // adicionar checagem de campos
    setAtividades([...atividades, a]);
  };

  const switchTela = () => {
    switch (tela) {
      case "materias":
        return (
          <MainMaterias
            materias={materias}
            onSelect={selectMateria}
            onAddMateria={adicionarMateria}
          />
        );
      case "atvMaterias":
        return (
          <MateriaPage
            materia={materias[materiaAtual]}
            atividades={atividades}
            onRetorno={retorna}
            onClickAdd={setTela}
          />
        );
      case "addAtiv":
        return (
          <NewAtividade
            onAddAtividade={adicionarAtividade}
            onRetorno={retorna}
          />
        );
    }
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
        {switchTela()}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: "flex-start",
    backgroundColor: "#eeeeee",
  },
  app: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#303841",
  },
});
