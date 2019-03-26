import * as React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Dialog, Paragraph, Portal, Button, TextInput, Chip } from 'react-native-paper';

export default class MealEdit extends React.Component {
    state = {
        nameText: "",
        priceText: "",
        selectedGroceries: [],
    };

    render() {
        const { visible, onModify, onCancel, groceries } = this.props;

        const handleAdd = grocery => {
            const selectedCopy = [...this.state.selectedGroceries];

            if (selectedCopy.some(item => item.name === grocery.name))
                this.setState({ selectedGroceries: selectedCopy.filter(i => i.name !== grocery.name) })
            else {
                selectedCopy.push(grocery);
                this.setState({ selectedGroceries: selectedCopy });
            }
        }

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
                        <View style={styles.chipContainer}>
                            {groceries.map(g =>
                                <Chip
                                    key={g.name}
                                    style={styles.chip}
                                    selected={this.state.selectedGroceries.some(i => i.name === g.name)}
                                    onPress={() => handleAdd(g)}
                                >
                                    {g.name}
                                </Chip>
                            )}
                        </View>
                    </>
                );

            else
                return <Paragraph>You need to add some groceries first.</Paragraph>
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
                            onPress={() => onModify({ name: this.state.nameText, groceries: this.state.selectedGroceries })}
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
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 5,
        padding: 4,
    }
});