import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { Button } from 'react-native-paper';

const EraseData = () => {
    return (
        <Button
            mode="outlined"
            onPress={async () => {
                await AsyncStorage.clear()
            }}
            icon="remove"
        >
            Debug: destroy data
        </Button>
    );
}

export default EraseData;