import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Bus, MapPin, Clock, User } from 'lucide-react-native';
import Banner from '../components/Banner';
import BusDetailsTab from './tabs/BusDetailsTab';
import MapTab from './tabs/MapTab';
import ETATab from './tabs/ETATab';
import MyAccountTab from './tabs/MyAccountTab';
import { Colors } from '../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ route, navigation }) => {
  const { student } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Banner />
      
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let IconComponent;

            if (route.name === 'BusDetails') {
              IconComponent = Bus;
            } else if (route.name === 'Map') {
              IconComponent = MapPin;
            } else if (route.name === 'ETA') {
              IconComponent = Clock;
            } else if (route.name === 'MyAccount') {
              IconComponent = User;
            }

            return <IconComponent size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textLight,
          tabBarStyle: {
            backgroundColor: Colors.background,
            borderTopColor: Colors.border,
            paddingBottom: Math.max(8, insets.bottom),
            paddingTop: 5,
            height: 60 + Math.max(0, insets.bottom - 4),
          },
          tabBarSafeAreaInsets: { bottom: Math.max(8, insets.bottom) },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          headerShown: false,
        })}
      >
        <Tab.Screen 
          name="BusDetails" 
          options={{ tabBarLabel: 'Bus Details' }}
        >
          {(props) => <BusDetailsTab {...props} student={student} />}
        </Tab.Screen>
        
        <Tab.Screen 
          name="Map" 
          options={{ tabBarLabel: 'Map' }}
        >
          {(props) => <MapTab {...props} student={student} />}
        </Tab.Screen>
        
        <Tab.Screen 
          name="ETA" 
          options={{ tabBarLabel: 'ETA' }}
        >
          {(props) => <ETATab {...props} student={student} />}
        </Tab.Screen>
        
        <Tab.Screen 
          name="MyAccount" 
          options={{ tabBarLabel: 'My Account' }}
        >
          {(props) => <MyAccountTab {...props} student={student} navigation={navigation} />}
        </Tab.Screen>
      </Tab.Navigator>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default HomeScreen;
