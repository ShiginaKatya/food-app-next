import * as React from 'react';

import Icon, { type IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props} height="24" width="24" type="stroke" data-testid="icon" viewBox="0 0 24 24">
      <path xmlns="http://www.w3.org/2000/svg" d="M4 11.6129L9.87755 18L20 7" strokeWidth="2" />
    </Icon>
  );
};
export default React.memo(CheckIcon);
