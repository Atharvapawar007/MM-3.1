import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Bus, MapPin, Clock, User } from 'lucide-react-native';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import BusDetailsTab from './tabs/BusDetailsTab';
import MapTab from './tabs/MapTab';
import ETATab from './tabs/ETATab';
import MyAccountTab from './tabs/MyAccountTab';
import { Colors } from '../constants/Colors';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ route, navigation }) => {
  const { student } = route.params;

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
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
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
      
      <Footer />
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
