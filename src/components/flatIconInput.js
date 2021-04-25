import React, { Component } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import colors from '../styles/colors';
import Icon from './icon';

export default class FlatIconInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
        };
    }

    render() {
        const {
            iconFamily,
            iconName,
            style,
            maskType,
            ...inputProps
        } = this.props;

        return (
            <View style={style}>
                <View style={componentStyles.view}>
                    {iconFamily && iconName ? (
                        <Icon iconFamily={iconFamily} iconName={iconName} />
                    ) : null}

                    {maskType ? (
                        <TextInputMask
                            type={maskType}
                            value={this.state.text}
                            onChangeText={(text) => {
                                this.setState({
                                    text: text,
                                });
                            }}
                            style={componentStyles.textInput}
                            ref={(input) => {
                                this.input = input;
                            }}
                            {...inputProps}
                        />
                    ) : (
                        <TextInput
                            style={componentStyles.textInput}
                            ref={(input) => {
                                this.input = input;
                            }}
                            {...inputProps}
                        />
                    )}
                </View>
            </View>
        );
    }

    focus() {
        this.input.focus();
    }
}

const componentStyles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        padding: 12,
        width: Dimensions.get('screen').width * 0.75,

        backgroundColor: colors.white,

        borderRadius: 50,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.orange,
    },
    textInput: {
        flex: 1,
        color: colors.black,
        textTransform: 'uppercase',

        fontFamily: 'roboto-bold',
        fontSize: 20,

        marginLeft: 10,
    },
});
