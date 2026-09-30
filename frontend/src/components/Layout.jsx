import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
export default function Layout(){return <><Navbar/><main className="container"><Outlet/></main><footer>© 2026 ShopNest · CodeAlpha Full Stack Development Task 1</footer></>}
