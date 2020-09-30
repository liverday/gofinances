import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TabBar from './src/components/TabBar';

import {AppContainer} from './styles';

import ListScreen from './src/pages/List';
import RegisterScreen from './src/pages/Register';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <AppContainer>
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
          <Tab.Screen name="Listagem" component={ListScreen} />
          <Tab.Screen name="Cadastro" component={RegisterScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppContainer>
  );
};

export default App;
