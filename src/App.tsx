import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import { ConversationChannelPage } from './pages/ConversationChannelPage';
import { ConversationPage } from './pages/ConversationPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AuthContext } from './utils/context/AuthContext';
import { socket, SocketContext } from './utils/context/SocketContext';
import { User } from './utils/types';

function App() {
  const [user, setUser] = useState<User>();
  return (
    <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="conversations"
            element={
              <AuthenticatedRoute>
                <ConversationPage />
              </AuthenticatedRoute>
            }
          >
            <Route path=":id" element={<ConversationChannelPage />} />
          </Route>
        </Routes>
      </SocketContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
