import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';

import { globalStyles } from '../styles/global';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { dateFormatDDMMYYYY } from '../utils/utils';
import Icon from '../components/Icon';
import ProblemWorkflow from '../components/ProblemWorkflow';

export default ProblemDetails = ({ navigation, route }) => {
    const { problem } = route.params;

    function handleOnPressImage() {
        if (problem?.foto?.uri)
            navigation.navigate('ImageView', { imageUrl: problem?.foto?.uri });
    }

    function handleOnPressLocation() {
        navigation.navigate('HomeStack', {
            screen: 'Home',
            params: {
                manualLocation: {
                    latitude: problem.localizacao.coordinates[1],
                    longitude: problem.localizacao.coordinates[0],
                },
            },
        });
    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.fotoContainer}>
                <TouchableOpacity
                    style={styles.fotoContainer}
                    onPress={handleOnPressImage}
                >
                    <Image
                        style={styles.foto}
                        defaultSource={require('../assets/images/default-placeholder.png')}
                        source={{ uri: problem?.foto?.uri }}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Descrição</Text>
                    <TouchableOpacity onPress={handleOnPressLocation}>
                        <Icon
                            style={styles.icon}
                            size={Dimensions.get('screen').height * 0.0547}
                            color={colors.orange}
                            iconFamily="Ionicons"
                            iconName="location-sharp"
                        />
                    </TouchableOpacity>
                </View>

                <ProblemWorkflow problem={problem} style={styles.workflow} />

                <View style={styles.descriptionContainer}>
                    <ScrollView style={styles.descriptionScroll}>
                        <Text style={styles.description}>
                            {problem?.descricao}
                        </Text>
                    </ScrollView>

                    <Text style={styles.description}>
                        Data do problema:{' '}
                        {dateFormatDDMMYYYY(problem?.dataCriacao)}
                    </Text>
                </View>

                {problem?.resposta && problem?.resposta?.descricao ? (
                    <View style={styles.anwserContainer}>
                        <ScrollView style={styles.descriptionScroll}>
                            <Text style={styles.anwserTitle}>Resposta</Text>
                            <Text style={styles.anwserDescription}>
                                {problem?.resposta?.descricao}
                            </Text>
                        </ScrollView>

                        <Text style={styles.anwserDescription}>
                            Data da resposta:{' '}
                            {dateFormatDDMMYYYY(problem?.resposta?.data)}
                        </Text>
                    </View>
                ) : (
                    <></>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    fotoContainer: {
        height: Dimensions.get('screen').height * 0.27,
        width: Dimensions.get('screen').width,

        backgroundColor: 'coral',
    },
    foto: {
        flex: 1,
    },
    detailsContainer: {
        flex: 1,
        borderTopLeftRadius: 60,
        marginTop: -50,
        padding: 20,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowColor: colors.black,
        elevation: 4,
        backgroundColor: colors.white,
        width: Dimensions.get('screen').width,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    workflow: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('screen').height * 0.06,
        marginVertical: Dimensions.get('screen').height * 0.007,
    },
    title: {
        borderBottomColor: colors.orange,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        fontFamily: fonts.heading,
        fontSize: 20,
        marginBottom: Dimensions.get('screen').height * 0.01,
        marginTop: Dimensions.get('screen').height * 0.02,
        paddingBottom: 6,
        width: Dimensions.get('screen').width * 0.6,
    },
    icon: {},
    descriptionContainer: {
        flex: 1,
        paddingBottom: Dimensions.get('screen').height * 0.025,
    },
    descriptionScroll: {
        flex: 1,
    },
    description: {
        marginTop: Dimensions.get('screen').height * 0.014,
    },
    anwserContainer: {
        flex: 1,
        padding: Dimensions.get('screen').height * 0.017,
        borderRadius: 12,
        backgroundColor: colors.blue,
    },
    anwserTitle: {
        color: colors.white,
        fontFamily: fonts.heading,
        fontSize: 18,
    },
    anwserDescription: {
        color: colors.white,
        marginTop: Dimensions.get('screen').height * 0.014,
        fontFamily: fonts.text,
        fontSize: 16,
    },
});
