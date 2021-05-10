import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, View, Text, TextInput, Button, StyleSheet, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../styles/global';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { FontAwesome } from '@expo/vector-icons';

export default NewProblem = ({ navigation }) => {
    const [base64Image, setBase64Image] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [categories, setCategories] = useState([
        { label: 'Semáforo queimado', value: 'Semáforo queimado' },
        { label: 'Buraco na via', value: 'Buraco na via' }
    ]);

    // TODO: Carregar as categorias, usando useEffect, chamando a API

    function setBase64Img(texto) {
        setBase64Image(texto);
    }

    function callCamera() {
        navigation.navigate('CameraScreen', { setBase64Img: setBase64Img });
    }

    function removeImage() {
        setBase64Image(null);
    }

    function handleEnviar() {
        // TODO: Enviar o problema para a API
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <KeyboardAvoidingView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.form}>
                        <Text>Endereço</Text>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={categories}
                            setValue={setValue}
                            setItems={setCategories}
                            setOpen={setOpen}
                            style={styles.categories}
                            placeholder="Categorias"
                            textStyle={styles.textLabel}
                        />
                        <TextInput
                            style={[
                                styles.categories,
                                styles.descricao
                            ]}
                            placeholder="Descrição"
                        />
                        {
                            (base64Image === null) ?
                                <View style={styles.photoArea}>
                                    <Text style={styles.imageText}>
                                        Nenhuma foto capturada
                                    </Text>
                                    <TouchableOpacity>
                                        <FontAwesome
                                            style={styles.iconCamera}
                                            name='camera'
                                            onPress={callCamera}
                                        />
                                    </TouchableOpacity>
                                </View> :
                                <View style={styles.photoArea}>
                                    <Text style={styles.imageText}>
                                        Remover foto
                                    </Text>
                                    <TouchableOpacity>
                                        <FontAwesome
                                            style={styles.iconRemove}
                                            name='window-close'
                                            onPress={removeImage}
                                        />
                                    </TouchableOpacity>
                                </View>
                        }
                        <FlatButton onPress={handleEnviar} label="ENVIAR" />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    categories: {
        width: Dimensions.get('screen').width * 0.75,
        backgroundColor: colors.white,
        borderRadius: 15,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.orange,
        padding: 11,
        color: colors.black,
        fontFamily: fonts.heading,
        fontSize: 20,
    },
    descricao: {
        height: '30%',
        borderRadius: 15,
        textAlignVertical: 'top',
    },
    textLabel: {
        fontSize: 20,
        fontFamily: fonts.heading,
        color: colors.black,
    },
    photoArea: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconCamera: {
        color: '#40738B',
        fontSize: 40
    },
    iconRemove: {
        color: '#DC3545',
        fontSize: 40
    },
    imageText: {
        marginRight: 15
    }
});
