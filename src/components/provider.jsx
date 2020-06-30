import React, { useState } from 'react';

export const context = React.createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <context.Provider value={{
      user,
      changeUser: (userInfo) => setUser(userInfo),
    }}
    >
      {children}
    </context.Provider>
  );
};

export default Provider;
