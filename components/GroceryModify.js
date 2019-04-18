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
        const { onSave } = this.props;

        return (
            <View>
                <Subheading style={styles.subheading}>Name</Subheading>
                <TextInput
                    onChangeText={text => this.setState({ name: text })}
                    style={{borderBottomWidth: 0.5, borderColor: '#d6d7da', width: 300}}
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
                    maximumValue={100}
                    minimumTrackTintColor="#f45c42"
                    maximumTrackTintColor="#0062ff"
                    thumbTintColor="#151516"
                    onValueChange={ value => this.setState({ price: Math.round(value) })}
                />
                <Subheading style={styles.subheading}>Area: {this.state.area}</Subheading>
                <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={20}
                    minimumTrackTintColor="#f45c42"
                    maximumTrackTintColor="#0062ff"
                    thumbTintColor="#151516"
                    onValueChange={ value => this.setState({ area: Math.round(value) })}
                />
                <Button mode='outlined'>Save</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listSection: {

    },
    subheading: {
        margin: 6,
    },
    slider: {
        margin: 6,
        width: 300,
        height: 40
    },
})