import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');
const scaleW = width / 393;
const scaleH = height / 852;

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.wrapper}>  
      <Image
        source={require('../assets/group.png')}
        style={styles.bgImage}
        resizeMode="contain"
      />
      <View style={styles.logoWrapper}>
        <Image
          source={require('../assets/logohouzx.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#05141A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    position: 'absolute',
    top: 265 * scaleH,
    width: 393 * scaleW,
    height: 190 * scaleH,
    opacity: 0.06,
  },
  logoWrapper: {
    width: 248.28 * scaleW,
    height: 70 * scaleH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});
