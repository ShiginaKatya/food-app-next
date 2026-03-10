import React from 'react';

import classNames from 'classnames';

import s from './Loader.module.scss';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className }) => {
  return (
    <svg
      className={classNames(s.loader, s[`loader_size-${size}`], className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
    >
      <path
        d="M26.6993 35.6924C20.2418 37.1833 13.7983 33.157 12.3075 26.6994C10.8166 20.2418 14.843 13.7984 21.3005 12.3075C27.7581 10.8167 34.2015 14.843 35.6924 21.3006L39.5898 20.4008C37.6021 11.7907 29.0108 6.42227 20.4007 8.41006C11.7906 10.3979 6.42222 18.9891 8.41001 27.5992C10.3978 36.2093 18.9891 41.5777 27.5991 39.5899L26.6993 35.6924Z"
        fill="variables.$brand"
      />
    </svg>
  );
};

export default Loader;
