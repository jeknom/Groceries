import React from 'react';
import { ScrollView } from 'react-native';
import { TextInput, List, Checkbox, Divider, withTheme } from 'react-native-paper';

class MealList extends React.Component {
    state = { query: '' }

    render() {
        const { meals, selected, onSelect, theme } = this.props;
        const { query } = this.state;

        const queriedMeals = query === '' ? meals : meals.filter(m => m.name.toUpperCase().includes(query.toUpperCase()));
        const mealList = queriedMeals.map(m =>
            <React.Fragment key={m.name}>
                <List.Item
                    title={m.name}
                    right={() =>
                        <Checkbox
                            color={theme.colors.primary}
                            status={selected.some(s => s.name === m.name) ? 'checked' : 'unchecked'}
                        />
                    }
                    onPress={() => onSelect(m)}
                />
                <Divider />
            </React.Fragment>
        );

        return (
            <>
                <TextInput
                    style={{ margin: 10 }}
                    mode='outlined'
                    label='Search meals..'
                    value={query}
                    onChangeText={query => this.setState({ query })}
                />
                <ScrollView>
                    {mealList}
                </ScrollView>
            </>
        );
    }
}

export default withTheme(MealList);