import React, { Component } from 'react';
import { View } from 'react-native';
import {
    AntDesign,
    Entypo,
    EvilIcons,
    Feather,
    FontAwesome,
    FontAwesome5,
    Fontisto,
    Foundation,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    Octicons,
    SimpleLineIcons,
    Zocial,
} from '@expo/vector-icons';
import colors from '../styles/colors';

export default class Icon extends Component {
    render() {
        const { iconFamily, iconName } = this.props;
        const size = this.props.size ?? 30;
        const color = this.props.color ?? colors.black;

        if (!iconFamily || !iconName) {
            return null;
        }

        return (
            <View>{this.renderIcon(iconFamily, iconName, size, color)}</View>
        );
    }

    renderIcon(iconFamily, iconName, size, color) {
        switch (iconFamily) {
            case 'AntDesign':
                return <AntDesign name={iconName} size={size} color={color} />;
                break;
            case 'Entypo':
                return <Entypo name={iconName} size={size} color={color} />;
                break;
            case 'EvilIcons':
                return <EvilIcons name={iconName} size={size} color={color} />;
                break;
            case 'Feather':
                return <Feather name={iconName} size={size} color={color} />;
                break;
            case 'FontAwesome':
                return (
                    <FontAwesome name={iconName} size={size} color={color} />
                );
                break;
            case 'FontAwesome5':
                return (
                    <FontAwesome5 name={iconName} size={size} color={color} />
                );
                break;
            case 'Fontisto':
                return <Fontisto name={iconName} size={size} color={color} />;
                break;
            case 'Foundation':
                return <Foundation name={iconName} size={size} color={color} />;
                break;
            case 'Ionicons':
                return <Ionicons name={iconName} size={size} color={color} />;
                break;
            case 'MaterialCommunityIcons':
                return (
                    <MaterialCommunityIcons
                        name={iconName}
                        size={size}
                        color={color}
                    />
                );
                break;
            case 'MaterialIcons':
                return (
                    <MaterialIcons name={iconName} size={size} color={color} />
                );
                break;
            case 'Octicons':
                return <Octicons name={iconName} size={size} color={color} />;
                break;
            case 'SimpleLineIcons':
                return (
                    <SimpleLineIcons
                        name={iconName}
                        size={size}
                        color={color}
                    />
                );
                break;
            case 'Zocial':
                return <Zocial name={iconName} size={size} color={color} />;
                break;
            default:
                return null;
        }
    }
}
