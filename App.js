import React from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import Index from './src/Index';

export default App = () => {
    const [isReady, setIsReady] = React.useState(false);

    async function _cacheResourcesAsync() {
        return Font.loadAsync({
            'roboto-light': require('./src/assets/fonts/Roboto-Light.ttf'),
            'roboto-regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
            'roboto-bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
        });
    }

    if (!isReady) {
        return (
            <AppLoading
                startAsync={_cacheResourcesAsync}
                onFinish={() => setIsReady(true)}
                onError={console.warn}
            />
        );
    }

    return <Index />;
};
