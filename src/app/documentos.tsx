import { router } from 'expo-router';
import { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const requisitos = [
  'Formato de reclamación',
  'Informe médico',
  'Identificación oficial',
  'Facturas y comprobantes de pago',
];

export default function DocumentosScreen() {
  const [seleccionados, setSeleccionados] = useState<string[]>([]);

  const cambiarEstado = (documento: string) => {
    if (seleccionados.includes(documento)) {
      setSeleccionados(
        seleccionados.filter((elemento) => elemento !== documento)
      );
    } else {
      setSeleccionados([...seleccionados, documento]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Volver</Text>
        </Pressable>

        <Text style={styles.title}>Documentos</Text>
        <Text style={styles.subtitle}>
          Marca los documentos que ya tienes disponibles
        </Text>

        <View style={styles.progressCard}>
          <Text style={styles.progressNumber}>
            {seleccionados.length} de {requisitos.length}
          </Text>
          <Text style={styles.progressText}>documentos preparados</Text>
        </View>

        <View style={styles.list}>
          {requisitos.map((documento) => {
            const seleccionado = seleccionados.includes(documento);

            return (
              <Pressable
                key={documento}
                style={[
                  styles.documentCard,
                  seleccionado && styles.documentCardSelected,
                ]}
                onPress={() => cambiarEstado(documento)}
              >
                <View
                  style={[
                    styles.checkbox,
                    seleccionado && styles.checkboxSelected,
                  ]}
                >
                  <Text style={styles.checkmark}>
                    {seleccionado ? '✓' : ''}
                  </Text>
                </View>

                <View style={styles.documentInfo}>
                  <Text style={styles.documentTitle}>{documento}</Text>
                  <Text style={styles.documentStatus}>
                    {seleccionado ? 'Documento listo' : 'Pendiente'}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {seleccionados.length === requisitos.length && (
          <View style={styles.successBox}>
            <Text style={styles.successText}>
              ✓ Expediente completo para enviar
            </Text>
          </View>
        )}

        <Text style={styles.notice}>
          Esta información es ficticia y se utiliza únicamente para el
          prototipo académico.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F8F9',
  },
  content: {
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
    padding: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 22,
  },
  backText: {
    color: '#087F8C',
    fontSize: 16,
    fontWeight: '700',
  },
  title: {
    color: '#12344D',
    fontSize: 30,
    fontWeight: '700',
  },
  subtitle: {
    color: '#5C6F7B',
    fontSize: 16,
    marginTop: 6,
    marginBottom: 24,
  },
  progressCard: {
    backgroundColor: '#12344D',
    borderRadius: 18,
    padding: 22,
    marginBottom: 20,
  },
  progressNumber: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },
  progressText: {
    color: '#B9DDE1',
    fontSize: 14,
    marginTop: 3,
  },
  list: {
    gap: 12,
  },
  documentCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6E1E5',
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentCardSelected: {
    borderColor: '#087F8C',
    backgroundColor: '#EEF9FA',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#AAB8C2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  checkboxSelected: {
    backgroundColor: '#087F8C',
    borderColor: '#087F8C',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    color: '#12344D',
    fontSize: 16,
    fontWeight: '700',
  },
  documentStatus: {
    color: '#5C6F7B',
    fontSize: 13,
    marginTop: 3,
  },
  successBox: {
    backgroundColor: '#E4F7EC',
    borderRadius: 12,
    padding: 16,
    marginTop: 18,
  },
  successText: {
    color: '#187A45',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
  },
  notice: {
    color: '#8A94A6',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
  },
});