// TODO: REMOVE - This is for local testing only
import { User } from 'oidc-client-ts';
import { setGlobalUser } from '@hooks/useUser';

export const setupTestUser = () => {
  // Get user data from localStorage
  const userDataKey =
    'oidc.user:https://keycloak.sau-portal.de/realms/sau:root-ui';
  const userDataStr = localStorage.getItem(userDataKey);

  if (userDataStr) {
    try {
      const userData = JSON.parse(userDataStr);
      // Create User object that matches oidc-client-ts structure
      const user = userData as User;
      setGlobalUser(user);
      console.log(
        '[TEST SETUP] User loaded from localStorage:',
        user.profile.sub
      );
    } catch (error) {
      console.error('[TEST SETUP] Failed to parse user data:', error);
    }
  } else {
    console.warn(
      '[TEST SETUP] No user data found in localStorage. Key:',
      userDataKey
    );
  }
};
