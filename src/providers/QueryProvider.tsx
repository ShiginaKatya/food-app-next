'use client';
import { useState, useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { getJWT } from '@/api/register_auth';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  useEffect(() => {
    const init = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        try {
          const data = await getJWT();
          localStorage.setItem('token', data.jwt);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('Auth failed', e);
        }
      }
    };
    init();
  }, []);
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
