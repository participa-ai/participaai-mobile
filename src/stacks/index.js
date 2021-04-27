import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import AppStacks from './app';
import AuthStacks from './auth';
import { useAuth } from '../contexts/auth';

export default Routes = () => {
    const { authenticated, loading } = useAuth();

    if (loading) {
        return (
            <View style={styles.activityIndicator}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (authenticated) {
        return <AppStacks />;
    } else {
        return <AuthStacks />;
    }
};

const styles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
