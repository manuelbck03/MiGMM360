import { auth, db } from '@/firebase';
import { router } from 'expo-router';
import {
    addDoc,
    collection,
    serverTimestamp,
} from 'firebase/firestore';
import { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ReportarSiniestroScreen() {
  const [tipo, setTipo] = useState('');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const enviarReporte = async () => {
  if (!tipo.trim() || !fecha.trim() || !descripcion.trim()) {
    setMensaje('Completa todos los campos para continuar.');
    setEnviado(false);
    return;
  }

  if (!auth.currentUser) {
    setMensaje('Debes iniciar sesión para enviar el reporte.');
    setEnviado(false);
    return;
  }

  try {
    const registro = await addDoc(collection(db, 'siniestros'), {
      tipo: tipo.trim(),
      fecha: fecha.trim(),
      descripcion: descripcion.trim(),
      estatus: 'Recibido',
      usuarioId: auth.currentUser.uid,
      creadoEn: serverTimestamp(),
      actualizadoEn: serverTimestamp(),
    });

    const folio = registro.id.substring(0, 8).toUpperCase();

    setMensaje(`Reporte guardado correctamente. Folio: ${folio}`);
    setEnviado(true);

    setTipo('');
    setFecha('');
    setDescripcion('');
  } catch (error: any) {
    setMensaje(`No se pudo guardar: ${error.code}`);
    setEnviado(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Volver</Text>
        </Pressable>

        <Text style={styles.title}>Reportar siniestro</Text>
        <Text style={styles.subtitle}>
          Proporciona los datos iniciales de tu solicitud
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Tipo de atención</Text>
          <TextInput
            style={styles.input}
            placeholder="Ejemplo: hospitalización o reembolso"
            placeholderTextColor="#8A94A6"
            value={tipo}
            onChangeText={setTipo}
          />

          <Text style={styles.label}>Fecha del evento</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#8A94A6"
            value={fecha}
            onChangeText={setFecha}
          />

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe brevemente lo ocurrido"
            placeholderTextColor="#8A94A6"
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
            textAlignVertical="top"
          />

          <Pressable style={styles.button} onPress={enviarReporte}>
            <Text style={styles.buttonText}>Enviar reporte</Text>
          </Pressable>

          {mensaje !== '' && (
            <View
              style={[
                styles.messageBox,
                enviado ? styles.successBox : styles.errorBox,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  enviado ? styles.successText : styles.errorText,
                ]}
              >
                {mensaje}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.notice}>
          Prototipo académico: utiliza únicamente información ficticia.
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
    marginBottom: 25,
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
  },
  label: {
    color: '#12344D',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 7,
  },
  input: {
    height: 52,
    backgroundColor: '#F4F7F8',
    borderWidth: 1,
    borderColor: '#D6E1E5',
    borderRadius: 12,
    paddingHorizontal: 15,
    color: '#12344D',
    fontSize: 15,
    marginBottom: 18,
  },
  textArea: {
    height: 125,
    paddingTop: 14,
  },
  button: {
    height: 52,
    backgroundColor: '#087F8C',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  messageBox: {
    borderRadius: 10,
    padding: 14,
    marginTop: 18,
  },
  successBox: {
    backgroundColor: '#E4F7EC',
  },
  errorBox: {
    backgroundColor: '#FDECEC',
  },
  messageText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  successText: {
    color: '#187A45',
  },
  errorText: {
    color: '#B42318',
  },
  notice: {
    color: '#8A94A6',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 22,
  },
});
