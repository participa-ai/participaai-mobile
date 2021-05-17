import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Alert } from 'react-native';

import colors from '../styles/colors';
import { globalStyles } from '../styles/global';
import { processMessage } from '../utils/utils';

import * as problemasService from '../services/problemas';

import Loading from '../components/Loading';
import ProblemCard from '../components/ProblemCard';

export default Problems = ({ navigation, route }) => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [forceReload, setForceReload] = useState(false);

    function handleCardOnPress(problem) {
        navigation.navigate('ProblemDetails', { problem });
    }

    async function fetchProblems() {
        problemasService
            .listar()
            .then((response) => {
                if (!response.success) {
                    const message = processMessage(response.data.message);

                    Alert.alert('', message);
                    return;
                }

                setProblems(response.data);
                setLoading(false);
            })
            .catch((error) => {
                Alert.alert('Ops', 'Falha ao comunicar com o servidor!');
                console.error(error.message);
                setProblems([]);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchProblems();
    }, [forceReload]);

    if (route?.params?.forceReload) setForceReload(route?.params?.forceReload);

    if (loading) return <Loading />;

    return (
        <View style={[globalStyles.container, styles.view]}>
            <FlatList
                style={styles.flatList}
                data={problems}
                renderItem={({ item }) => (
                    <ProblemCard
                        data={item}
                        onPress={() => handleCardOnPress(item)}
                        style={styles.card}
                    />
                )}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        justifyContent: 'flex-start',
        backgroundColor: colors.background,
    },
    flatList: {
        flex: 1,
        width: '100%',
    },
    listContent: {
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    card: {
        height: Dimensions.get('screen').height * 0.208,
        marginBottom: 15,
    },
});

const data = [
    {
        _id: '1',
        usuario: '234234',
        categoria: {
            nome: 'Lorem Ipsum',
        },
        descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis, risus eu sollicitudin aliquet, libero elit au vulputate nibh venenatis orci vestibulum viverra. Vivamus.  ',
        localizacao: {
            type: 'Point',
            coordinates: [-46.5582212805748, -22.948336135223936],
        },
        foto: { nome: 'fotoTeste', url: 'https://picsum.photos/600' },
        status: 'ABERTO',
        resposta: {},
        dataCriacao: new Date(),
    },
    {
        _id: '2',
        usuario: '234234',
        categoria: {
            nome: 'Lorem Ipsum',
        },
        descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sodales semper. Ut vulputate nibh venenatis orci vestibulum viverra. Vivamus.  ',
        localizacao: {
            type: 'Point',
            coordinates: [-46.5582212805748, -22.948336135223936],
        },
        foto: { nome: 'fotoTeste', url: 'https://picsum.photos/600/350' },
        status: 'ANALISANDO',
        resposta: {},
        dataCriacao: new Date(),
    },
    {
        _id: '3',
        usuario: '234234',
        categoria: {
            nome: 'Lorem Ipsum',
        },
        descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sodales semper. Ut vulputate nibh venenatis orci vestibulum viverra. Vivamus.  ',
        localizacao: {
            type: 'Point',
            coordinates: [-46.5582212805748, -22.948336135223936],
        },
        foto: { nome: 'fotoTeste', url: 'https://picsum.photos/350/600' },
        status: 'EXECUTANDO',
        resposta: { descricao: '', data: new Date(), usuario: '' },
        dataCriacao: new Date(),
    },
    {
        _id: '4',
        usuario: '234234',
        categoria: {
            nome: 'Lorem Ipsum',
        },
        descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sodales semper. Ut vulputate nibh venenatis orci vestibulum viverra. Vivamus.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sodales semper. Ut vulputate nibh venenatis orci vestibulum viverra. Vivamus.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sodales semper. Ut vulputate nibh venenatis orci vestibulum viverra. Vivamus.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sodales semper. Ut vulputate nibh venenatis orci vestibulum viverra. Vivamus.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sodales semper. Ut vulputate nibh venenatis orci vestibulum viverra. Vivamus.  ',
        localizacao: {
            type: 'Point',
            coordinates: [-46.5582212805748, -22.948336135223936],
        },
        foto: { nome: 'fotoTeste', url: 'https://picsum.photos/4000' },
        status: 'FINALIZADO',
        resposta: {
            descricao:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis, risus eu sollicitudin aliquet, libero elit auctor lacus, ac cursus odio mi et est.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis, risus eu sollicitudin aliquet, libero elit auctor lacus, ac cursus odio mi et est.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis, risus eu sollicitudin aliquet, libero elit auctor lacus, ac cursus odio mi et est.',
            data: new Date(),
            usuario: '',
        },
        dataCriacao: new Date(),
    },
];
