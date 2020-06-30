import React, { useState } from 'react';

export const context = React.createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userEpisodes, setUserEpisodes] = useState(null);
  const [newEpisode, setNewEpisode] = useState(null);

  return (
    <context.Provider value={{
      user,
      changeUser: (userInfo) => setUser(userInfo),
      userEpisodes,
      changeUserEpisodes: (episodes) => setUserEpisodes(episodes),
      newEpisode,
      addNewEpisode: (episode) => setNewEpisode(episode),
    }}
    >
      {children}
    </context.Provider>
  );
};

export default Provider;
