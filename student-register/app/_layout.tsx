import { useState, createContext, useContext } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export interface Student {
  id: number;
  name: string;
  email: string;
  rollNo: string;
  course: string;
}

interface StudentsContextType {
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
}

export const StudentsContext = createContext<StudentsContextType>({
  students: [],
  addStudent: () => {},
});

export const useStudents = () => useContext(StudentsContext);

export default function Layout() {
  const [students, setStudents] = useState<Student[]>([]);

  const addStudent = (student: Omit<Student, 'id'>) => {
    setStudents(prev => [{ ...student, id: Date.now() }, ...prev]);
  };

  return (
    <StudentsContext.Provider value={{ students, addStudent }}>
      <Tabs
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: '#1a1410' },
          headerTintColor: '#f5f0e8',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
          tabBarStyle: { backgroundColor: '#1a1410', borderTopColor: '#3a2f25' },
          tabBarActiveTintColor: '#c0392b',
          tabBarInactiveTintColor: '#8a7a6a',
          tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
            let iconName: keyof typeof Ionicons.glyphMap;
            if (route.name === 'index') {
              iconName = focused ? 'person-add' : 'person-add-outline';
            } else {
              iconName = focused ? 'list' : 'list-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tabs.Screen
          name="index"
          options={{ title: 'Student Register', tabBarLabel: 'Enrol' }}
        />
        <Tabs.Screen
          name="records"
          options={{ title: 'Records', tabBarLabel: 'Records' }}
        />
      </Tabs>
    </StudentsContext.Provider>
  );
}
