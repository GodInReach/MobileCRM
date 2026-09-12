import React from 'react';
import { View, StyleSheet } from 'react-native';

interface GlobeBadgeProps {
  size?: number;
}

export const GlobeBadge: React.FC<GlobeBadgeProps> = ({ size = 64 }) => {
  const globeSize = size * 0.58;

  return (
    <View
      style={[
        styles.badgeContainer,
        {
          width: size,
          height: size,
          borderRadius: size * 0.28,
        },
      ]}
    >
      {/* 3D Glossy Globe */}
      <View
        style={[
          styles.globeSphere,
          {
            width: globeSize,
            height: globeSize,
            borderRadius: globeSize / 2,
          },
        ]}
      >
        {/* Continent shapes */}
        <View style={styles.continentNorthAmerica} />
        <View style={styles.continentSouthAmerica} />
        <View style={styles.continentEurasia} />
        <View style={styles.continentAfrica} />

        {/* Top-left glossy reflection */}
        <View style={styles.glossHighlight} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  globeSphere: {
    backgroundColor: '#0284C7',
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  continentNorthAmerica: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 14,
    height: 10,
    backgroundColor: '#4ADE80',
    borderRadius: 5,
    opacity: 0.95,
  },
  continentSouthAmerica: {
    position: 'absolute',
    bottom: 6,
    left: 8,
    width: 10,
    height: 14,
    backgroundColor: '#22C55E',
    borderRadius: 4,
    opacity: 0.95,
  },
  continentEurasia: {
    position: 'absolute',
    top: 5,
    right: 3,
    width: 16,
    height: 11,
    backgroundColor: '#4ADE80',
    borderRadius: 5,
    opacity: 0.95,
  },
  continentAfrica: {
    position: 'absolute',
    bottom: 5,
    right: 7,
    width: 11,
    height: 12,
    backgroundColor: '#16A34A',
    borderRadius: 4,
    opacity: 0.95,
  },
  glossHighlight: {
    position: 'absolute',
    top: 2,
    left: 4,
    width: 14,
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    transform: [{ rotate: '-25deg' }],
  },
});
