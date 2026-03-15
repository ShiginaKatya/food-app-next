import Loader from '@/shared/components/Loader';

import s from './page.module.scss';

const Loading = () => {
  return (
    <div className={s.loader}>
      <Loader size="l" />
    </div>
  );
};

export default Loading;
