import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { globalStyles } from '../styles/global';
import colors from '../styles/colors';
import { useAuth } from '../contexts/auth';
import SettingsMenuItem from '../components/settingsMenuItem';

export default Settings = ({ navigation }) => {
    const { logout } = useAuth();

    const handleAbout = () => {
        navigation.navigate('About');
    };

    const handleChangePassword = () => {
        navigation.navigate('ChangePassword');
    };

    const handleLogout = () => {
        logout();
    };

    const menuItens = [
        { key: 'about', label: 'Sobre', onPress: handleAbout },
        {
            key: 'changePassword',
            label: 'Alterar senha',
            onPress: handleChangePassword,
        },
        { key: 'logout', label: 'Sair', onPress: handleLogout },
    ];

    return (
        <View style={[globalStyles.container, styles.view]}>
            <FlatList
                style={styles.menuList}
                data={menuItens}
                renderItem={({ item }) => (
                    <SettingsMenuItem
                        label={item.label}
                        onPress={item.onPress}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        backgroundColor: colors.background,
        justifyContent: 'flex-start',
    },
    menuList: {
        marginTop: '25%',
        flex: 1,
    },
});
