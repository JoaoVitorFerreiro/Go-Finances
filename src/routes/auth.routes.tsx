import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '../screens/SignIn';

export function AuthRoutes(){
    const { Navigator, Screen } = createStackNavigator();
    return(
        <Navigator 
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name="SignIn"
                component={SignIn}
            />
        </Navigator>
    )
}