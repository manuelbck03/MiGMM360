import { router } from 'expo-router';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { auth, db } from '@/firebase';

type Siniestro = {
  id: string;
  tipo: string;
  fecha: string;
  descripcion: string;
  estatus: string;
};

export default function MisSiniestrosScreen() {
  const usuarioId = auth.currentUser?.uid;

  const [siniestros, setSiniestros] = useState<Siniestro[]>([]);
  const [cargando, setCargando] = useState(Boolean(usuarioId));
  const [error, setError] = useState(
    usuarioId ? '' : 'Debes iniciar sesión para consultar tus siniestros.'
  );
  const [eliminandoId, setEliminandoId] = useState('');

  useEffect(() => {
    if (!usuarioId) {
      return;
    }

    const consulta = query(
      collection(db, 'siniestros'),
      where('usuarioId', '==', usuarioId)
    );

    const cancelarSuscripcion = onSnapshot(
      consulta,
      (resultado) => {
        const registros = resultado.docs.map((documento) => {
          const datos = documento.data();

          return {
            id: documento.id,
            tipo: datos.tipo ?? '',
            fecha: datos.fecha ?? '',
            descripcion: datos.descripcion ?? '',
            estatus: datos.estatus ?? '',
          };
        });

        setSiniestros(registros);
        setError('');
        setCargando(false);
      },
      (firebaseError) => {
        setError(`No se pudieron consultar: ${firebaseError.code}`);
        setCargando(false);
      }
    );

    return cancelarSuscripcion;
  }, [usuarioId]);
const eliminarSiniestro = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'siniestros', id));
    setEliminandoId('');
  } catch (firebaseError: any) {
    setError(`No se pudo eliminar: ${firebaseError.code}`);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Volver</Text>
        </Pressable>

        <Text style={styles.title}>Mis siniestros</Text>
        <Text style={styles.subtitle}>
          Consulta las solicitudes almacenadas en Firebase
        </Text>

        {cargando && (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#087F8C" />
            <Text style={styles.loadingText}>Consultando registros...</Text>
          </View>
        )}

        {error !== '' && <Text style={styles.errorText}>{error}</Text>}

        {!cargando && error === '' && (
          <FlatList
            data={siniestros}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>No hay siniestros</Text>
                <Text style={styles.emptyText}>
                  Tus solicitudes aparecerán aquí.
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.folio}>
                    Folio: {item.id.substring(0, 8).toUpperCase()}
                  </Text>

                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{item.estatus}</Text>
                  </View>
                </View>

                <Text style={styles.type}>{item.tipo}</Text>
                <Text style={styles.date}>Fecha: {item.fecha}</Text>
                <Text style={styles.description}>{item.descripcion}</Text>
                <Pressable
  style={styles.editButton}
  onPress={() =>
    router.push({
      pathname: '/editar-siniestro',
      params: { id: item.id },
    })
  }
>
  <Text style={styles.editButtonText}>Editar siniestro</Text>
</Pressable>

{eliminandoId === item.id ? (
  <View style={styles.confirmBox}>
    <Text style={styles.confirmText}>
      ¿Deseas eliminar este siniestro definitivamente?
    </Text>

    <Pressable
      style={styles.confirmDeleteButton}
      onPress={() => eliminarSiniestro(item.id)}
    >
      <Text style={styles.confirmDeleteText}>Sí, eliminar</Text>
    </Pressable>

    <Pressable onPress={() => setEliminandoId('')}>
      <Text style={styles.cancelText}>Cancelar</Text>
    </Pressable>
  </View>
) : (
  <Pressable
    style={styles.deleteButton}
    onPress={() => setEliminandoId(item.id)}
  >
    <Text style={styles.deleteButtonText}>Eliminar siniestro</Text>
  </Pressable>
)}

              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F8F9',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 800,
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
  errorText: {
    color: '#B42318',
    backgroundColor: '#FDECEC',
    borderRadius: 12,
    padding: 16,
    textAlign: 'center',
  },
  list: {
    gap: 14,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#D6E1E5',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  folio: {
    color: '#12344D',
    fontSize: 14,
    fontWeight: '700',
  },
  statusBadge: {
    backgroundColor: '#E4F7EC',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    color: '#187A45',
    fontSize: 12,
    fontWeight: '700',
  },
  type: {
    color: '#087F8C',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 18,
    textTransform: 'capitalize',
  },
  date: {
    color: '#5C6F7B',
    fontSize: 14,
    marginTop: 8,
  },
  description: {
    color: '#12344D',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
  },
  emptyTitle: {
    color: '#12344D',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyText: {
    color: '#5C6F7B',
    fontSize: 14,
    marginTop: 5,
  },
  editButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#087F8C',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 11,
    marginTop: 18,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

    deleteButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#B42318',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#B42318',
    fontSize: 14,
    fontWeight: '700',
  },
  confirmBox: {
    backgroundColor: '#FDECEC',
    borderRadius: 12,
    padding: 15,
    marginTop: 12,
  },
  confirmText: {
    color: '#7A271A',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  confirmDeleteButton: {
    backgroundColor: '#B42318',
    borderRadius: 9,
    paddingVertical: 10,
    alignItems: 'center',
  },
  confirmDeleteText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  cancelText: {
    color: '#5C6F7B',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 12,
  },

});