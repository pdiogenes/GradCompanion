import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  Alert,
  AsyncStorage,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import Constants from "expo-constants";

import MainMaterias from "./components/MainMaterias";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import MateriaPage from "./components/MateriaPage";
import AtividadePage from "./components/AtividadePage";
import NewAtividade from "./components/NewAtividade";
import MainAtividades from "./components/MainAtividades";

export default function App() {
  const [materias, setMaterias] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [tela, setTela] = useState("materias");
  const [materiaAtual, setMateriaAtual] = useState("");
  const [atividadeAtual, setAtividadeAtual] = useState("");

  const carregarAtividades = async () => {
    try {
      const a = await AsyncStorage.getItem("atividades");
      console.log(`[DEBUG][34]: App -> carregarAtividades -> a`, a);
      console.log(
        `[DEBUG][36]: App -> carregarAtividades -> atividades`,
        atividades
      );
      if (a) {
        setAtividades(JSON.parse(a));
      }
      console.log(`[DEBUG][42]: App -> carregarAtividades -> a`, a);
      console.log(
        `[DEBUG][44]: App -> carregarAtividades -> atividades`,
        atividades
      );
    } catch (error) {
      Alert.alert("Erro ao carregar as atividades!");
      console.error("Error on carregarAtividades()", error);
    }
    console.log(atividades, materias);
  };

  const carregarMaterias = async () => {
    try {
      const m = await AsyncStorage.getItem("materias");
      console.log(`[DEBUG][57]: App -> carregarMaterias -> m`, m);
      console.log(`[DEBUG][58]: App -> carregarMaterias -> materias`, materias);
      if (m) {
        setMaterias(JSON.parse(m));
      }
      console.log(`[DEBUG][62]: App -> carregarMaterias -> m`, m);
      console.log(`[DEBUG][61]: App -> carregarMaterias -> materias`, materias);
    } catch (error) {
      Alert.alert("Erro ao carregar as materias!");
      console.error("Error on carregarMaterias()", error);
    }
    console.log(atividades, materias);
  };

  const salvarMaterias = async () => {
    try {
      await AsyncStorage.setItem("materias", JSON.stringify(materias));
    } catch (error) {
      Alert.alert("Erro ao salvar os materias!");
      console.error("Error on salvarMaterias()", error);
    }
  };

  const salvarAtividades = async () => {
    try {
      await AsyncStorage.setItem("atividades", JSON.stringify(atividades));
    } catch (error) {
      Alert.alert("Erro ao salvar as atividades!");
      console.error("Error on salvarAtividades()", error);
    }
  };

  useEffect(() => {
    carregarMaterias();
    carregarAtividades();
  }, []);

  useEffect(() => {
    salvarAtividades();
  }, [atividades]);

  useEffect(() => {
    salvarMaterias();
  }, [materias]);

  const selectMateria = (idMateria) => {
    let idm = materias.findIndex((materia) => materia.id == idMateria);
    setMateriaAtual(idm);
    setTela("atvMaterias");
  };

  const selectAtividade = (idAtividade) => {
    // alert(JSON.stringify(idAtividade));
    let ida = atividades.findIndex((atividade) => atividade.id == idAtividade);
    setAtividadeAtual(ida);
    setTela("atvDetails");
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

  const atualizaAtividade = (a) => {
    let lista = [...atividades];
    lista[atividadeAtual] = a;
    setAtividades(lista);
    setTela("atvMaterias");
  };

  const deletarAtividade = (id) => {
    Alert.alert("Deletar Atividade?", "isso vai deletar sua atividade...", [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: "OK",
        onPress: () => {
          const newAtividades = atividades.filter((a) => a.id !== id);
          setAtividades(newAtividades);
          setTela("materias"); // GAMBS XD
          setTela("atvMaterias");
        },
      },
    ]);
  };

  const deletarMateria = (id) => {
    Alert.alert(
      "Deletar Matéria?",
      "isso vai deletar todas as atividades dessa matéria...",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "OK",
          onPress: () => {
            const newAtividades = atividades.filter((a) => a.idMateria !== id);
            setAtividades(newAtividades);
            const newMaterias = materias.filter((m) => m.id !== id);
            setMaterias(newMaterias);
          },
        },
      ]
    );
  };

  const switchTela = () => {
    switch (tela) {
      case "materias":
        return (
          <MainMaterias
            materias={materias}
            onSelect={selectMateria}
            onAddMateria={adicionarMateria}
            onDelete={deletarMateria}
          />
        );
      case "atvMaterias":
        return (
          <MateriaPage
            materia={materias[materiaAtual]}
            atividades={atividades}
            onSelectAtividade={selectAtividade}
            onRetorno={retorna}
            onChangePage={setTela}
            onDelete={deletarAtividade}
          />
        );
      case "addAtiv":
        return (
          <NewAtividade
            onAddAtividade={adicionarAtividade}
            onRetorno={selectMateria}
            idMateria={materias[materiaAtual].id}
          />
        );
      case "atvDetails":
        return (
          <AtividadePage
            onChangePage={setTela}
            onRetorno={atualizaAtividade}
            idMateria={materias[materiaAtual].id}
            atividade={atividades[atividadeAtual]}
          />
        );
      case "atividades":
        return (
          <MainAtividades
            atividades={atividades}
            materias={materias}
            onRetorno={retorna}
            onChangePage={setTela}
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
        <Navbar estado={atividades.length} />
        <Menu switchTela={setTela} />
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
