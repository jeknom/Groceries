import React from 'react';
import { AsyncStorage, View, StyleSheet, Alert } from 'react-native';
import { List } from 'react-native-paper';

class Settings extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <List.Item
                    titleEllipsizeMode='middle'
                    title={'Erase data'}
                    description={'This will erase all saved data.'}
                    right={() => <List.Icon icon='delete' />}
                    onPress={() => {
                        Alert.alert(
                            'You are about to delete all data',
                            'Are you sure you would like to continue?',
                            [
                                { text: 'No way, Jose', style: 'cancel' },
                                { text: 'I am sure', onPress: async () => await AsyncStorage.clear() }
                            ]
                        )
                    }}
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