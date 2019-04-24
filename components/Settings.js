import React from 'react';
import { AsyncStorage, View, StyleSheet, Alert } from 'react-native';
import { List } from 'react-native-paper';

class Settings extends React.Component {
    handleConfirmation = title => {
        Alert.alert(
            title,
            'Are you sure you would like to continue?',
            [
                { text: 'Get me out of here', style: 'cancel' },
                { text: 'I am sure', onPress: async () => await AsyncStorage.clear() }
            ]
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <List.Item
                    title={'Reset data'}
                    description={'This will erase all saved data.'}
                    right={() => <List.Icon icon='delete' />}
                    onPress={() => this.handleConfirmation('All data will be erased!')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        marginTop: 40,
    }
});

export default Settings;