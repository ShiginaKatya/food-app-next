'use client';
import * as React from 'react';

import classNames from 'classnames';

import s from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, onChange, afterSlot, disabled, placeholder, ...props }, ref) => {
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange]
    );

    const inputClassName = classNames(s.input, { [s.input_disabled]: disabled }, className);
    return (
      <div className={inputClassName}>
        <input
          {...props}
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
        />
        {afterSlot}
      </div>
    );
  }
);

export default React.memo(Input);
