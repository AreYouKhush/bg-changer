import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';

export default function App() {
  const [bg, setBg] = useState('white');
  const [illusionBg, setIllusionBg] = useState('black');
  const partyInterval: any = useRef();
  const illusionInterval: any = useRef();
  const [mode, setMode] = useState(false);
  const size = useRef(0);
  const grow = useRef(true);

  const generateColor = () => {
    const hexRange = '012345679ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hexRange[Math.floor(Math.random() * hexRange.length)];
    }
    setBg(color);
  };

  const generateIllusionColor = () => {
    const hexRange = '012345679ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hexRange[Math.floor(Math.random() * hexRange.length)];
    }
    setIllusionBg(color);
  };

  const changeSizeOfIllusion = () => {
    if (grow.current) {
      size.current += 10;
    } else {
      size.current -= 10;
    }
  };

  const partyMode = (party: boolean) => {
    if (party) {
      partyInterval.current = setInterval(() => {
        generateColor();
        generateIllusionColor();
        if (size.current > 250) {
          grow.current = false;
        }
        if (size.current === 0) {
          grow.current = true;
        }
        console.log({size: size.current, grow: grow.current});
        changeSizeOfIllusion();
      }, 100);
    } else {
      size.current = 0;
      grow.current = true;
      clearInterval(illusionInterval.current);
      clearInterval(partyInterval.current);
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
        {!mode && (
          <>
            <TouchableOpacity onPress={generateColor}>
              <View
                style={{
                  borderRadius: 18,
                  backgroundColor: 'black',
                  padding: 20,
                  opacity: 0.7,
                }}>
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
                setMode(true);
              }}>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: 'black',
                  padding: 10,
                  opacity: 0.7,
                }}>
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
          </>
        )}
        <TouchableOpacity
          onPress={() => {
            setMode(false);
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
        <View
          style={{
            position: 'absolute',
            bottom: Math.floor(Math.random() * 100) + 50,
            right: Math.floor(Math.random() * 100) + 50,
            backgroundColor: illusionBg,
            height: size.current,
            width: size.current,
            zIndex: -1,
            borderRadius: 5000,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: Math.floor(Math.random() * 100),
            left: Math.floor(Math.random() * 100),
            backgroundColor: illusionBg,
            height: size.current - 20,
            width: size.current - 20,
            zIndex: -1,
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
