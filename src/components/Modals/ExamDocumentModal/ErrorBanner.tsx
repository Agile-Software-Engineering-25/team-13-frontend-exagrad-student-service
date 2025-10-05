import { Box, Typography } from '@mui/joy';

interface ErrorBannerProps {
  message: string;
  type?: 'error' | 'warning';
}

export const ErrorBanner = ({ message, type = 'error' }: ErrorBannerProps) => {
  const color = type === 'error' ? 'danger' : 'warning';

  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        backgroundColor: `${color}.softBg`,
        borderRadius: 'md',
      }}
    >
      <Typography level="body-sm" color={color}>
        {message}
      </Typography>
    </Box>
  );
};
