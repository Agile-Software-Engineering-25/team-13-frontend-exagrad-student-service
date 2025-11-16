import { Box, CircularProgress, Typography } from '@mui/joy';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner = ({
  message = 'Loading...',
  size = 'lg',
}: LoadingSpinnerProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="400px"
      gap={2}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography level="body-md" sx={{ opacity: 0.7 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
