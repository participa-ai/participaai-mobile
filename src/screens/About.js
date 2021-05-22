import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { globalStyles } from '../styles/global';

export default About = () => {
    return (
        <View style={[globalStyles.container, styles.view]}>
            <View style={[globalStyles.container, styles.contentTop]}>
                <Text style={styles.text}>
                    Aplicativo desenvolvido para o Trabalho de Conclusão de
                    Curso apresentado no curso de Tecnologia em Análise e
                    Desenvolvimento de Sistemas no Instituto Federal de
                    Educação, Ciência e Tecnologia de São Paulo – Campus
                    Bragança Paulista como requisito parcial à obtenção do
                    título de Tecnólogo em Análise e Desenvolvimento de
                    Sistemas.
                </Text>

                <Text style={[styles.names, styles.heading]}>Orientador:</Text>
                <Text style={styles.names}>Prof. Dr. André Marcelo Panhan</Text>

                <Text style={[styles.names, styles.heading]}>
                    Desenvolvedores:
                </Text>
                <Text style={styles.names}>
                    Lucas Aparecido Umberto Garcia {'\n'}
                    Lucas Hideo Hirata {'\n'}
                    Raquel Nogueira da Silva {'\n'}
                </Text>
            </View>
            <View style={[globalStyles.container, styles.contentBottom]}>
                <Text style={[styles.smallText]}>
                    Participa aí! {' \u00A9 '} 2021
                </Text>
                <Text style={[styles.smallText]}>
                    participaai.app@gmail.com
                </Text>
                <Text style={[styles.smallText]}>Versão 1.0.0a</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        backgroundColor: colors.background,
        paddingVertical: Dimensions.get('screen').width * 0.04,
    },
    contentTop: {
        flex: 5,
        paddingHorizontal: Dimensions.get('screen').width * 0.1,
    },
    contentBottom: {
        flex: 1,
        paddingHorizontal: Dimensions.get('screen').width * 0.1,
    },
    text: {
        fontFamily: fonts.text,
        fontSize: 18,

        textAlign: 'justify',
        textAlignVertical: 'center',
    },
    heading: {
        fontFamily: fonts.heading,
        marginTop: 12,
    },
    names: {
        fontFamily: fonts.text,
        fontSize: 18,

        textAlign: 'left',
        textAlignVertical: 'center',

        width: '100%',
    },
    smallText: {
        fontFamily: fonts.text,
        fontSize: 14,

        textAlign: 'center',
        textAlignVertical: 'center',
    },
});
