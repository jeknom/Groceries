import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Chip, Button, Card, Title } from 'react-native-paper';

const Meal = ({ meal, onDelete }) => {

  const groceries = () => {
    if (meal.groceries && meal.groceries.length > 0)
      return meal.groceries.map(g =>
        <Chip
          style={styles.chip}
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
    <Card style={styles.card}>
      <Title style={styles.title}>{meal.name}</Title>
      <Card.Content style={styles.content}>
        {groceries()}
      </Card.Content>
      <Card.Actions>
        <Button
          icon="delete"
          mode="contained"
          onPress={() => onDelete(meal)}
        />
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  title: {
    margin: 20,
  },
  content: {
    margin: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
  }
});

export default Meal;