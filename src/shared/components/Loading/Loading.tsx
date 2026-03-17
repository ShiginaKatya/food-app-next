import Loader from '../Loader';
import s from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={s.loader}>
      <Loader size="l" />
    </div>
  );
};

export default Loading;
