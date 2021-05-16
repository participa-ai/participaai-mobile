import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    Dimensions,
    Image,
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default ProblemCard = ({ data, onPress, style }) => {
    return (
        <View style={style}>
            <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
                <View style={styles.content}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            defaultSource={require('../assets/images/default-placeholder.png')}
                            source={{ uri: data?.foto?.uri }}
                        />
                        {data?.resposta?.descricao ? (
                            <Icon
                                style={styles.icon}
                                iconFamily="Ionicons"
                                iconName="checkmark-circle"
                                size={Dimensions.get('screen').height * 0.05}
                                color={colors.orange}
                            />
                        ) : (
                            <></>
                        )}
                    </View>
                    <Text style={styles.text} numberOfLines={6}>
                        {data?.descricao}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    touchableOpacity: {
        flex: 1,
        padding: 15,

        backgroundColor: colors.white,
        borderRadius: 7,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
    },
    imageContainer: {
        borderRadius: 7,
        backgroundColor: 'black',
        marginRight: 15,
    },
    image: {
        height: 132,
        width: 132,
        resizeMode: 'cover',
        borderRadius: 7,
    },
    icon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    text: {
        flex: 1,
        color: colors.black,
        fontFamily: fonts.text,
        fontSize: 17,
        textAlignVertical: 'center',
    },
});
