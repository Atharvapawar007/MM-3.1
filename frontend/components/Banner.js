import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Colors } from '../constants/Colors';

const Banner = () => {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: Colors.primary }]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={[
        styles.container,
        // Add top padding on Android to respect status bar notch/holes
        { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0 }
      ]}>
        <SvgUri
          uri={Image.resolveAssetSource(require('../assets/images/logo.svg')).uri}
          width={40}
          height={40}
        />
        <Text style={styles.collegeName}>KIT's College of Engineering, Kolhapur</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: '100%'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  collegeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Banner;
