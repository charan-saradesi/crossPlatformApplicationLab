import { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    StyleSheet, ScrollView, Platform, Animated
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function StudentForm({ addStudent }) {
    const [form, setForm] = useState({ name: '', email: '', rollNo: '', course: '' });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.rollNo.trim()) e.rollNo = 'Roll number is required';
        return e;
    };

    const handleSubmit = () => {
        const e = validate();
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        setErrors({});
        addStudent(form);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setForm({ name: '', email: '', rollNo: '', course: '' });
        }, 1500);
    };

    const update = (key, val) => {
        setForm(prev => ({ ...prev, [key]: val }));
        if (errors[key]) setErrors(prev => ({ ...prev, [key]: null }));
    };

    return (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

            <View style={styles.headerBlock}>
                <Text style={styles.tag}>NEW ENTRY</Text>
                <Text style={styles.title}>Enrol a Student</Text>
                <Text style={styles.desc}>Fill in the details to add a student to the register.</Text>
            </View>

            <View style={styles.card}>

                <View style={styles.field}>
                    <Text style={styles.label}>Full Name <Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={[styles.input, errors.name && styles.inputError]}
                        value={form.name}
                        onChangeText={v => update('name', v)}
                        placeholder="e.g. Arjun Sharma"
                        placeholderTextColor="#8a7a6a"
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Roll Number <Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={[styles.input, errors.rollNo && styles.inputError]}
                        value={form.rollNo}
                        onChangeText={v => update('rollNo', v)}
                        placeholder="e.g. CS2024001"
                        placeholderTextColor="#8a7a6a"
                        autoCapitalize="characters"
                    />
                    {errors.rollNo && <Text style={styles.errorText}>{errors.rollNo}</Text>}
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        value={form.email}
                        onChangeText={v => update('email', v)}
                        placeholder="e.g. arjun@college.edu"
                        placeholderTextColor="#8a7a6a"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Course</Text>
                    <View style={styles.pickerWrap}>
                        <Picker
                            selectedValue={form.course}
                            onValueChange={v => update('course', v)}
                            style={styles.picker}
                            dropdownIconColor="#8a7a6a"
                        >
                            <Picker.Item label="— Select Course —" value="" color="#8a7a6a" />
                            <Picker.Item label="B.Tech CSE" value="B.Tech CSE" />
                            <Picker.Item label="B.Tech ECE" value="B.Tech ECE" />
                            <Picker.Item label="BCA" value="BCA" />
                            <Picker.Item label="MCA" value="MCA" />
                            <Picker.Item label="MBA" value="MBA" />
                        </Picker>
                    </View>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={[styles.submitBtn, submitted && styles.submitBtnSuccess]}
                        onPress={handleSubmit}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.submitBtnText}>
                            {submitted ? '✓  Enrolled!' : 'Add to Register'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.clearBtn}
                        onPress={() => { setForm({ name: '', email: '', rollNo: '', course: '' }); setErrors({}); }}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.clearBtnText}>Clear</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: { flex: 1, backgroundColor: '#ede7d9' },
    container: { padding: 20, paddingBottom: 40 },

    headerBlock: { marginBottom: 20 },
    tag: {
        fontSize: 10, letterSpacing: 3, color: '#c0392b',
        fontWeight: '700', marginBottom: 4,
    },
    title: {
        fontSize: 26, fontWeight: '800', color: '#1a1410',
        letterSpacing: 0.3,
    },
    desc: { fontSize: 13, color: '#8a7a6a', marginTop: 4, fontStyle: 'italic' },

    card: {
        backgroundColor: '#f5f0e8',
        borderRadius: 4,
        padding: 20,
        borderWidth: 1,
        borderColor: '#c8b89a',
        shadowColor: '#1a1410',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 0,
        elevation: 4,
    },

    field: { marginBottom: 18 },
    label: {
        fontSize: 11, letterSpacing: 1.5, fontWeight: '700',
        color: '#4a3f35', textTransform: 'uppercase', marginBottom: 6,
    },
    required: { color: '#c0392b' },
    input: {
        backgroundColor: '#faf6ee',
        borderWidth: 1,
        borderColor: '#c8b89a',
        borderRadius: 3,
        padding: Platform.OS === 'ios' ? 12 : 10,
        fontSize: 15,
        color: '#1a1410',
        borderBottomWidth: 2,
    },
    inputError: { borderColor: '#c0392b', borderBottomColor: '#c0392b' },
    errorText: { fontSize: 11, color: '#c0392b', marginTop: 4 },

    pickerWrap: {
        backgroundColor: '#faf6ee',
        borderWidth: 1,
        borderColor: '#c8b89a',
        borderRadius: 3,
        borderBottomWidth: 2,
        overflow: 'hidden',
    },
    picker: { color: '#1a1410', height: Platform.OS === 'ios' ? 150 : 50 },

    actions: { flexDirection: 'row', gap: 10, marginTop: 8 },

    submitBtn: {
        flex: 1, backgroundColor: '#c0392b',
        paddingVertical: 13, borderRadius: 3,
        alignItems: 'center',
    },
    submitBtnSuccess: { backgroundColor: '#2a5c3f' },
    submitBtnText: { color: '#fff', fontWeight: '700', fontSize: 14, letterSpacing: 0.5 },

    clearBtn: {
        paddingVertical: 13, paddingHorizontal: 20,
        borderRadius: 3, borderWidth: 1, borderColor: '#c8b89a',
        alignItems: 'center',
    },
    clearBtnText: { color: '#4a3f35', fontWeight: '600', fontSize: 14 },
});