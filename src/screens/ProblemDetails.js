import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { globalStyles } from '../styles/global';

export default ProblemDetails = ({ route }) => {
    const { problem } = route.params;

    return (
        <View style={globalStyles.container}>
            <Text>ProblemDetails</Text>
            <Text>{problem.descricao}</Text>
        </View>
    );
};

const styles = StyleSheet.create({});
