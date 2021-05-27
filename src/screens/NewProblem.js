import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Location from 'expo-location';
import { Formik } from 'formik';
import * as yup from 'yup';

import { globalStyles } from '../styles/global';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { processMessage } from '../utils/utils';

import * as categoriasService from '../services/categorias';
import * as problemasService from '../services/problemas';

export default NewProblem = ({ navigation, route }) => {
    const [isWaiting, setIsWaiting] = useState(false);
    const [base64Image, setBase64Image] = useState(null);
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [endereco, setEndereco] = useState('');
    const [loadingCategories, setLoadingCategories] = useState(true);

    const newProblemInitialValues = {
        localizacao: {
            coordinates: [route.params.longitude, route.params.latitude],
        },
        categoria: '',
        descricao: '',
    };

    const newProblemSchema = yup.object({
        categoria: yup.string().required('Selecione uma categoria'),
        descricao: yup.string().required('Descreva o problema'),
        localizacao: yup.object().shape({
            coordinates: yup
                .array()
                .compact()
                .ensure()
                .of(yup.number())
                .min(2, 'Localização inválida')
                .max(2, 'Localização inválida'),
        }),
    });

    useEffect(() => {
        Location.reverseGeocodeAsync({
            latitude: route.params.latitude,
            longitude: route.params.longitude,
        })
            .then((addressesInformations) => {
                let addressInformation = null;
                let address = null;
                let number = null;
                let city = null;
                let completeAddress = 'Sem informações do endereço';

                if (addressesInformations.length <= 0) {
                    setEndereco(completeAddress);
                    return;
                }

                addressInformation = addressesInformations[0];

                if (addressInformation.street)
                    address = addressInformation.street;

                if (addressInformation.name) number = addressInformation.name;

                if (addressInformation.subregion)
                    city = addressInformation.subregion;

                if (address) {
                    completeAddress = address;
                    completeAddress += number ? `, ${number}` : '';
                    completeAddress += city ? `,\n${city}` : '';
                }

                setEndereco(completeAddress);
            })
            .catch((err) => console.log(err));
    }, []);

    async function fetchCategories() {
        setLoadingCategories(true);
        categoriasService
            .listar()
            .then((response) => {
                if (!response.success) {
                    const message = processMessage(response.data.message);

                    Alert.alert('', message);
                    return;
                }

                const fetchedCategories = response.data
                    .map((category) => {
                        return {
                            label: category.nome,
                            value: category._id,
                        };
                    })
                    .sort((a, b) => {
                        const labelA = a.label.toLowerCase(),
                            labelB = b.label.toLowerCase();
                        if (labelA < labelB) return -1;
                        if (labelA > labelB) return 1;
                        return 0;
                    });

                setCategories(fetchedCategories);
                setLoadingCategories(false);
            })
            .catch((error) => {
                setLoadingCategories(false);
                Alert.alert('Ops', 'Falha ao comunicar com o servidor!');
                console.error(error.message);
            });
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    function setBase64Img(texto) {
        setBase64Image(texto);
    }

    function callCamera() {
        navigation.navigate('CameraScreen', { setBase64Img: setBase64Img });
    }

    function removeImage() {
        setBase64Image(null);
    }

    async function uploadFoto(problemaId, foto) {
        try {
            const response = await problemasService.uploadFoto(
                problemaId,
                foto
            );
            return response;
        } catch (error) {
            return {
                success: false,
                data: {
                    message: error.message,
                },
            };
        }
    }

    async function handleEnviar(formData, actions) {
        setIsWaiting(true);

        try {
            const response = await problemasService.cadastrar(formData);

            if (!response.success) {
                const message = processMessage(response.data.message);

                Alert.alert('', message);
                setIsWaiting(false);
                return;
            }

            if (base64Image) {
                const uploadResponse = await uploadFoto(
                    response?.data?._id,
                    base64Image
                );

                if (!uploadResponse.success) {
                    const message = processMessage(uploadResponse.data.message);
                    Alert.alert('', message);
                }
            }

            setIsWaiting(false);
            actions.resetForm();
            setBase64Image(null);

            navigation.popToTop();
            navigation.navigate('Confirmation', {
                text: 'Problema enviado, obrigado por participar, acompanhe o andamento em sua tela de problemas.',
                buttonText: 'OK',
                navigateScreen: 'ProblemsStack',
                navigateParams: {
                    screen: 'Problems',
                    params: {
                        forceReload: true,
                    },
                },
                popToTop: true,
            });
        } catch (error) {
            console.error(error.message);
            setIsWaiting(false);
            Alert.alert('Ops', 'Falha ao comunicar com o servidor!');
        }
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <KeyboardAvoidingView style={globalStyles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Formik
                        initialValues={newProblemInitialValues}
                        validationSchema={newProblemSchema}
                        onSubmit={(values, actions) => {
                            handleEnviar(values, actions);
                        }}
                    >
                        {(formikProps) => (
                            <View style={styles.form}>
                                <Text style={styles.address}>{endereco}</Text>

                                <Text style={globalStyles.errorText}>
                                    {formikProps.touched.categoria &&
                                        formikProps.errors.categoria}
                                </Text>
                                <DropDownPicker
                                    open={open}
                                    items={categories}
                                    loading={loadingCategories}
                                    value={formikProps.values.categoria}
                                    setValue={(callback) => {
                                        formikProps.setFieldValue(
                                            'categoria',
                                            callback()
                                        );
                                    }}
                                    onBlur={formikProps.handleBlur('categoria')}
                                    setItems={setCategories}
                                    setOpen={setOpen}
                                    style={styles.categories}
                                    placeholder="Categorias"
                                    textStyle={styles.listText}
                                    labelStyle={styles.listLabel}
                                    placeholderStyle={styles.listPlaceholder}
                                    searchPlaceholder="Pesquisar..."
                                    searchContainerStyle={
                                        styles.searchContainer
                                    }
                                    searchTextInputStyle={
                                        styles.searchTextInput
                                    }
                                    listItemContainerStyle={
                                        styles.listItemContainer
                                    }
                                    selectedItemContainerStyle={
                                        styles.selectedItemContainer
                                    }
                                    itemSeparator={true}
                                    itemSeparatorStyle={styles.itemSeparator}
                                    listMode="MODAL"
                                    modalProps={{
                                        animationType: 'slide',
                                        onRequestClose: () => {
                                            setOpen(!open);
                                        },
                                    }}
                                    labelProps={{
                                        numberOfLines: 1,
                                        ellipsizeMode: 'tail',
                                    }}
                                    translation={{
                                        NOTHING_TO_SHOW: 'Nada para mostrar...',
                                    }}
                                />
                                <Text style={globalStyles.errorText}>
                                    {formikProps.touched.descricao &&
                                        formikProps.errors.descricao}
                                </Text>
                                <TextInput
                                    style={[
                                        styles.categories,
                                        styles.descricao,
                                    ]}
                                    placeholder="Descrição"
                                    multiline
                                    onChangeText={formikProps.handleChange(
                                        'descricao'
                                    )}
                                    value={formikProps.values.descricao}
                                    onBlur={formikProps.handleBlur('descricao')}
                                />
                                {base64Image === null ? (
                                    <View style={styles.photoArea}>
                                        <Text style={styles.imageText}>
                                            Nenhuma foto capturada
                                        </Text>
                                        <TouchableOpacity>
                                            <FontAwesome
                                                style={styles.iconCamera}
                                                name="camera"
                                                onPress={callCamera}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View style={styles.photoArea}>
                                        <Text style={styles.imageText}>
                                            Remover foto
                                        </Text>
                                        <TouchableOpacity>
                                            <FontAwesome
                                                style={styles.iconRemove}
                                                name="window-close"
                                                onPress={removeImage}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                <FlatButton
                                    label="ENVIAR"
                                    isWaiting={isWaiting}
                                    disabled={isWaiting}
                                    onPress={formikProps.handleSubmit}
                                />
                            </View>
                        )}
                    </Formik>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    address: {
        width: Dimensions.get('screen').width * 0.75,
        textAlign: 'center',
        fontFamily: fonts.text,
        fontSize: 16,
        marginTop: Dimensions.get('screen').height * 0.01,
        marginBottom: Dimensions.get('screen').height * 0.025,
    },
    categories: {
        width: Dimensions.get('screen').width * 0.75,
        backgroundColor: colors.white,
        borderRadius: 15,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.orange,
        padding: 12,
    },
    listText: {
        fontSize: 20,
        fontFamily: fonts.text,
        color: colors.black,
    },
    listLabel: {
        fontFamily: fonts.heading,
    },
    listPlaceholder: {
        fontFamily: fonts.heading,
    },
    searchContainer: {
        paddingVertical: 20,
        borderBottomColor: colors.orange,
    },
    searchTextInput: {
        borderColor: '#c3c3c3',
    },
    listItemContainer: {
        height: Dimensions.get('screen').height * 0.1,
    },
    selectedItemContainer: {
        backgroundColor: '#f3f3f3',
    },
    itemSeparator: {
        backgroundColor: '#ddd',
        width: '90%',
        alignSelf: 'center',
    },
    descricao: {
        height: '40%',
        width: Dimensions.get('screen').width * 0.75,
        padding: 11,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.orange,
        borderRadius: 15,
        backgroundColor: colors.white,
        textAlignVertical: 'top',
        fontFamily: fonts.text,
        fontSize: 18,
        marginBottom: Dimensions.get('screen').height * 0.042,
    },
    photoArea: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Dimensions.get('screen').height * 0.042,
    },
    iconCamera: {
        color: '#40738B',
        fontSize: 40,
    },
    iconRemove: {
        color: '#DC3545',
        fontSize: 40,
    },
    imageText: {
        marginRight: 15,
    },
});
