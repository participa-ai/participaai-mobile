import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { globalStyles } from '../styles/global';

import Icon from '../components/Icon';
import colors from '../styles/colors';

export default Home = ({ navigation }) => {
    function handleAddProblem() {
        navigation.navigate('NewProblem');
    }

    return (
        <View style={globalStyles.container}>
            <View style={[globalStyles.container, styles.mapContainer]}>
                <Text>MAPA AQUI</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddProblem}
                >
                    <Icon
                        iconFamily="MaterialCommunityIcons"
                        iconName="plus-circle"
                        color={colors.orange}
                        size={60}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 12,
    },
    button: {},
});
