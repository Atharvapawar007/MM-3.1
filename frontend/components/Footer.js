import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react-native';
import { Colors } from '../constants/Colors';

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Created with </Text>
        <Heart size={16} color={Colors.error} fill={Colors.error} />
        <Text style={styles.text}> by</Text>
      </View>
      <Text style={styles.names}>
        Atharva Pawar, Yash Mulay, Vaishnavi Hajare, Tanvi Patil
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: Colors.textLight,
  },
  names: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default Footer;
