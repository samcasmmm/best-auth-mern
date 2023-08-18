import { Link } from 'react-router-dom';
const Navbar = () => {
  const links = [
    { id: 0, title: 'Home', path: '/' },
    { id: 1, title: 'About', path: 'about' },
    { id: 2, title: 'SignIn', path: '/sign-in' },
    { id: 3, title: 'SignUp', path: '/sign-up' },
    { id: 4, title: 'Profile', path: '/profile' },
  ];
  return (
    <nav className='bg-gray-800 p-4 fixed top-0 w-full'>
      <div className='flex items-center justify-between'>
        <div className='text-white font-semibold text-lg'>Logo</div>
        <div className=' md:flex space-x-4' id='navLinks'>
          {links.map((link) => (
            <Link to={link.path} className='text-white' key={link.id}>
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
