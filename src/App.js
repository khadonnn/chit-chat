import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './Context/AuthProvider';
import AppProvide from './Context/AppProvide';
import AddRoomModal from './components/Modals/AddRoomModal';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppProvide>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ChatRoom />} />
            </Routes>
            <AddRoomModal />
          </AppProvide>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
