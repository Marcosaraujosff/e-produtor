import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../pages/Login'

const stack = createNativeStackNavigator()

function AuthRoutes(){
    return(
        <stack.Navigator>
            <stack.Screen 
            name="Login" 
            component={Login} 
            options={{
                headerShown: false 
                    }} />
        </stack.Navigator>
    )
}

export default AuthRoutes;