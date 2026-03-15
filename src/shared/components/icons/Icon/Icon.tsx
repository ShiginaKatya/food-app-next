import type * as React from 'react';

import classNames from 'classnames';

import s from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  size?: number;
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  type?: 'fill' | 'stroke';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  children,
  width,
  height,
  size,
  color,
  type = 'fill',
  ...props
}) => {
  return (
    <svg
      {...props}
      className={classNames(s.icon, s[`icon_color_${color}-${type}`], className)}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      width={size ?? width}
      height={size ?? height}
      fill="none"
    >
      {children}
    </svg>
  );
};

export default Icon;
