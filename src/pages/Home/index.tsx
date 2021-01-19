import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const configIcon = require('../../assets/config.png');
const historyIcon = require('../../assets/history.png');
const {width, height} = Dimensions.get('window');

interface HistoryProps {
  date: Date;
  value: number;
}

const Home: React.FC = () => {
  const [tempWeight, setTempWeight] = useState<string>('0');
  const [weight, setWeight] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [historyOpen, setHistoryOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryProps[]>([]);

  const cupTypes = [
    {name: '150ml', value: 150},
    {name: '250ml', value: 250},
    {name: '450ml', value: 450},
    {name: '500ml', value: 500},
    {name: '700ml', value: 700},
  ];

  const defineWeight = async () => {
    setModalOpen(!modalOpen);
    try {
      await AsyncStorage.setItem('@drinkit_weight', String(weight));
    } catch (err) {
      console.warn(err);
    }
    setWeight(Number(tempWeight));
  };

  const recoverAsyncData = async () => {
    try {
      const previousWeight = await AsyncStorage.getItem('@drinkit_weight');
      setWeight(Number(previousWeight));
    } catch (err) {
      console.warn(err);
    }
  };

  const saveWaterConsuption = (value: number) => {
    const consuption: HistoryProps = {
      date: new Date(),
      value,
    };
    setHistory([...history, consuption]);
  };

  useEffect(() => {
    recoverAsyncData();
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => console.warn('Fechar modal')}
        style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text>Qual é o seu peso?</Text>
          <TextInput
            style={styles.modalInput}
            keyboardType="number-pad"
            value={tempWeight}
            onChangeText={(e) => setTempWeight(e)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setModalOpen(!modalOpen)}
              style={[styles.button]}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => defineWeight()}>
              <Text>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={historyOpen}
        onRequestClose={() => console.warn('Fechar modal')}
        style={styles.modalContainer}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => setHistoryOpen(!historyOpen)}>
            <Text>Fechar histórico</Text>
          </TouchableOpacity>
          {history.map((consuption, i) => (
            <View key={i}>
              <Text>{JSON.stringify(consuption.date)}</Text>
              <Text>{consuption.value}ml</Text>
            </View>
          ))}
        </View>
      </Modal>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setHistoryOpen(!historyOpen)}>
          <Image source={historyIcon} style={styles.configIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalOpen(!modalOpen)}>
          <Image source={configIcon} style={styles.configIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.weightContainer}>
          <Text style={styles.weightLabel}>Meu peso</Text>
          <View style={styles.weightValueContainer}>
            <Text style={styles.weightValue}>{weight}</Text>
            <Text>Kg</Text>
          </View>
        </View>
        <View>
          <Text> Quantidade de água: {(weight * 35) / 1000} Litros</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginLeft: 30}}>
          {cupTypes.map((cup) => (
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderWidth: 5,
                borderColor: '#fff',
                borderRadius: 100,
                marginRight: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              key={cup.name}
              onPress={() => saveWaterConsuption(cup.value)}>
              <Text style={{color: '#fff', fontSize: 13, fontWeight: 'bold'}}>
                {cup.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1ca3ec',
  },
  modalContainer: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff3a',
  },
  weightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  weightValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  modal: {
    marginTop: 180,
    marginHorizontal: 50,
    height: 200,
    borderRadius: 5,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  modalInput: {
    width: '90%',
    height: 35,
    borderWidth: 0.5,
    borderColor: '#dedede',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  header: {
    width: '100%',
    height: '10%',
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  configIcon: {
    width: 48,
    height: 48,
  },
  body: {
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weightLabel: {},
  weightValue: {
    fontSize: 128,
    fontWeight: 'bold',
  },
  weightUnit: {
    top: 50,
  },
  footer: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
