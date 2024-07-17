import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface ContainerProps extends BoxProps {
    maxWidth?: string;
    column?: boolean;
}

const Container: React.FC<ContainerProps> = ({
    maxWidth = '100%',
    column = false,
    children,
    ...rest
}) => {
    return (
        <Box
            maxWidth={maxWidth}
            display="flex"
            flexDirection={column ? 'column' : 'row'}
            justifyContent="center"
            alignItems="center"
            bgcolor="background.default"
            p={2}
            {...rest}
        >
            {children}
        </Box>
    );
};

export default Container;