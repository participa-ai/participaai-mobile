import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './contexts/auth';
import Routes from './stacks/index';

export default App = () => (
    <NavigationContainer>
        <AuthProvider>
            <Routes />
        </AuthProvider>
    </NavigationContainer>
);
