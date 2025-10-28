import { Box, Typography } from '@mui/joy';
import { useUser } from '@hooks/useUser';

// TODO: REMOVE - This component is for debugging purposes only
const UserDebugDisplay = () => {
  const { getUserId, getFullName, getEmail, user } = useUser();

  // TODO: REMOVE - Debug logging
  console.log('[DEBUG - REMOVE] UserDebugDisplay rendered, user:', user);

  if (!user) {
    return (
      <Box
        sx={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          padding: 2,
          backgroundColor: 'warning.softBg',
          border: '2px solid',
          borderColor: 'warning.outlinedBorder',
          borderRadius: 'md',
          zIndex: 9999,
        }}
      >
        <Typography level="body-sm" fontWeight="bold">
          🔍 DEBUG (REMOVE): No user logged in
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 10,
        right: 10,
        padding: 2,
        backgroundColor: 'primary.softBg',
        border: '2px solid',
        borderColor: 'primary.outlinedBorder',
        borderRadius: 'md',
        maxWidth: 400,
        zIndex: 9999,
      }}
    >
      <Typography level="body-sm" fontWeight="bold" sx={{ mb: 1 }}>
        🔍 DEBUG (REMOVE): User Info
      </Typography>
      <Typography level="body-xs">
        <strong>UUID:</strong> {getUserId()}
      </Typography>
      <Typography level="body-xs">
        <strong>Name:</strong> {getFullName()}
      </Typography>
      <Typography level="body-xs">
        <strong>Email:</strong> {getEmail()}
      </Typography>
    </Box>
  );
};

export default UserDebugDisplay;

