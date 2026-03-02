import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './component/Task';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [searchText, setSearchText] = useState('');

  const handleAddTask = () => {
     Keyboard.dismiss();

  if (isEditing) {
    // Update the task
    let itemsCopy = [...taskItems];
    itemsCopy[editingIndex] = task;
    setTaskItems(itemsCopy);
    console.log('Task updated:', task);
    setIsEditing(false);
    setEditingIndex(null);
  } else {
    // Add new task
    setTaskItems([...taskItems, task]);
  }

  setTask('');
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  const updateTask = (text, index) => {
    Keyboard.dismiss();

  if (isEditing) {
    let itemsCopy = [...taskItems];
    itemsCopy[editingIndex] = task;
    setTaskItems(itemsCopy);
    console.log('Task updated:', task);
    setIsEditing(false);
    setEditingIndex(null);
  } else {
    setTaskItems([...taskItems, task]);
  }

  setTask('');
  };

  const filteredTasks = taskItems.filter(item => 
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      >
      <View style={styles.textWrapper}>
        <Text style={styles.sectionTitle}>Today's Task</Text>

        <View style={styles.searchContainer}>
            <TextInput 
              style={styles.searchInput}
              placeholder='Search tasks...'
              value={searchText}
              onChangeText={text => setSearchText(text)}
            />
          </View>
        
        <View style={styles.items}>
            {filteredTasks.map((item, index) => {
              const originalIndex = taskItems.indexOf(item);
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item} onEdit={() => {
                  setTask(item);
                  setIsEditing(true);
                  setEditingIndex(index);
                }} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      </ScrollView>
      <View>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput placeholder='Add a new task' style={styles.input} value={task} onChangeText={text => setTask(text)} />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>

        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAF6',
  },
  textWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A237E',
  },
  searchContainer: {
    marginBottom: 10,
  },
  items: {
    paddingTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  addWrapper:{
    width: 45,
    height: 45,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginLeft: 8,
  },
  addText: {
    fontSize: 24,
    color: '#1A237E',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 300,
  },
});
