import React from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import Index from './src/index';

export default class App extends React.Component {
    state = {
        isReady: false,
    };

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._cacheResourcesAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }

        return <Index />;
    }

    async _cacheResourcesAsync() {
        return Font.loadAsync({
            'roboto-light': require('./src/assets/fonts/Roboto-Light.ttf'),
            'roboto-regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
            'roboto-bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
        });
    }
}
