import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';

export default function App() {
  const [bg, setBg] = useState('white');
  const interval : any = useRef();

  const generateColor = () => {
    const hexRange = '012345679ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hexRange[Math.floor(Math.random() * hexRange.length)];
    }
    console.log(color);
    setBg(color);
  };

  const partyMode = (party: boolean) => {
    if (party) {
      interval.current = setInterval(() => {
        generateColor();
      }, 100);
    } else {
      clearInterval(interval.current);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={bg} />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: bg,
          gap: 20,
        }}>
        <TouchableOpacity onPress={generateColor}>
          <View
            style={{borderRadius: 18, backgroundColor: 'black', padding: 20, opacity: 0.70}}>
            <Text
              style={{
                color: 'white',
                textTransform: 'uppercase',
                fontSize: 20,
                fontWeight: '600',
              }}>
              Press Me!
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            partyMode(true);
          }}>
          <View
            style={{borderRadius: 10, backgroundColor: 'black', padding: 10, opacity: 0.70}}>
            <Text
              style={{
                color: 'white',
                textTransform: 'uppercase',
                fontSize: 12,
                fontWeight: '600',
              }}>
              Start a party
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            partyMode(false);
          }}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: 'black',
            borderRadius: 5,
          }}>
          <View>
            <Text style={{color: 'white', padding: 10}}>Stop</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
