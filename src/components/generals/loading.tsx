import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        marginTop: '40vh',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </div>
  );
}
