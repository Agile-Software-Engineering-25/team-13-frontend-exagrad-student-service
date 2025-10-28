# useUser Hook - Debug Implementation

## What was added:

### 1. **useUser Hook** (`src/hooks/useUser.ts`)
- Custom React hook to access authenticated user data
- Provides methods to get user ID (UUID), name, email, access token
- Includes `hasRole()` method to check user roles from JWT
- **Debug logging**: Console logs when user UUID is accessed (marked for removal)

### 2. **UserDebugDisplay Component** (`src/components/UserDebugDisplay/UserDebugDisplay.tsx`)
- Visual debug component that displays user information in bottom-right corner
- Shows UUID, full name, and email
- **TODO: REMOVE** - This is for debugging only

### 3. **Integration**
- Added to Home page (`src/pages/Home/Home.tsx`) for testing
- Component will show in bottom-right corner when user is logged in

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

## To remove debug logging:
Search for `TODO: REMOVE` comments and delete:
1. Console.log statements in `useUser.ts`
2. The entire `UserDebugDisplay` component
3. Import and usage in `Home.tsx`
