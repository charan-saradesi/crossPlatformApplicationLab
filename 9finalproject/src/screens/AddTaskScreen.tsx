import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function AddTaskScreen() {
    const [task, setTask] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>➕ Add Task</Text>

            <TextInput
                placeholder="Enter task..."
                value={task}
                onChangeText={setTask}
                style={styles.input}
            />

            <Button
                title="Save Task"
                onPress={() => {
                    console.log('Task:', task);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        marginBottom: 20,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 8,
    },
});