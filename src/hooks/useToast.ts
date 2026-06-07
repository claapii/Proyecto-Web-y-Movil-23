import { useIonToast } from '@ionic/react';

export const useToast = () => {
  const [present] = useIonToast();

  const showToast = (message: string, color: 'success' | 'danger' | 'warning' | 'primary' = 'primary', duration = 2500) => {
    present({
      message,
      duration,
      color,
      position: 'bottom'
    });
  };

  return { showToast };
};