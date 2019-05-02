import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, Headline, List, Button, Surface } from 'react-native-paper';

export default class ShopPlaylist extends React.Component {
    state = { groceryList: [] };

    componentDidMount = () => {
        const { shoppingList } = this.props;

        let groceries = [];

        shoppingList.forEach(m => {
            m.groceries.forEach(g => {
                const index = groceries.findIndex(i => i.name === g.name);

                if (index !== -1) {
                    groceries[index].quantity += g.quantity;
                    m.groceries = m.groceries.filter(g => g.name !== groceries[index].name);
                }
            })

            groceries = groceries.concat(m.groceries)
        });

        this.setState({ groceryList: groceries.sort((a, b) => a.layout - b.layout) });
    }

    handlePickup = () => {
        const groceryList = [...this.state.groceryList];
        groceryList.shift();
        this.setState({ groceryList });

        if (groceryList.length <= 0) this.props.onDone();
    }

    render() {
        const { groceryList } = this.state;

        const checklist =
            <ScrollView style={styles.list}>
                {groceryList.map(g =>
                    <List.Item
                        key={g.name}
                        title={g.name}
                        description={'Quantity: ' + g.quantity + ', Layout: ' + g.layout}
                    />
                )}
            </ScrollView>;

        const surfaceContent = () => {
            const headline = groceryList[0] ? groceryList[0].name : 'There are no groceries.';
            const quantity = groceryList[0] ? groceryList[0].quantity : '-';
            const layout = groceryList[0] ? groceryList[0].layout : '-';

            return (
                <>
                    <Headline>{headline}</Headline>
                    <Text>Quantity: {quantity}</Text>
                    <Text>Layout: {layout}</Text>
                </>
            );
        }

        return (
            <>
                {checklist}
                <Surface style={styles.surface}>
                    {surfaceContent()}
                    <Button
                        style={styles.pickupButton}
                        dark={true}
                        mode='contained'
                        onPress={() => this.handlePickup()}
                    >
                        Pickup
                    </Button>
                </Surface>
            </>
        );
    }
}

styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    surface: {
        flex: 0.7,
        margin: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    pickupButton: {
        padding: 10,
        marginTop: 20,
        borderRadius: 50,
    }
});