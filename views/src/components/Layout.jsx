import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
const Layout = () => {
  return (
    <>
      <Navbar />
      <main className='lg:min-h-[94.2vh]'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
