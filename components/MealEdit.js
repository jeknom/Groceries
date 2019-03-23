import * as React from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { Dialog, Portal, Button, TextInput, Chip } from 'react-native-paper';

export default class MealEdit extends React.Component {
    state = {
        nameText: "",
        priceText: "",
    };

    render() {
        const { visible, onModify, onCancel, groceries } = this.props;

        const content = () => {
            if (groceries && groceries.length > 0)
                return (
                    <>
                        <TextInput
                            label='Meal'
                            mode='outlined'
                            value={this.state.nameText}
                            onChangeText={text => this.setState({ nameText: text })}
                        />
                        {groceries.map(g => <Chip key={g.name} style={styles.chip}>{g.name}</Chip>)}
                    </>
                );

            else
                return <Text>You need to add some groceries first.</Text>
        }

        return (
            <Portal>
                <Dialog visible={visible} onDismiss={() => onCancel()}>
                    <Dialog.Title>New meal</Dialog.Title>
                    <Dialog.Content>
                        {content()}
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            icon="add"
                            mode="outlined"
                            onPress={() => onModify({ name: this.state.nameText, price: this.state.priceText })}
                        >
                            Add
                        </Button>
                        <Button
                            mode="outlined"
                            onPress={() => onCancel()}
                        >
                            Cancel
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        );
    }
}

const styles = StyleSheet.create({
    chip: {
        margin: 5,
        padding: 4,
    }
});