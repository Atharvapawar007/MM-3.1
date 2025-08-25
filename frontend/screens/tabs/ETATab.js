import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import Toast from 'react-native-toast-message';
import { Clock, MapPin, Bus, AlertCircle } from 'lucide-react-native';
import CustomButton from '../../components/CustomButton';
import ApiService from '../../services/api';
import { Colors } from '../../constants/Colors';

const ETATab = ({ student }) => {
  const [etaData, setEtaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchETA = async () => {
    try {
      const response = await ApiService.getETA();
      setEtaData(response);
      
      if (response.isActive) {
        Toast.show({
          type: 'success',
          text1: 'ETA Updated',
          text2: response.message,
        });
      } else {
        Toast.show({
          type: 'info',
          text1: 'Bus Inactive',
          text2: response.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to Load ETA',
        text2: error.message || 'Please try again',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchETA();
    
    // Refresh ETA every 60 seconds
    const interval = setInterval(fetchETA, 60000);
    return () => clearInterval(interval);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchETA();
  };

  const formatTime = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min${minutes !== 1 ? 's' : ''}`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const getETAColor = (eta) => {
    if (eta <= 5) return Colors.success;
    if (eta <= 15) return Colors.warning;
    return Colors.error;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Clock size={48} color={Colors.textLight} />
        <Text style={styles.loadingText}>Calculating arrival time...</Text>
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
        <Text style={styles.title}>Estimated Arrival</Text>
        <Text style={styles.subtitle}>Live bus tracking & ETA</Text>
      </View>

      {etaData && etaData.isActive ? (
        <View style={styles.content}>
          <View style={styles.etaCard}>
            <View style={styles.etaHeader}>
              <Clock size={32} color={getETAColor(etaData.eta)} />
              <Text style={styles.etaTitle}>Arrival Time</Text>
            </View>
            
            <Text style={[styles.etaValue, { color: getETAColor(etaData.eta) }]}>
              {formatTime(etaData.eta)}
            </Text>
            
            <Text style={styles.etaMessage}>{etaData.message}</Text>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoCard}>
              <MapPin size={24} color={Colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Your Bus Stop</Text>
                <Text style={styles.infoValue}>{etaData.busStop}</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Bus size={24} color={Colors.accent} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Bus Status</Text>
                <Text style={[styles.infoValue, { color: Colors.success }]}>
                  Active & Tracking
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.estimateNote}>
            <AlertCircle size={16} color={Colors.textLight} />
            <Text style={styles.noteText}>
              ETA is estimated based on current traffic conditions and may vary
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.inactiveContainer}>
          <Bus size={64} color={Colors.textLight} />
          <Text style={styles.inactiveTitle}>Bus Not Active</Text>
          <Text style={styles.inactiveMessage}>
            {etaData?.message || "Your bus isn't active right now"}
          </Text>
          <Text style={styles.inactiveSubtext}>
            ETA will be available when your bus starts its route
          </Text>
        </View>
      )}

      <View style={styles.refreshSection}>
        <CustomButton
          title="Refresh ETA"
          onPress={onRefresh}
          variant="outline"
          style={styles.refreshButton}
        />
        <Text style={styles.refreshNote}>
          ETA updates automatically every minute
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
    marginTop: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textLight,
  },
  content: {
    paddingHorizontal: 24,
  },
  etaCard: {
    backgroundColor: Colors.background,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  etaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  etaTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 12,
  },
  etaValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  etaMessage: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 24,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoContent: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  estimateNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  noteText: {
    fontSize: 12,
    color: Colors.textLight,
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
  inactiveContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  inactiveTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  inactiveMessage: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 8,
  },
  inactiveSubtext: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  refreshSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  refreshButton: {
    width: 150,
    marginBottom: 12,
  },
  refreshNote: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'center',
  },
});

export default ETATab;
