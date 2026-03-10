'use client';

import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';

import classNames from 'classnames';

import ArrowDownIcon from '../icons/ArrowDownIcon';
import Input from '../Input';
import s from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const open = () => {
    setIsOpen(true);
    setFilter('');
  };

  useEffect(() => {
    const handlerClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as HTMLElement)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handlerClick);
    return () => {
      window.removeEventListener('click', handlerClick);
    };
  }, []);

  const title = useMemo(() => getTitle(value), [getTitle, value]);
  const selectName = classNames(s.select, className);
  const isEmpty = value.length === 0;

  const filteredOptions = useMemo(() => {
    const str = filter.toLocaleLowerCase();

    return options.filter((o) => o.value.toLocaleLowerCase().indexOf(str) === 0);
  }, [filter, options]);

  const selectedKeysSet = useMemo<Set<Option['key']>>(
    () => new Set(value.map(({ key }) => key)),
    [value]
  );

  const onSelect = useCallback(
    (option: Option) => {
      if (disabled) {
        return;
      }

      if (selectedKeysSet.has(option.key)) {
        onChange([...value].filter(({ key }) => key !== option.key));
      } else {
        onChange([...value, option]);
      }

      ref.current?.focus();
    },
    [disabled, onChange, value, selectedKeysSet]
  );
  const opened = isOpen && !disabled;
  return (
    <div className={selectName} ref={wrapperRef}>
      <Input
        disabled={disabled}
        ref={ref}
        value={opened ? filter : isEmpty ? '' : title}
        placeholder={title}
        onChange={setFilter}
        onClick={open}
        afterSlot={<ArrowDownIcon color="secondary" />}
      />
      {opened && (
        <ul className={s.select__list}>
          {filteredOptions.map((option) => {
            return (
              <li
                className={classNames(
                  s.select__item,
                  selectedKeysSet.has(option.key) && s.select__item_selected
                )}
                key={option.key}
                onMouseDown={() => {
                  onSelect(option);
                }}
              >
                {option.value}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
