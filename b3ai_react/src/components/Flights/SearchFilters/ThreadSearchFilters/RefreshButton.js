import React from 'react';
import { IconButton, Button, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const RefreshButton = () => {
  return (
    <Box>
        <Button
            variant="outlined"
            endIcon={<RefreshIcon sx={{ width: '16px', height:'16px' }} />}
            sx={{
                fontSize: '10.5px',
                textTransform: 'none',
                padding: '1px 5px',
                minWidth: 'fit-content',
                borderColor: 'rgba(0, 0, 0, 0.23)',
                '&:hover': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                }}
            >
            Refresh Search
      </Button>
    </Box>
  ); 
};

export default RefreshButton;
