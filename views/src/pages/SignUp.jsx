import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSignupMutation } from '../app/features/auth/userApiSlice';
import {
  setCredentials,
  logout,
  selectUserInfo,
} from '../app/features/auth/authSlice';
import { toast } from 'react-hot-toast';

const SignUp = () => {
  const [userInputData, setUserInputData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const userInfo = useSelector(selectUserInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignupMutation();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(userInputData).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Successfully !');
      navigate('/');
    } catch (err) {
      toast.error(`${err?.data.message} !`);
      console.log(err?.message || err);
    }
  };
  return (
    <div className='flex items-center justify-center min-h-[86.7vh]  bg-gray-800'>
      <div className='border shadow-xs rounded-md border-gray-600 md:p-3 md:w-6/12 w-full p-4 m-4'>
        <h3 className='text-center mb-4 font-bold text-lg text-blue-600'>
          MERN Authentication
        </h3>
        <p className='text-slate-500'>
          This is a boilerplate for MERN authentication that store a JWT in an
          HTTP- only cookie. It also uses Redux Toolkit and the React Bootstrap
          library
        </p>
        <form className='space-y-4 md:space-y-6 mt-3' onSubmit={handleOnSubmit}>
          <div>
            <label
              htmlFor='username'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Username
            </label>
            <input
              type='text'
              name='username'
              id='username'
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='username'
              required=''
              value={userInputData.username}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='name@email.com'
              required=''
              value={userInputData.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='••••••••'
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              required=''
              value={userInputData.password}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <Button title={'Create an account'} isLoading={isLoading} />
          <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
            Already have an account?{' '}
            <Link
              to='/sign-in'
              className='font-medium text-primary-600 hover:underline dark:text-primary-500'
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
