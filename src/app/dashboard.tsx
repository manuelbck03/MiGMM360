import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';




export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hola, Víctor</Text>
          <Text style={styles.subtitle}>Bienvenido a Mi GMM 360</Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>VR</Text>
        </View>
      </View>

      <View style={styles.policyCard}>
        <Text style={styles.policyLabel}>Mi póliza</Text>
        <Text style={styles.policyNumber}>GMM-360-2026</Text>

        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Póliza activa</Text>
        </View>

        <Text style={styles.validity}>
          Vigencia: 01/01/2026 al 31/12/2026
        </Text>
      </View>

      <Text style={styles.sectionTitle}>¿Qué deseas hacer?</Text>

      <View style={styles.options}>
        <Pressable
  style={styles.optionCard}
  onPress={() => router.push('/reportar-siniestro')}
>
  <Text style={styles.optionIcon}>＋</Text>
  <Text style={styles.optionTitle}>Reportar siniestro</Text>
  <Text style={styles.optionDescription}>
    Registra una nueva solicitud
  </Text>
</Pressable>
        

        <Pressable
  style={styles.optionCard}
  onPress={() => router.push('/documentos')}
>
  <Text style={styles.optionIcon}>▣</Text>
  <Text style={styles.optionTitle}>Documentos</Text>
  <Text style={styles.optionDescription}>
    Consulta los requisitos
  </Text>
</Pressable>

        <Pressable
  style={styles.optionCard}
  onPress={() => router.push('/mis-siniestros')}
>
  <Text style={styles.optionIcon}>☰</Text>
  <Text style={styles.optionTitle}>Mis siniestros</Text>
  <Text style={styles.optionDescription}>
    Revisa tus solicitudes
  </Text>
</Pressable>

        <View style={styles.optionCard}>
          <Text style={styles.optionIcon}>✓</Text>
          <Text style={styles.optionTitle}>Seguimiento</Text>
          <Text style={styles.optionDescription}>
            Consulta el estado del trámite
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F8F9',
    padding: 24,
  },
  header: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  greeting: {
    color: '#12344D',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#5C6F7B',
    fontSize: 15,
    marginTop: 4,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#087F8C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  policyCard: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    backgroundColor: '#12344D',
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
  },
  policyLabel: {
    color: '#B9DDE1',
    fontSize: 14,
  },
  policyNumber: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '700',
    marginTop: 5,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#45D483',
    marginRight: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  validity: {
    color: '#B9DDE1',
    fontSize: 13,
    marginTop: 8,
  },
  sectionTitle: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    color: '#12344D',
    fontSize: 21,
    fontWeight: '700',
    marginBottom: 16,
  },
  options: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  optionCard: {
    flexGrow: 1,
    flexBasis: 190,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    minHeight: 145,
  },
  optionIcon: {
    color: '#087F8C',
    fontSize: 30,
    fontWeight: '700',
  },
  optionTitle: {
    color: '#12344D',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 10,
  },
  optionDescription: {
    color: '#5C6F7B',
    fontSize: 13,
    marginTop: 5,
  },
});