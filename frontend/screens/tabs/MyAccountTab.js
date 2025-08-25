import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { User, Mail, Hash, MapPin, Bus } from 'lucide-react-native';
import CustomButton from '../../components/CustomButton';
import ApiService from '../../services/api';
import { Colors } from '../../constants/Colors';

const MyAccountTab = ({ student, navigation }) => {


  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await ApiService.logout();
            Toast.show({
              type: 'success',
              text1: 'Logged Out',
              text2: 'You have been logged out successfully',
            });
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  const InfoCard = ({ icon: Icon, title, value, color = Colors.primary }) => (
    <View style={styles.infoCard}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Icon size={24} color={color} />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <User size={32} color={Colors.background} />
          </View>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.email}>{student.email}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <InfoCard
          icon={User}
          title="Full Name"
          value={student.name}
          color={Colors.primary}
        />

        <InfoCard
          icon={Mail}
          title="Email Address"
          value={student.email}
          color={Colors.accent}
        />

        <InfoCard
          icon={Hash}
          title="PRN Number"
          value={student.prn}
          color={Colors.success}
        />

        {student.busStop && (
          <InfoCard
            icon={MapPin}
            title="Bus Stop"
            value={student.busStop}
            color={Colors.warning}
          />
        )}

        {student.bus && (
          <InfoCard
            icon={Bus}
            title="Allotted Bus"
            value={`${student.bus.busNumber} (${student.bus.numberPlate})`}
            color={Colors.button}
          />
        )}

        <Text style={styles.sectionTitle}>Account Settings</Text>

        <CustomButton
          title="Logout"
          onPress={handleLogout}
          variant="secondary"
          style={[styles.actionButton, styles.logoutButton]}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.background,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: Colors.background,
    opacity: 0.9,
  },
  content: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    marginTop: 8,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  actionButton: {
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: Colors.error,
    borderColor: Colors.error,
  },
});

export default MyAccountTab;
