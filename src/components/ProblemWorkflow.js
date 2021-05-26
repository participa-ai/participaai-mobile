import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import Workflow1 from '../assets/images/workflow-1.svg';
import Workflow2 from '../assets/images/workflow-2.svg';
import Workflow3 from '../assets/images/workflow-3.svg';
import Workflow4 from '../assets/images/workflow-4.svg';

export default ProblemWorkflow = ({ problem, style }) => {
    function renderSvg() {
        const calculatedWidth = Dimensions.get('screen').width * 0.8;
        const calculatedHeight = Dimensions.get('screen').height * 0.05;

        switch (problem?.status?.toLowerCase()) {
            case 'analisando':
                return (
                    <Workflow2
                        style={styles.workflow}
                        width={'100%'}
                        height={'100%'}
                        // width={calculatedWidth}
                        // height={calculatedHeight}
                    />
                );
            case 'executando':
                return (
                    <Workflow3
                        style={styles.workflow}
                        width={'100%'}
                        height={'100%'}
                        // width={calculatedWidth}
                        // height={calculatedHeight}
                    />
                );
            case 'finalizado':
                return (
                    <Workflow4
                        style={styles.workflow}
                        width={'100%'}
                        height={'100%'}
                        // width={calculatedWidth}
                        // height={calculatedHeight}
                    />
                );
            default:
                return (
                    <Workflow1
                        style={styles.workflow}
                        width={'100%'}
                        height={'100%'}
                        // width={calculatedWidth}
                        // height={calculatedHeight}
                    />
                );
        }
    }

    return <View style={style}>{renderSvg()}</View>;
};

const styles = StyleSheet.create({
    workflow: {
        padding: 5,
        // borderColor: 'black',
        // borderStyle: 'solid',
        // borderWidth: 1,
    },
});
