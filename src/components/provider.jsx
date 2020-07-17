import React, { useState } from 'react';

export const context = React.createContext();

const Provider = ({ children }) => {
  const [userShows, setUserShows] = useState(null);
  const [gridData, setGridData] = useState([]);
  const [gridsToUpdate, setGridsToUpdate] = useState([]);

  return (
    <context.Provider value={{
      userShows,
      changeUserShows: (shows) => setUserShows(shows),
      gridData,
      changeGridData: (grids) => setGridData(grids),
      gridsToUpdate,
      changeGridsToUpdate: (ids) => setGridsToUpdate(ids),
    }}
    >
      {children}
    </context.Provider>
  );
};

export default Provider;
