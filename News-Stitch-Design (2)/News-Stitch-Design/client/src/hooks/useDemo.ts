import { useState, useEffect } from 'react';
import { userApi, type User } from '@/lib/api';

export function useDemo() {
  const [demoUser, setDemoUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initDemo = async () => {
      try {
        // Get or create demo user
        const user = await userApi.createDemo();
        setDemoUser(user);
      } catch (error) {
        console.error('Failed to initialize demo user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initDemo();
  }, []);

  return {
    demoUser,
    isLoading,
    userId: demoUser?.id || 'demo-user-123',
  };
}