import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

const initialHabits = [
  { id: '1', name: 'Exercise', count: 0, type: 'good' },
  { id: '2', name: 'Meditate', count: 0, type: 'good' },
  { id: '3', name: 'Smoke', count: 0, type: 'bad' },
  { id: '4', name: 'Drink water', count: 0, type: 'good' },
];

export default function HabitTrackerScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [habits, setHabits] = useState(initialHabits);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const updateHabitCount = (id, increment) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, count: Math.max(0, habit.count + increment) } : habit
    ));
  };

  const renderSwipeableActions = (habit, increment) => {
    return (
      <TouchableOpacity
        style={[
          styles.swipeAction,
          { backgroundColor: increment > 0 ? '#4CAF50' : '#F44336' }
        ]}
        onPress={() => updateHabitCount(habit.id, increment)}
      >
        <Text style={styles.swipeActionText}>{increment > 0 ? '+' : '-'}</Text>
      </TouchableOpacity>
    );
  };

  const renderHabitItem = ({ item }) => (
    <ReanimatedSwipeable
      renderLeftActions={() => renderSwipeableActions(item, -1)}
      renderRightActions={() => renderSwipeableActions(item, 1)}
    >
      <View style={[styles.habitItem, { borderColor: item.type === 'good' ? '#4CAF50' : '#F44336' }]}>
        <Text style={styles.habitName}>{item.name}</Text>
        <Text style={styles.habitCount}>{item.count}</Text>
      </View>
    </ReanimatedSwipeable>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.datePickerButton}>Change Date</Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <Text>Datepicker</Text>
      )}
      <FlatList
        data={habits}
        renderItem={renderHabitItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  datePickerButton: {
    color: '#2196F3',
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  habitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 4,
    marginBottom: 1,
  },
  habitName: {
    fontSize: 16,
  },
  habitCount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  swipeAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  swipeActionText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

