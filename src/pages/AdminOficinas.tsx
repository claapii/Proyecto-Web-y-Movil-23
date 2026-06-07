import {
  IonPage, IonContent, IonHeader, IonToolbar,
  IonButton, IonInput, IonItem, IonLabel,
  IonSpinner, IonAlert
} from '@ionic/react';
import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import {
  getOficinas, crearOficina,
  actualizarOficina, eliminarOficina
} from '../services/oficinasService';
import {useToast} from "../hooks/useToast";

const AdminOficinas: React.FC = () => {
  const { showToast } = useToast();
  const [oficinas, setOficinas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [oficinaBorrar, setOficinaBorrar] = useState<number | null>(null);

  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [horario, setHorario] = useState('');
  const [telefono, setTelefono] = useState('');

  useEffect(() => {
    cargarOficinas();
  }, []);

  const cargarOficinas = async () => {
    try {
      const response = await getOficinas();
      setOficinas(response.data);
    } catch (error) {
      console.error("Error al cargar oficinas:", error);
    } finally {
      setLoading(false);
    }
  };

  const limpiarForm = () => {
    setNombre('');
    setDireccion('');
    setHorario('');
    setTelefono('');
    setEditando(null);
    setShowForm(false);
  };

  const handleEditar = (oficina: any) => {
    setEditando(oficina);
    setNombre(oficina.nombre);
    setDireccion(oficina.direccion);
    setHorario(oficina.horario);
    setTelefono(oficina.telefono || '');
    setShowForm(true);
  };

  const handleGuardar = async () => {
    if (!nombre || !direccion || !horario) {
      showToast('Nombre, dirección y horario son obligatorios', 'warning');
      return;
    }
    try {
      if (editando) {
        await actualizarOficina(editando.id_oficina, { nombre, direccion, horario, telefono });
        showToast('Oficina actualizada correctamente', 'success');
      } else {
        await crearOficina({ nombre, direccion, horario, telefono });
        showToast('Oficina creada correctamente', 'success');
      }
      limpiarForm();
      cargarOficinas();
    } catch (error) {
      showToast('Error al guardar oficina', 'danger');
    }
  };

  const handleEliminar = async () => {
    if (!oficinaBorrar) return;
    try {
      await eliminarOficina(oficinaBorrar);
      showToast('Oficina eliminada correctamente', 'success');
      setOficinaBorrar(null);
      cargarOficinas();
    } catch (error) {
      showToast('Error al eliminar oficina', 'danger');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar">
          <NavBar />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '1.5rem' }}>
          <h1>Administrar Oficinas</h1>

          <IonButton onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : '+ Nueva Oficina'}
          </IonButton>

          {showForm && (
            <div style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h3>{editando ? 'Editar Oficina' : 'Nueva Oficina'}</h3>
              <IonItem>
                <IonLabel position="floating">Nombre</IonLabel>
                <IonInput value={nombre} onIonInput={(e) => setNombre(e.detail.value!)} />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Dirección</IonLabel>
                <IonInput value={direccion} onIonInput={(e) => setDireccion(e.detail.value!)} />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Horario</IonLabel>
                <IonInput value={horario} onIonInput={(e) => setHorario(e.detail.value!)} />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Teléfono</IonLabel>
                <IonInput value={telefono} onIonInput={(e) => setTelefono(e.detail.value!)} />
              </IonItem>
              <IonButton style={{ marginTop: '1rem' }} onClick={handleGuardar}>
                {editando ? 'Actualizar' : 'Crear'}
              </IonButton>
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <IonSpinner />
            </div>
          ) : (
            <div style={{ marginTop: '1.5rem' }}>
              {oficinas.map((oficina) => (
                <div key={oficina.id_oficina} style={{
                  padding: '1rem', marginBottom: '1rem',
                  border: '1px solid #ddd', borderRadius: '8px'
                }}>
                  <h3>{oficina.nombre}</h3>
                  <p><strong>Dirección:</strong> {oficina.direccion}</p>
                  <p><strong>Horario:</strong> {oficina.horario}</p>
                  <p><strong>Teléfono:</strong> {oficina.telefono}</p>
                  <IonButton color="warning" onClick={() => handleEditar(oficina)}>
                    Editar
                  </IonButton>
                  <IonButton color="danger" onClick={() => {
                    setOficinaBorrar(oficina.id_oficina);
                    setShowAlert(true);
                  }}>
                    Eliminar
                  </IonButton>
                </div>
              ))}
            </div>
          )}
        </div>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Confirmar eliminación"
          message="¿Estás seguro de que deseas eliminar esta oficina?"
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            { text: 'Eliminar', handler: handleEliminar }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default AdminOficinas;