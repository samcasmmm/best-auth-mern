import React from 'react';

const Button = ({ isLoading, title, onClick }) => {
  return (
    <button
      type='submit'
      className='w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
    >
      {isLoading ? <LoadingView /> : title}
    </button>
  );
};

const LoadingView = () => {
  return (
    <div className='inline-block w-4 h-4 animate-spin'>
      <div className='w-4 h-4  border-2 border-white border-t  border-b-0 border-r-0 border-l rounded-full animate-spin'></div>
    </div>
  );
};

Button.defaultProps = {
  title: 'Button',
  isLoading: false,
};

export default Button;
