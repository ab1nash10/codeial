import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import { useAuth } from '../hooks';
import { Home, Login, Settings, Signup, UserProfile } from '../pages';
import { Loader, Navbar } from './';

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/login" replace />;
}

const Page404 = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
    </div>
  );
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home posts={[]} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:userId"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
