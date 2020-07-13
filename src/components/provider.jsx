import React, { useState } from 'react';

export const context = React.createContext();

const Provider = ({ children }) => {
  const [userShows, setUserShows] = useState(null);
  const [gridData, setGridData] = useState(null);

  return (
    <context.Provider value={{
      userShows,
      changeUserShows: (shows) => setUserShows(shows),
      gridData,
      changeGridData: (grids) => setGridData(grids),
    }}
    >
      {children}
    </context.Provider>
  );
};

export default Provider;
