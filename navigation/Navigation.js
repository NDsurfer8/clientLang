import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import AuthContextProvider, { AuthContext } from '../store/auth-context';
import LoginScreen from '../src/screens/LoginScreen';
import SignupScreen from '../src/screens/SignupScreen';
import WelcomeScreen from '../src/screens/WelcomeScreen';
import { Colors } from '../src/constants/styles';
import { useContext } from 'react';
import ProfileScreen from '../src/screens/ProfileScreen';
import EditScreen from '../src/screens/EditScreen'
import PhraseBookScreen from '../src/screens/PhraseBookScreen';
import MessagesScreen from '../src/screens/MessagesScreen';
import ContactsScreen from '../src/screens/ContactsScreen';
import SettingsScreen from '../src/screens/SettingsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { Button } from 'react-native'

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();



function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 },
                headerShown: true
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Register' }} />
        </Stack.Navigator>
    );
}

function AuthenticatedStack() {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name='Weclome' component={WelcomeScreen} /> */}
            <Stack.Screen name='ProfileNav' component={ProfileNav} options={{headerShown: false}}/>
            <Stack.Screen name='Edit' component={EditScreen}/>
        </Stack.Navigator>
    );
}

function ProfileNav() {

    const authCtx = useContext(AuthContext);

    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Profile') {
                        iconName = focused
                            ? 'ios-person-circle-outline'
                            : 'ios-person-circle-outline';
                    }
                    if (route.name === 'PhraseBook') {
                        iconName = focused
                            ? 'book'
                            : 'book';
                    }
                    if (route.name === 'Messages') {
                        iconName = focused
                            ? 'chatbox-ellipses-outline'
                            : 'chatbox-ellipses-outline';
                    }
                    if (route.name === 'Settings') {
                        iconName = focused
                            ? 'md-settings-sharp'
                            : 'md-settings-sharp';
                    }
                    if (route.name === 'Contacts') {
                        iconName = focused
                            ? 'call-sharp'
                            : 'call-sharp';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />

                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <BottomTab.Screen
                name='Profile'
                component={ProfileScreen}

                options={{
                    headerStyle: { backgroundColor: '#D5D2D6' },
                    headerTintColor: 'white',
                    headerRight: () => (
                        <Button
                            onPress={() => {
                                authCtx.logout()
                            }}
                            title="Logout"
                            color="white"
                        />
                    ),

                }}
            />
            <BottomTab.Screen name='PhraseBook' component={PhraseBookScreen} />
            <BottomTab.Screen name='Messages' component={MessagesScreen} options={{ tabBarBadge: 8 }} />
            <BottomTab.Screen name='Contacts' component={ContactsScreen} />
            <BottomTab.Screen name='Settings' component={SettingsScreen} />
        </BottomTab.Navigator>
    )
}



export default function Navigation() {

    const authCtx = useContext(AuthContext);

    return (

        <NavigationContainer>
            {!authCtx.isAuthenticated && <AuthStack />}
            {authCtx.isAuthenticated && <AuthenticatedStack />}
        </NavigationContainer>
    );
}
