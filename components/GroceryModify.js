import React from 'react';
import { View, Slider, StyleSheet, TextInput } from 'react-native';
import { Button, Subheading } from 'react-native-paper';

export default class GroceryModify extends React.Component {
    state = {
        name: '',
        quantity: 0,
        price: 0,
        area: 1,
    }

    render() {
        const { name, quantity, price, area } = this.state;
        const { onSave } = this.props;

        return (
            <View style={styles.container}>
                <Subheading style={styles.subheading}>Name</Subheading>
                <TextInput
                    onChangeText={text => this.setState({ name: text })}
                    style={styles.textInput}
                />
                <Subheading style={styles.subheading}>Quantity: {this.state.quantity}</Subheading>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={20}
                    minimumTrackTintColor="#f45c42"
                    maximumTrackTintColor="#0062ff"
                    thumbTintColor="#151516"
                    onValueChange={ value => this.setState({ quantity: Math.round(value) })}
                />
                <Subheading style={styles.subheading}>Price: {`${this.state.price}€`}</Subheading>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={15}
                    minimumTrackTintColor="#f45c42"
                    maximumTrackTintColor="#0062ff"
                    thumbTintColor="#151516"
                    onValueChange={ value => this.setState({ price: value < 10 ? Math.round( value * 10 ) / 10 : Math.round(price + 5) })}
                />
                <Subheading style={styles.subheading}>Area: {this.state.area}</Subheading>
                <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={10}
                    minimumTrackTintColor="#f45c42"
                    maximumTrackTintColor="#0062ff"
                    thumbTintColor="#151516"
                    onValueChange={ value => this.setState({ area: Math.round(value) })}
                />
                <Button
                    mode='contained'
                    onPress={() => onSave()}
                    style={styles.saveButton}
                >
                    Save
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        justifyContent: 'center',
    },
    subheading: {
        margin: 6,
    },
    textInput: {
        borderBottomWidth: 0.5,
        borderColor: '#d6d7da',
        width: 350,
        margin: 8
    },
    slider: {
        alignItems: 'center',
        margin: 8,
        width: 350,
        height: 40
    },
    saveButton: {
        padding: 12,
        margin: 24,
    }
})