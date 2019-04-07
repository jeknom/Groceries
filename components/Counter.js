import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton, Colors } from 'react-native-paper';

export default class Counter extends React.Component {
    render() {
        const { count, onIncrease, onDecrease } = this.props;

        return (
            <View style={styles.container}>
                <IconButton
                    icon='remove'
                    onPress={onDecrease}
                    disabled={count <= 0}
                    color={Colors.red800}
                />
                <Text style={{ margin: 14 }}>{count}</Text>
                <IconButton
                    icon='add'
                    onPress={onIncrease}
                    color={Colors.blue400}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});