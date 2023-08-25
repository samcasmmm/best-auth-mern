import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLogoutMutation } from '../app/features/auth/userApiSlice';
import { selectUserInfo, logout } from '../app/features/auth/authSlice';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const links = [
    { id: 0, title: 'Home', path: '/' },
    { id: 1, title: 'About', path: 'about' },
    { id: 2, title: 'SignIn', path: '/sign-in' },
    { id: 3, title: 'SignUp', path: '/sign-up' },
    { id: 4, title: 'Profile', path: '/profile' },
  ];

  const handleLogout = async () => {
    setIsNavOpen(!isNavOpen);
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success('Logout Successfully');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const filteredLinks = userInfo
    ? links.filter((link) => link.title !== 'SignIn' && link.title !== 'SignUp')
    : links.filter((link) => link.title !== 'Profile');

  return (
    <nav className='p-5 bg-slate-600 shadow md-flex md:items-center md:justify-between'>
      <div className='flex items-center justify-between'>
        <div className='text-white font-semibold text-2xl cursor-pointer z-10'>
          Logo
        </div>
        <span
          className='text-white font-semibold text-2xl cursor-pointer mx-2 md:hidden block'
          onClick={() => {
            setIsNavOpen(!isNavOpen);
          }}
        >
          {isNavOpen ? (
            <ion-icon name='menu-outline'></ion-icon>
          ) : (
            <ion-icon name='close-outline'></ion-icon>
          )}
        </span>
        <ul
          className={`md:flex md:items-center z-[1] md:z-auto md:static absolute bg-slate-600 w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-4 md:opacity-100 opacity-0 ${
            isNavOpen ? 'top-[-400px]' : 'top-[50px] opacity-100'
          } transition-all ease-in duration-500`}
          id='navLinks'
        >
          {filteredLinks.map((link) => (
            <li
              key={link.id}
              className='mx-2 my-2 md:my-0 cursor-pointer'
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <Link
                to={link.path}
                className='text-slate-300 text-lg hover:text-white duration-500'
              >
                {link.title}
              </Link>
            </li>
          ))}
          {userInfo && (
            <li
              className='mx-2 my-2 md:my-0 cursor-pointer'
              onClick={() => handleLogout()}
            >
              <Link
                to='/'
                className='text-slate-300 text-lg hover:text-white duration-500'
              >
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
