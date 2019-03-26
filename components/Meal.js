import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Chip, IconButton, Card, Title, Colors, Divider } from 'react-native-paper';

const Meal = ({ meal, onDelete }) => {

  const groceries = () => {
    if (meal.groceries && meal.groceries.length > 0)
      return meal.groceries.map(g =>
        <Chip
          key={g.name}
          mode='outlined'
        >
          {g.name}
        </Chip>
      );
    else
      return <Text>No groceries have been added to this meal.</Text>;
  }

  return (
    <>
      <Card style={styles.card}>
        <Title>{meal.name}</Title>
        <Card.Content>
          {groceries()}
          <IconButton
            icon="delete"
            color={Colors.red500}
            size={20}
            onPress={() => onDelete(meal)}
          />
        </Card.Content>
      </Card>
      <Divider />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 5,
  },
});

export default Meal;