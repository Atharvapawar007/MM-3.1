import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import Toast from 'react-native-toast-message';
import { Bus, User, Phone, Hash, MapPin } from 'lucide-react-native';
import CustomButton from '../../components/CustomButton';
import ApiService from '../../services/api';
import { Colors } from '../../constants/Colors';

const BusDetailsTab = ({ student }) => {
  const [busDetails, setBusDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBusDetails = async () => {
    try {
      const response = await ApiService.getBusDetails();
      setBusDetails(response);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to Load Bus Details',
        text2: error.message || 'Please try again',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBusDetails();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBusDetails();
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading bus details...</Text>
      </View>
    );
  }

  if (!busDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No bus assigned to your account</Text>
        <CustomButton
          title="Refresh"
          onPress={onRefresh}
          style={styles.refreshButton}
        />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Your Bus Details</Text>
        <View style={[styles.statusBadge, busDetails.isActive ? styles.activeBadge : styles.inactiveBadge]}>
          <Text style={[styles.statusText, busDetails.isActive ? styles.activeText : styles.inactiveText]}>
            {busDetails.isActive ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <InfoCard
          icon={Bus}
          title="Bus Number"
          value={busDetails.busNumber}
          color={Colors.primary}
        />

        <InfoCard
          icon={Hash}
          title="Number Plate"
          value={busDetails.numberPlate}
          color={Colors.accent}
        />

        {/* Driver details removed per schema sync */}

        {student.busStop && (
          <InfoCard
            icon={MapPin}
            title="Your Bus Stop"
            value={student.busStop}
            color={Colors.warning}
          />
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {busDetails.isActive 
            ? "Your bus is currently active and tracking location" 
            : "Your bus is currently inactive"}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textLight,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 20,
  },
  refreshButton: {
    width: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeBadge: {
    backgroundColor: Colors.success + '20',
  },
  inactiveBadge: {
    backgroundColor: Colors.error + '20',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  activeText: {
    color: Colors.success,
  },
  inactiveText: {
    color: Colors.error,
  },
  content: {
    paddingHorizontal: 24,
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
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default BusDetailsTab;
