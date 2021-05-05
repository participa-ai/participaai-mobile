import React from 'react';
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

export default Icon = ({ iconFamily, iconName, style, ...props }) => {
    const size = props.size ?? 30;
    const color = props.color ?? colors.black;

    if (!iconFamily || !iconName) {
        return null;
    }

    return (
        <View style={[{ ...style }]}>
            {renderIcon(iconFamily, iconName, size, color)}
        </View>
    );
};

// See icons at: https://icons.expo.fyi/

const renderIcon = (iconFamily, iconName, size, color) => {
    switch (iconFamily) {
        case 'AntDesign':
            return <AntDesign name={iconName} size={size} color={color} />;
        case 'Entypo':
            return <Entypo name={iconName} size={size} color={color} />;
        case 'EvilIcons':
            return <EvilIcons name={iconName} size={size} color={color} />;
        case 'Feather':
            return <Feather name={iconName} size={size} color={color} />;
        case 'FontAwesome':
            return <FontAwesome name={iconName} size={size} color={color} />;
        case 'FontAwesome5':
            return <FontAwesome5 name={iconName} size={size} color={color} />;
        case 'Fontisto':
            return <Fontisto name={iconName} size={size} color={color} />;
        case 'Foundation':
            return <Foundation name={iconName} size={size} color={color} />;
        case 'Ionicons':
            return <Ionicons name={iconName} size={size} color={color} />;
        case 'MaterialCommunityIcons':
            return (
                <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={color}
                />
            );
        case 'MaterialIcons':
            return <MaterialIcons name={iconName} size={size} color={color} />;
        case 'Octicons':
            return <Octicons name={iconName} size={size} color={color} />;
        case 'SimpleLineIcons':
            return (
                <SimpleLineIcons name={iconName} size={size} color={color} />
            );
        case 'Zocial':
            return <Zocial name={iconName} size={size} color={color} />;
        default:
            return null;
    }
};
