import React from 'react';
import { Platform } from 'react-native'
import { useTheme } from 'styled-components';

import { MaterialIcons } from '@expo/vector-icons'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Dashboard  } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Resume } from '../screens/Resume';


export function AppRoutes (){
    const { Navigator, Screen } = createBottomTabNavigator();

    const theme = useTheme();

    return (
        
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'below-icon',
                tabBarLabelStyle:{
                    fontSize: 13,
                    marginTop: 4,
                },
                tabBarStyle:{
                    height: 70,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    paddingBottom: 10,
                    paddingTop: 10,      
                },
            }}
        >
            <Screen
                name="Listagem"
                component={Dashboard}
                options={{
                    tabBarIcon:(({size, color}) => 
                    <MaterialIcons
                        name="format-list-bulleted"
                        size={31}
                        color={color}
                    />
                    ),
                }}
            />
            <Screen
                name="Cadastrar"
                component={Register}
                options={{
                    tabBarIcon:(({size, color}) => 
                    <MaterialIcons
                        name="attach-money"
                        size={31}
                        color={color}
                    />      
                    ),
                    
                }}
            />  
  
            <Screen
                name="Resumo"
                component={Resume}
                options={{
                    tabBarIcon:(({size, color}) => 
                    <MaterialIcons
                        name="pie-chart"
                        size={31}
                        color={color}
                    />
                    ),
                }}
            /> 
        </Navigator>
    )
}