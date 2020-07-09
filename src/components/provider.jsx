import React, { useState } from 'react';

export const context = React.createContext();

const Provider = ({ children }) => {
  const [userShows, setUserShows] = useState(null);
  const [showInfo, setShowInfo] = useState(null);

  return (
    <context.Provider value={{
      userShows,
      changeUserShows: (shows) => setUserShows(shows),
      showInfo,
      changeShowInfo: (info) => setShowInfo(info),
    }}
    >
      {children}
    </context.Provider>
  );
};

export default Provider;
