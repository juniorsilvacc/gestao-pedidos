import type { AppProps } from 'next/app';
import '../../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { AuthProvider }  from '../contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={ 1500}/>
    </AuthProvider>
  );
}

export default MyApp
