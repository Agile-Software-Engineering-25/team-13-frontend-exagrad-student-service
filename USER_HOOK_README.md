# useUser Hook - Debug Implementation

## What was added:

### **useUser Hook** (`src/hooks/useUser.ts`)
- Custom React hook to access authenticated user data
- Provides methods to get user ID (UUID), name, email, access token
- Includes `hasRole()` method to check user roles from JWT

## How to use in your code:

```typescript
import { useUser } from '@hooks/useUser';

const MyComponent = () => {
  const { getUserId, getFullName, getEmail, getAccessToken, hasRole } = useUser();
  
  // Get user UUID for API requests
  const userId = getUserId();
  
  // Make API call with user UUID
  const response = await axios.get(`/api/students/${userId}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  });
  
  // Check if user has specific role
  if (hasRole('student')) {
    // Do something
  }
};
```

## Setting the user (in singleSpa.tsx or root):

```typescript
import { setGlobalUser } from '@hooks/useUser';

// When user logs in or auth state changes:
setGlobalUser(userObject); // User object from oidc-client-ts
```