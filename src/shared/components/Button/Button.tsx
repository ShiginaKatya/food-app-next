import * as React from 'react';

import classNames from 'classnames';

import Loader from '../Loader';
import s from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  disabled,
  className,
  children,
  onClick,
  ...props
}) => {
  const fullClassName = classNames(s.btn, { [s.btn_disabled]: disabled }, className);
  return (
    <button
      data-testid="button"
      className={fullClassName}
      {...props}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Loader size="s" className="btn-loader" />}
      {children}
    </button>
  );
};

export default React.memo(Button);
