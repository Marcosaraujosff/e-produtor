import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Feather from 'react-native-vector-icons/Feather';

import Home from '../pages/Home';
import Newpost from '../pages/Newpost';
import Postsuser from "../pages/Postsuser";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import Notification from "../pages/Notification";
import Chat from "../pages/Chat";
import Store from "../pages/Store";
import Messages from "../pages/Messages";
import MoreFunctions from "../pages/MenuHamburguer";
import Quotes from "../pages/Quotes";
import Schedule from "../pages/Schedule";
import WeatherForecast from "../pages/WeatherForecast";
import Calculator from "../pages/Calculator";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function StackRoutes() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}

            />

            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Notification"
                component={Notification}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="NewPost"
                component={Newpost}
                options={{
                    title: 'Nova Publicação',
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#36393F'
                    }
                }}
            />
            <Stack.Screen
                name="PostsUser"
                component={Postsuser}
                options={{
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#36393F'
                    }
                }}
            />
            <Stack.Screen
                name="WeatherForecast"
                component={WeatherForecast}
                options={{
                    headerShown: false,
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#36393F'
                    }
                }}
            />
            <Stack.Screen
                name="Messages"
                component={Messages}
                options={({ route }) => ({
                    title: route.params.thread.name,
                    headerBackVisible: false,
                    headerTitleAlign: "center"
                })}

            />
            <Stack.Screen
                name="Quotes"
                component={Quotes}
                options={{
                    headerShown: false
                }}

            />
            <Stack.Screen
                name="Schedule"
                component={Schedule}
                options={{
                    headerShown: false
                }}

            />
            <Stack.Screen
                name="Calculator"
                component={Calculator}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    )
}

function DrawerRoutes() {
    return (
        <Drawer.Navigator
            // drawerContent={}
            initialRouteName="Home"
            defaultStatus="open"
            screenOptions={{
                headerShown: false,
            }}>

            <Drawer.Screen
                name="Quotes"
                component={Quotes}
            />

            <Drawer.Screen
                name="Home"
                component={Home}
            />

            <Drawer.Screen
                name="Schedule"
                component={Schedule}
            />

        </Drawer.Navigator>
    );
}

function AppRoutes() {
    return (
        <Tab.Navigator
            initialRouteName="HomeStack"
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#FFF',

                tabBarStyle: {
                    backgroundColor: '#202225',
                    borderTopWith: 0
                }
            }}
        >
            <Tab.Screen
                name="DrawerRoutes"
                component={DrawerRoutes}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="menu" color={color} size={size} />
                    }

                }}
            />

            <Tab.Screen
                name="HomeStack"
                component={StackRoutes}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="home" color={color} size={size} />
                    }
                }}
            />


            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="search" color={color} size={size} />
                    }
                }}
            />

            <Tab.Screen
                name="chat"
                component={Chat}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="message-square" color={color} size={size} />
                    }
                }}
            />

            <Tab.Screen
                name="Store"
                component={Store}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="shopping-bag" color={color} size={size} />
                    }
                }}
            />
        </Tab.Navigator>

    )
}

export default AppRoutes;