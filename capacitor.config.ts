import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Libros_al_azar',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Tiempo en ms que se muestra el splash
      launchAutoHide: true,
      backgroundColor: '#ffffff', // Color de fondo del splash
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#000000', // Color del spinner
    },
  },
};

export default config;
