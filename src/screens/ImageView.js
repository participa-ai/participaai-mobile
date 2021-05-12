import React from 'react';
import { View, StyleSheet } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import colors from '../styles/colors';
import { globalStyles } from '../styles/global';

export default ImageView = ({ route }) => {
    const { imageUrl } = route.params;
    console.log(imageUrl);

    return (
        <View style={[globalStyles.container, styles.view]}>
            <ImageViewer
                style={globalStyles.container}
                imageUrls={[{ url: imageUrl }]}
                backgroundColor={colors.background}
                renderIndicator={() => {}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        backgroundColor: colors.background,
    },
});
