'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { TranslationProvider } from '@/i18n';
import { AuthProvider } from '@/context/AuthContext';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <TranslationProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </TranslationProvider>
      </ThemeProvider>
    </Provider>
  );
}
