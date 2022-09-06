import { FC, PropsWithChildren, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import { ConversationChannelPage } from './pages/conversations/ConversationChannelPage';
import { ConversationPage } from './pages/conversations/ConversationPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AuthContext } from './utils/context/AuthContext';
import { socket, SocketContext } from './utils/context/SocketContext';
import { User } from './utils/types';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import { enableMapSet } from 'immer';
import { GroupChannelPage } from './pages/group/GroupChannelPage';
import { GroupPage } from './pages/group/GroupPage';
import { UserSidebar } from './components/sidebars/UserSidebar';
import { AppPage } from './pages/AppPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConversationPageGuard } from './guards/ConversationPageGuard';

enableMapSet();

type Props = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  socket: Socket;
};

function AppWithProviders({
  children,
  user,
  setUser,
}: PropsWithChildren & Props) {
  return (
    <ReduxProvider store={store}>
      <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
        <SocketContext.Provider value={socket}>
          {children}
        </SocketContext.Provider>
      </AuthContext.Provider>
    </ReduxProvider>
  );
}

function App() {
  const [user, setUser] = useState<User>();

  return (
    <AppWithProviders user={user} setUser={setUser} socket={socket}>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AuthenticatedRoute children={<AppPage />} />}>
          <Route path="conversations" element={<ConversationPage />}>
            <Route
              path=":id"
              element={
                <ConversationPageGuard children={<ConversationChannelPage />} />
              }
            />
          </Route>
          <Route path="groups" element={<GroupPage />}>
            <Route path=":id" element={<GroupChannelPage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer theme="dark" />
    </AppWithProviders>
  );
}

export default App;
