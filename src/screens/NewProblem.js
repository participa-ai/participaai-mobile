import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { globalStyles } from '../styles/global';

export default NewProblem = () => {
    const [categories, setCategories] = useState(null);

    return (
        <View style={globalStyles.container}>
            <Text>NewProblem</Text>
        </View>
    );
};

const styles = StyleSheet.create({});
