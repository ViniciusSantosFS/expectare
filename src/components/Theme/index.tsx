import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '@expectare/screens/Home';
import Settings from '@expectare/screens/Settings';
import Workspace from '@expectare/screens/Workspace';
import AddScreen from '@expectare/screens/Narrative/Add';
import SetupScreen from '@expectare/screens/Setup';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableHighlight, View} from 'react-native';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function tabBarIcon(name: string) {
  return ({color}: {color: string}) => (
    <Icon name={name} size={30} color={color} />
  );
}

function WorkspaceStack() {
  const {t} = useTranslation();
  const title = t('screen.add.narrative');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WorkspaceScreen"
        component={Workspace}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddScreen"
        component={AddScreen}
        options={{
          title,
        }}
      />
    </Stack.Navigator>
  );
}

const buttonStyle = {
  marginRight: 10,
};

function AddButton(navigation) {
  return () => (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate('AddScreen', {screen: 'AddScreen'});
      }}>
      <View>
        <Icon name="plus" size={30} color="#FFC107" style={buttonStyle} />
      </View>
    </TouchableHighlight>
  );
}

function Theme() {
  const isLogged = useSelector((state: any) => state.isLogged);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  console.log('************** TRANSLATE', t('screen.add.narrative'));

  React.useEffect(() => {
    dispatch({type: 'APP_INIT'});
  }, []);

  return (
    <NavigationContainer>
      {!isLogged ? (
        <Stack.Navigator>
          <Stack.Screen name="Setup" component={SetupScreen} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#FFC107',
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: tabBarIcon('house'),
            }}
          />
          <Tab.Screen
            name="Workspace"
            component={WorkspaceStack}
            options={({navigation}) => ({
              tabBarIcon: tabBarIcon('briefcase'),
              headerRight: AddButton(navigation),
            })}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: tabBarIcon('gear'),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

export default Theme;
