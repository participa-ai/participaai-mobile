import React, { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from '../services/auth';

const AuthContext = React.createContext({ authenticated: false, token: '' });

export const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadStorageData() {
      let storageToken;
      try {
        storageToken = await AsyncStorage.getItem('@participaai:token');
      } catch (e) {
        console.log(e);
      }

      if (storageToken) {
        setToken(storageToken);
        setLoading(false);
      } else if (!storageToken) {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function login() {
    const response = await auth.Signin();
    setToken(response.token);

    await AsyncStorage.setItem('@participaai:token', response.token);
  }

  function logout() {
    AsyncStorage.clear().then(() => {
      setToken(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{ authenticated: !!token, token, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// export function useAuth() {
//   const context = useContext(AuthContext);
//   return context;
// }
