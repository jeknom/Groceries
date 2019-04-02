import React from 'react';
import { Card, Title, List, Paragraph, Button } from 'react-native-paper';

const Meal = ({ meal, onDelete }) => {
    console.log(meal)
    const groceryItems = meal.groceries.map(g => <List.Item key={g.name} title={g.name} description={g.price} />);
    const content = meal.groceries.length > 0 ? groceryItems : <Paragraph>There are no groceries in this meal</Paragraph>

    return (
        <Card>
            <Card.Content>
                <Title>{meal.name}</Title>
                {content}
            </Card.Content>
            <Card.Actions>
                <Button icon='delete' onPress={() => onDelete(meal)}>Delete</Button>
            </Card.Actions>
        </Card>
    );
}

export default Meal;