import { auth } from '@/firebase';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';


import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');


  const iniciarSesion = async () => {
  if (!correo.trim() || !contrasena.trim()) {
    setMensaje('Ingresa tu correo y contraseña para continuar.');
    return;
  }

  try {
    setMensaje('');

    await signInWithEmailAndPassword(
      auth,
      correo.trim(),
      contrasena
    );

    router.replace('/dashboard');
  } catch (error: any) {
  setMensaje(`Error de acceso: ${error.code}`);
}
};



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>+</Text>
        </View>

        <Text style={styles.title}>Mi GMM 360</Text>

        <Text style={styles.subtitle}>
          Tu seguro de gastos médicos en un solo lugar
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Correo electrónico</Text>

          <TextInput
            style={styles.input}
            placeholder="ejemplo@correo.com"
            placeholderTextColor="#8A94A6"
            keyboardType="email-address"
            autoCapitalize="none"
            value={correo}
            onChangeText={setCorreo}
          />

          <Text style={styles.label}>Contraseña</Text>

          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            placeholderTextColor="#8A94A6"
            secureTextEntry
            value={contrasena}
            onChangeText={setContrasena}
          />

                    <Pressable style={styles.button} onPress={iniciarSesion}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </Pressable>
          
{mensaje !== '' && (
  <Text style={styles.message}>{mensaje}</Text>
)}

          <Pressable>
            <Text style={styles.helpText}>
              ¿Necesitas ayuda para ingresar?
            </Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>
          
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF4F6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  logo: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#087F8C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: '300',
    lineHeight: 58,
  },
  title: {
    color: '#12344D',
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    color: '#5C6F7B',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 30,
  },
  form: {
    width: '100%',
  },
  label: {
    color: '#12344D',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 7,
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: '#F4F7F8',
    borderWidth: 1,
    borderColor: '#D6E1E5',
    borderRadius: 12,
    paddingHorizontal: 15,
    color: '#12344D',
    fontSize: 16,
    marginBottom: 18,
  },
  button: {
    width: '100%',
    height: 52,
    backgroundColor: '#087F8C',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  helpText: {
    color: '#087F8C',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 20,
  },
  footer: {
    color: '#8A94A6',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 32,
  },
  message: {
    color: '#087F8C',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 14,
  },
});