import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { images } from '../../assets/images';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={images.background}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});
