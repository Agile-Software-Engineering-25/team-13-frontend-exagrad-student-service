import { useState, useEffect, useCallback } from 'react';
import { User } from 'oidc-client-ts';
import { jwtDecode } from 'jwt-decode';

// Global user state
let globalUser: User | null = null;
let subscribers: Array<(user: User | null) => void> = [];

// Function to set user data (called from singleSpa.tsx)
export const setGlobalUser = (user: User | null) => {
  globalUser = user;
  // TODO: REMOVE - Debug logging for user UUID
  if (user?.profile?.sub) {
    console.log('[DEBUG - REMOVE] User UUID:', user.profile.sub);
  }
  subscribers.forEach((callback) => callback(user));
};

// Custom hook to access user data
export const useUser = () => {
  const [user, setUser] = useState<User | null>(globalUser);

  useEffect(() => {
    const unsubscribe = (newUser: User | null) => {
      setUser(newUser);
    };
    subscribers.push(unsubscribe);
    return () => {
      subscribers = subscribers.filter((callback) => callback !== unsubscribe);
    };
  }, []);

  const getUserId = useCallback((): string => {
    const userId = user?.profile.sub ?? '';
    // TODO: REMOVE - Debug logging for user UUID
    if (userId) {
      console.log('[DEBUG - REMOVE] getUserId() called, returning:', userId);
    }
    return userId;
  }, [user]);

  const getFirstName = useCallback((): string => {
    return user?.profile.given_name ?? '';
  }, [user]);

  const getLastName = useCallback((): string => {
    return user?.profile.family_name ?? '';
  }, [user]);

  const getFullName = useCallback((): string => {
    return user?.profile.name ?? '';
  }, [user]);

  const getEmail = useCallback((): string => {
    return user?.profile.email ?? '';
  }, [user]);

  const getAccessToken = useCallback((): string => {
    return user?.access_token ?? '';
  }, [user]);

  // Function to check if user has a specific role
  const hasRole = useCallback(
    (role: string): boolean => {
      const token = getAccessToken();
      if (!token) return false;

      // Decode JWT to extract roles
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = jwtDecode(token);
      const roles: string[] = decoded?.realm_access?.roles || [];

      if (!Array.isArray(roles) || roles.length === 0) return false;
      return roles.includes(role);
    },
    [getAccessToken]
  );

  return {
    user,
    getUserId,
    getFirstName,
    getLastName,
    getFullName,
    getEmail,
    getAccessToken,
    hasRole,
  };
};

export default useUser;
