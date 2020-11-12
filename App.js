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

  // tenta carregar a lista de atividades
  const carregarAtividades = async () => {
    let carregou = false;
    try {
      const a = await AsyncStorage.getItem("atividades");
      console.log(`[DEBUG][34]: App -> carregarAtividades -> a`, a);
      console.log(
        `[DEBUG][36]: App -> carregarAtividades -> atividades`,
        atividades
      );
      if (a) {
        setAtividades(JSON.parse(a));
        let data = new Date();
        data.setDate(data.getDate() + 2);
        let c = 0;
        JSON.parse(a).forEach((at) => {
          let d = new Date(at.data);
          if (
            new Date().getTime() < d.getTime() &&
            d.getTime() < data.getTime()
          ) {
            c = c + 1;
          }
        });
        if (c > 0) {
          Alert.alert(
            `Próximas atividades`,
            `Existem ${c} atividades a serem entregues em 2 dias!`
          );
        }
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

    if (carregou) {
    }

    console.log(atividades, materias);
  };

  // tenta carregar a lista de matérias
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

  // tenta salvar as matérias
  const salvarMaterias = async () => {
    try {
      await AsyncStorage.setItem("materias", JSON.stringify(materias));
    } catch (error) {
      Alert.alert("Erro ao salvar os materias!");
      console.error("Error on salvarMaterias()", error);
    }
  };

  // tenta salvar as atividades
  const salvarAtividades = async () => {
    try {
      await AsyncStorage.setItem("atividades", JSON.stringify(atividades));
    } catch (error) {
      Alert.alert("Erro ao salvar as atividades!");
      console.error("Error on salvarAtividades()", error);
    }
  };

  // tenta carregar as matérias e atividades quando o usuário abre o aplicativo
  useEffect(() => {
    carregarMaterias();
    carregarAtividades();
  }, []);

  // tenta salvar as atividades quando há uma alteração na lista de atividades
  useEffect(() => {
    salvarAtividades();
  }, [atividades]);

  // tenta salvar as matérias quando há uma alteração na lista de matérias
  useEffect(() => {
    salvarMaterias();
  }, [materias]);

  // seleciona a matéria para exibir a página da mesma
  const selectMateria = (idMateria) => {
    let idm = materias.findIndex((materia) => materia.id == idMateria);
    setMateriaAtual(idm);
    setTela("atvMaterias");
  };

  // seleciona a atividade para exibir a página da mesma
  const selectAtividade = (idAtividade) => {
    let ida = atividades.findIndex((atividade) => atividade.id == idAtividade);
    setAtividadeAtual(ida);
    setTela("atvDetails");
  };

  // função para retornar para a página principal
  const retorna = () => {
    setMateriaAtual("");
    setTela("materias");
  };

  // adiciona uma matéria
  const adicionarMateria = (m) => {
    if (m.length > 0) {
      const nova = { id: Date.now().toString(), nome: m };
      setMaterias([...materias, nova]);
    } else Alert.alert("Você deve digitar o nome da matéria.");
  };

  // adiciona uma atividade
  const adicionarAtividade = (a) => {
    setAtividades([...atividades, a]);
  };

  // Função para atualizar a atividade dentro da lista de atividades.
  const atualizaAtividade = (a) => {
    let lista = [...atividades];
    lista[atividadeAtual] = a;
    setAtividades(lista);
    setTela("atvMaterias");
  };

  // Função para deletar a atividade.
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

  // Função para deletar uma matéria e todas as atividades relacionadas a ela.
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

  // Função para fazer a troca de páginas.
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
