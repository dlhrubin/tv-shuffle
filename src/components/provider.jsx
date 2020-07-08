import React, { useState } from 'react';

export const context = React.createContext();

const Provider = ({ children }) => {
  const [userShows, setUserShows] = useState(null);
  const [newEpisode, setNewEpisode] = useState(null);

  return (
    <context.Provider value={{
      userShows,
      changeUserShows: (shows) => setUserShows(shows),
      newEpisode,
      addNewEpisode: (episode) => setNewEpisode(episode),
    }}
    >
      {children}
    </context.Provider>
  );
};

export default Provider;
