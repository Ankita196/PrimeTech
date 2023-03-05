
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AddInfo from './src/screens/AddInfo';
import ViewInfo from './src/screens/ViewInfo';
import Camera from './src/components/Camera';
import { createStackNavigator } from '@react-navigation/stack';
import { store, PersistStore } from './src/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Add Information" component={AddInfo} />
      <Stack.Screen name="Camera" component={Camera} />
    </Stack.Navigator>
  );
}
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={PersistStore}>
        <StatusBar barStyle="dark-content" backgroundColor="#00aaff" />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => (
              {
                tabBarIcon: ({ color }) => {
                  let iconName;
                  if (route.name === "Add") {
                    iconName = require('./src/images/addnew.png')
                  } else if (route.name === "View") {
                    iconName = require('./src/images/s1.png')
                  }
                  return <Image source={iconName} style={{ height: 25, width: 25, tintColor: color }} />
                },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "gray",
                tabBarActiveBackgroundColor: "#00aaff",
                tabBarInactiveBackgroundColor: "#00aaff"
              })}
          >
            <Tab.Screen name="Add" component={HomeStackScreen} options={{ headerShown: false }} />
            <Tab.Screen name="View" component={ViewInfo} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};


export default App;