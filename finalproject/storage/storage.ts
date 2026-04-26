import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'TASKS';

export const saveTasks = async (tasks: any[]) => {
    await AsyncStorage.setItem(KEY, JSON.stringify(tasks));
};

export const getTasks = async () => {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
};