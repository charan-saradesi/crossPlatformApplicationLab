import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🏠 Home Screen</Text>

            <Button
                title="Go to Add Task"
                onPress={() => navigation.navigate('AddTask')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
    },
});