'use client';

import { TranslationProvider } from '@/i18n';
import { AuthProvider } from '@/context/AuthContext';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <TranslationProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </TranslationProvider>
    </Provider>
  );
}
