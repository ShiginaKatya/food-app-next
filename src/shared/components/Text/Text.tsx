import classNames from 'classnames';
import * as React from 'react';

import s from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag: Tag = 'p',
  weight = 'normal',
  children,
  color = 'inherit',
  maxLines,
}) => {
  return (
    <Tag
      className={classNames(
        s.txt,
        view && s[`txt_view_${view}`],
        s[`txt_color_${color}`],
        s[`txt_weight_${weight}`],
        maxLines && s.txt_clamp,
        className
      )}
      style={maxLines ? ({ '--max-lines': maxLines } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
};

export default React.memo(Text);
