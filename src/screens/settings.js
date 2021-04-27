import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { globalStyles } from '../styles/global';
import colors from '../styles/colors';
import AuthContext from '../contexts/auth';
import SettingsMenuItem from '../components/settingsMenuItem';

export default class Settings extends Component {
    static contextType = AuthContext;

    handleAbout = () => {
        this.props.navigation.navigate('About');
    };

    handleChangePassword = () => {
        this.props.navigation.navigate('ChangePassword');
    };

    handleLogout = () => {
        const { logout } = this.context;
        logout();
    };

    render() {
        const menuItens = [
            { key: 'about', label: 'Sobre', onPress: this.handleAbout },
            {
                key: 'changePassword',
                label: 'Alterar senha',
                onPress: this.handleChangePassword,
            },
            { key: 'logout', label: 'Sair', onPress: this.handleLogout },
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
    }
}

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
