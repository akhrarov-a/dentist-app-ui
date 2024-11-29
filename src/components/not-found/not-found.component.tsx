import { observer } from 'mobx-react-lite';
import { useLocales } from '@locales';

/**
 * <NotFound />
 */
const NotFound = observer(() => {
  const { t } = useLocales();

  return (
    <p
      style={{
        margin: '20% 0 0',
        textAlign: 'center',
        fontSize: '40px',
        fontWeight: '500'
      }}
    >
      {t('errors.notFound')}
    </p>
  );
});

export { NotFound };
