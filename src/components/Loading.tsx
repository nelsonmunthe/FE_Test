import CircularProgress from '@mui/material/CircularProgress';
import React, { memo } from 'react';

const Loading: React.FC =  () => {
    return (
        <div className='grid h-screen place-items-center'> 
            <CircularProgress />
        </div>
    );
};

export default memo(Loading)