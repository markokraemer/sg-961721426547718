import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AppProvider } from '@/context/AppContext';
import { AuthProvider } from '@/context/AuthContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppProvider>
        <Component {...pageProps} />
        <Toaster />
      </AppProvider>
    </AuthProvider>
  );
}