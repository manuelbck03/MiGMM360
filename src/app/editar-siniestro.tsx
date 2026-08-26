import { router, useLocalSearchParams } from 'expo-router';
import {
    doc,
    getDoc,
    serverTimestamp,
    updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { db } from '@/firebase';

export default function EditarSiniestroScreen() {
  const parametros = useLocalSearchParams<{ id: string }>();
  const identificador = Array.isArray(parametros.id)
    ? parametros.id[0]
    : parametros.id;

  const [tipo, setTipo] = useState('');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [actualizado, setActualizado] = useState(false);

  useEffect(() => {
    const cargarSiniestro = async () => {
      if (!identificador) {
        setMensaje('No se recibió un folio válido.');
        setCargando(false);
        return;
      }

      try {
        const referencia = doc(db, 'siniestros', identificador);
        const resultado = await getDoc(referencia);

        if (!resultado.exists()) {
          setMensaje('El siniestro no existe.');
          setCargando(false);
          return;
        }

        const datos = resultado.data();

        setTipo(datos.tipo ?? '');
        setFecha(datos.fecha ?? '');
        setDescripcion(datos.descripcion ?? '');
      } catch (error: any) {
        setMensaje(`No se pudo consultar: ${error.code}`);
      } finally {
        setCargando(false);
      }
    };

    cargarSiniestro();
  }, [identificador]);

  const actualizarSiniestro = async () => {
    if (!tipo.trim() || !fecha.trim() || !descripcion.trim()) {
      setMensaje('Completa todos los campos para continuar.');
      setActualizado(false);
      return;
    }

    if (!identificador) {
      setMensaje('No se recibió un folio válido.');
      setActualizado(false);
      return;
    }

    try {
      await updateDoc(doc(db, 'siniestros', identificador), {
        tipo: tipo.trim(),
        fecha: fecha.trim(),
        descripcion: descripcion.trim(),
        actualizadoEn: serverTimestamp(),
      });

      setMensaje('Siniestro actualizado correctamente.');
      setActualizado(true);
    } catch (error: any) {
      setMensaje(`No se pudo actualizar: ${error.code}`);
      setActualizado(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Volver</Text>
        </Pressable>

        <Text style={styles.title}>Editar siniestro</Text>
        <Text style={styles.subtitle}>
          Actualiza la información de tu solicitud
        </Text>

        {cargando ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#087F8C" />
            <Text style={styles.loadingText}>Consultando información...</Text>
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.label}>Tipo de atención</Text>
            <TextInput
              style={styles.input}
              value={tipo}
              onChangeText={setTipo}
            />

            <Text style={styles.label}>Fecha del evento</Text>
            <TextInput
              style={styles.input}
              value={fecha}
              onChangeText={setFecha}
            />

            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
              textAlignVertical="top"
            />

            <Pressable
              style={styles.button}
              onPress={actualizarSiniestro}
            >
              <Text style={styles.buttonText}>Guardar cambios</Text>
            </Pressable>

            {mensaje !== '' && (
              <View
                style={[
                  styles.messageBox,
                  actualizado ? styles.successBox : styles.errorBox,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    actualizado ? styles.successText : styles.errorText,
                  ]}
                >
                  {mensaje}
                </Text>
              </View>
            )}
          </View>
        )}
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
  center: {
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    color: '#5C6F7B',
    marginTop: 12,
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
});