import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Layout.css';

function Layout() {
  return (
    <div className="layout">
      <Navbar />

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <p>&copy; 2026 TechHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
