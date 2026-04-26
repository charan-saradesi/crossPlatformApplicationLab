import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStudents, Student } from './_layout';

function StudentRow({ item, index }: { item: Student; index: number }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowIndex}>{String(index + 1).padStart(2, '0')}</Text>
      <View style={styles.rowMain}>
        <Text style={styles.rowName}>{item.name}</Text>
        <Text style={styles.rowEmail}>{item.email || '—'}</Text>
      </View>
      <View style={styles.rowRight}>
        <Text style={styles.rowRoll}>{item.rollNo}</Text>
        {item.course ? (
          <View style={styles.courseBadge}>
            <Text style={styles.courseBadgeText}>{item.course}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

export default function RecordsScreen() {
  const { students } = useStudents();

  if (students.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="document-text-outline" size={56} color="#c8b89a" />
        <Text style={styles.emptyTitle}>No Records Yet</Text>
        <Text style={styles.emptyDesc}>Switch to the Enrol tab to add your first student.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerBlock}>
        <Text style={styles.tag}>RECORDS</Text>
        <Text style={styles.title}>Student Register</Text>
        <Text style={styles.desc}>
          {students.length} student{students.length !== 1 ? 's' : ''} enrolled
        </Text>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { width: 32 }]}>#</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>NAME</Text>
        <Text style={[styles.tableHeaderCell, { width: 120 }]}>ROLL / COURSE</Text>
      </View>

      <FlatList
        data={students}
        keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => <StudentRow item={item} index={index} />}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ede7d9', padding: 20 },

  headerBlock: { marginBottom: 16 },
  tag: { fontSize: 10, letterSpacing: 3, color: '#c0392b', fontWeight: '700', marginBottom: 4 },
  title: { fontSize: 26, fontWeight: '800', color: '#1a1410', letterSpacing: 0.3 },
  desc: { fontSize: 13, color: '#8a7a6a', marginTop: 4, fontStyle: 'italic' },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1a1410',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 3,
    marginBottom: 4,
    alignItems: 'center',
  },
  tableHeaderCell: { fontSize: 9, letterSpacing: 2, color: '#f5f0e8', fontWeight: '700' },

  row: {
    flexDirection: 'row',
    backgroundColor: '#f5f0e8',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#c8b89a',
    alignItems: 'center',
    gap: 8,
  },
  rowIndex: { width: 24, fontSize: 10, color: '#8a7a6a', fontWeight: '700', letterSpacing: 1 },
  rowMain: { flex: 1 },
  rowName: { fontSize: 15, fontWeight: '700', color: '#1a1410' },
  rowEmail: { fontSize: 11, color: '#8a7a6a', marginTop: 2 },
  rowRight: { width: 120, alignItems: 'flex-end', gap: 4 },
  rowRoll: { fontSize: 12, color: '#c0392b', fontWeight: '700' },

  courseBadge: {
    backgroundColor: 'rgba(42,92,63,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(42,92,63,0.25)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
  },
  courseBadgeText: { fontSize: 9, color: '#2a5c3f', fontWeight: '700', letterSpacing: 0.5 },

  emptyContainer: {
    flex: 1, backgroundColor: '#ede7d9',
    alignItems: 'center', justifyContent: 'center',
    padding: 40, gap: 12,
  },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: '#1a1410' },
  emptyDesc: { fontSize: 14, color: '#8a7a6a', textAlign: 'center', fontStyle: 'italic' },
});
