import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';

import colors from '../styles/colors';
import { globalStyles } from '../styles/global';

import Loading from '../components/Loading';
import ProblemCard from '../components/ProblemCard';

export default Problems = ({ navigation }) => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    function handleCardOnPress(problem) {
        navigation.navigate('ProblemDetails', { problem });
    }

    async function fetchProblems() {
        //const { data } = await api.problems.get(`url`);
        setTimeout(() => {
            if (!data) return setLoading(true);

            setProblems(data);
            setLoading(false);
        }, 1000);
    }

    useEffect(() => {
        fetchProblems();
    }, []);

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
        categoria: 'Lorem ipsum',
        descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis, risus eu sollicitudin aliquet, libero elit au vulputate nibh venenatis orci vestibulum viverra. Vivamus.  ',
        localizacao: {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [-46.5582212805748, -22.948336135223936],
            },
        },
        foto: { nome: 'fotoTeste', url: 'https://picsum.photos/600' },
        status: 'ABERTO',
        resposta: { descricao: '', data: Date.now(), usuario: '' },
        dataCriacao: Date.now(),
    },
    {
        _id: '2',
        usuario: '234234',
        categoria: 'Lorem ipsum',
        descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sodales semper. Ut vulputate nibh venenatis orci vestibulum viverra. Vivamus.  ',
        localizacao: {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [-46.5582212805748, -22.948336135223936],
            },
        },
        foto: { nome: 'fotoTeste', url: 'https://picsum.photos/600/350' },
        status: 'ANALISANDO',
        resposta: { descricao: '', data: Date.now(), usuario: '' },
        dataCriacao: Date.now(),
    },
    {
        _id: '3',
        usuario: '234234',
        categoria: 'Lorem ipsum',
        descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sodales semper. Ut vulputate nibh venenatis orci vestibulum viverra. Vivamus.  ',
        localizacao: {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [-46.5582212805748, -22.948336135223936],
            },
        },
        foto: { nome: 'fotoTeste', url: 'https://picsum.photos/350/600' },
        status: 'EXECUTANDO',
        resposta: { descricao: '', data: Date.now(), usuario: '' },
        dataCriacao: Date.now(),
    },
    {
        _id: '4',
        usuario: '234234',
        categoria: 'Lorem ipsum',
        descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sodales semper. Ut vulputate nibh venenatis orci vestibulum viverra. Vivamus.  ',
        localizacao: {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [-46.5582212805748, -22.948336135223936],
            },
        },
        foto: { nome: 'fotoTeste', url: 'https://picsum.photos/4000' },
        status: 'FINALIZADO',
        resposta: {
            descricao: 'Lorem Ipsum Executado',
            data: Date.now(),
            usuario: '123123123',
        },
        dataCriacao: Date.now(),
    },
    {
        _id: '5',
        usuario: '234234',
        categoria: 'Lorem ipsum',
        descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis, risus eu sollicitudin aliquet, libero elit au vulputate nibh venenatis orci vestibulum viverra. Vivamus.  ',
        localizacao: {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [-46.5582212805748, -22.948336135223936],
            },
        },
        foto: { nome: 'fotoTeste', url: 'https://picsum.photos/600' },
        status: 'ABERTO',
        resposta: { descricao: '', data: Date.now(), usuario: '' },
        dataCriacao: Date.now(),
    },
    {
        _id: '6',
        usuario: '234234',
        categoria: 'Lorem ipsum',
        descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sodales semper. Ut vulputate nibh venenatis orci vestibulum viverra. Vivamus.  ',
        localizacao: {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [-46.5582212805748, -22.948336135223936],
            },
        },
        foto: { nome: 'fotoTeste', url: 'https://picsum.photos/600/350' },
        status: 'ANALISANDO',
        resposta: { descricao: '', data: Date.now(), usuario: '' },
        dataCriacao: Date.now(),
    },
    {
        _id: '7',
        usuario: '234234',
        categoria: 'Lorem ipsum',
        descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sodales semper. Ut vulputate nibh venenatis orci vestibulum viverra. Vivamus.  ',
        localizacao: {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [-46.5582212805748, -22.948336135223936],
            },
        },
        foto: { nome: 'fotoTeste', url: 'https://picsum.photos/350/600' },
        status: 'EXECUTANDO',
        resposta: { descricao: '', data: Date.now(), usuario: '' },
        dataCriacao: Date.now(),
    },
    {
        _id: '8',
        usuario: '234234',
        categoria: 'Lorem ipsum',
        descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sodales semper. Ut vulputate nibh venenatis orci vestibulum viverra. Vivamus.  ',
        localizacao: {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [-46.5582212805748, -22.948336135223936],
            },
        },
        foto: { nome: 'fotoTeste', url: 'https://picsum.photos/4000' },
        status: 'FINALIZADO',
        resposta: {
            descricao: 'Lorem Ipsum Executado',
            data: Date.now(),
            usuario: '123123123',
        },
        dataCriacao: Date.now(),
    },
];