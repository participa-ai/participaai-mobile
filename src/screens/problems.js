import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ProblemCard from '../components/problemCard';

import colors from '../styles/colors';
import { globalStyles } from '../styles/global';

export default Problems = () => {
    const problems = [
        { key: '1', label: 'TESTE', onPress: () => {} },
        { key: '2', label: 'TESTE', onPress: () => {} },
        { key: '3', label: 'TESTE', onPress: () => {} },
    ];

    return (
        <View style={[globalStyles.container, styles.view]}>
            <FlatList
                style={styles.flatList}
                data={problems}
                renderItem={({ item }) => (
                    <ProblemCard
                        label={item.label}
                        onPress={item.onPress}
                        style={styles.card}
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
    flatList: {
        marginTop: '25%',
        flex: 1,
    },
    card: {
        marginTop: 20,
    },
});
