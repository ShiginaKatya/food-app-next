import Text from '../Text';
import s from './NotFound.module.scss';

const NotFound = () => {
  return (
    <main className={s.main}>
      <Text view="title" weight="bold">
        Page not found 404
      </Text>
    </main>
  );
};

export default NotFound;
