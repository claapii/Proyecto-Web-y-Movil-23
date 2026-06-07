import { Preferences } from '@capacitor/preferences';

export const useStorage = () => {

  const guardar = async (key: string, value: any) => {
    await Preferences.set({
      key,
      value: JSON.stringify(value)
    });
  };

  const obtener = async (key: string) => {
    const { value } = await Preferences.get({ key });
    return value ? JSON.parse(value) : null;
  };

  const eliminar = async (key: string) => {
    await Preferences.remove({ key });
  };

  return { guardar, obtener, eliminar };
};