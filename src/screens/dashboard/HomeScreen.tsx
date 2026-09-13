import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppInsets } from '../../hooks/useAppInsets';
import { images } from '../../assets/images';

interface HomeScreenProps {
  onOpenMenu?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onOpenMenu }) => {
  const insets = useAppInsets();


  return (
    <View style={styles.container}>
      <Image
        source={images.background}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      {onOpenMenu && (
        <TouchableOpacity
          style={[styles.floatingMenuBtn, { top: insets.top + 12 }]}
          onPress={onOpenMenu}
          activeOpacity={0.7}
        >
          <View style={styles.hamburgerBar} />
          <View style={styles.hamburgerBar} />
          <View style={styles.hamburgerBar} />
        </TouchableOpacity>
      )}
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
  floatingMenuBtn: {
    position: 'absolute',
    left: 16,
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
  hamburgerBar: {
    width: 20,
    height: 2.2,
    backgroundColor: '#334155',
    borderRadius: 2,
    marginVertical: 2,
  },
});

