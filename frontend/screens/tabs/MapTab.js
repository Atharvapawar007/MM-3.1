import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Toast from 'react-native-toast-message';
import { MapPin, Navigation } from 'lucide-react-native';
import CustomButton from '../../components/CustomButton';
import ApiService from '../../services/api';
import { Colors } from '../../constants/Colors';

const MapTab = ({ student }) => {
  const [busLocation, setBusLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 18.5204,
    longitude: 73.8567,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permission Denied',
          text2: 'Location permission is required to show your position',
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const userCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      
      setUserLocation(userCoords);
      setRegion({
        ...userCoords,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.log('Error getting user location:', error);
      Toast.show({
        type: 'error',
        text1: 'Location Error',
        text2: 'Failed to get your current location',
      });
    }
  };

  const fetchBusLocation = async () => {
    try {
      const response = await ApiService.getBusLocation();
      
      if (!response.isActive) {
        setBusLocation(null);
        Toast.show({
          type: 'info',
          text1: 'Bus Inactive',
          text2: response.message,
        });
        return;
      }

      if (response.hasLocation) {
        setBusLocation({
          latitude: response.latitude,
          longitude: response.longitude,
        });
      } else {
        setBusLocation(null);
        Toast.show({
          type: 'warning',
          text1: 'GPS Unavailable',
          text2: response.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to Load Bus Location',
        text2: error.message || 'Please try again',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation();
    fetchBusLocation();
    
    // Refresh bus location every 30 seconds
    const interval = setInterval(fetchBusLocation, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchBusLocation();
  };

  const centerOnBus = () => {
    if (busLocation) {
      setRegion({
        ...busLocation,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const centerOnUser = () => {
    if (userLocation) {
      setRegion({
        ...userLocation,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Bus Tracking</Text>
        <CustomButton
          title="Refresh"
          onPress={handleRefresh}
          style={styles.refreshButton}
        />
      </View>

      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={false}
        showsMyLocationButton={false}
      >
        {busLocation && (
          <Marker
            coordinate={busLocation}
            title="Your Bus"
            description={`Bus ${student.bus?.busNumber || 'N/A'}`}
            pinColor={Colors.primary}
          />
        )}
        
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Your Location"
            description="You are here"
            pinColor={Colors.accent}
          />
        )}
      </MapView>

      <View style={styles.controls}>
        <CustomButton
          title="Center on Bus"
          onPress={centerOnBus}
          disabled={!busLocation}
          style={[styles.controlButton, !busLocation && styles.disabledButton]}
        />
        <CustomButton
          title="Center on Me"
          onPress={centerOnUser}
          disabled={!userLocation}
          variant="outline"
          style={[styles.controlButton, !userLocation && styles.disabledButton]}
        />
      </View>

      {!busLocation && (
        <View style={styles.infoContainer}>
          <MapPin size={48} color={Colors.textLight} />
          <Text style={styles.infoTitle}>Bus Location Unavailable</Text>
          <Text style={styles.infoText}>
            Your bus isn't active right now or GPS tracking is disabled
          </Text>
        </View>
      )}
    </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  refreshButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  map: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  controlButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  infoContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -75 }],
    width: 200,
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 20,
    borderRadius: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default MapTab;
