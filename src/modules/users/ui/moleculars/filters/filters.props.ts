import { useSearchParams } from 'react-router-dom';
import { useStore } from '@store';
import { useLocales } from '@locales';
import { useModal } from '@hooks';

/**
 * <UsersTableFilters /> props
 */
const useUsersTableFiltersProps = () => {
  const filterModal = useModal();

  const [search] = useSearchParams();

  const { t } = useLocales();

  const {
    users: { usersFilters, setUsersFilters, getUsers }
  } = useStore();

  const onFilterChange = (key: keyof typeof usersFilters, value: any) => {
    setUsersFilters({ [key]: value });

    const keys: any[] = Object.keys(usersFilters).filter(k => key !== k);

    if (
      !!value ||
      keys.some(key => !!usersFilters[key as keyof typeof usersFilters])
    )
      return;

    onSearch();
  };

  const onSearch = () => {
    getUsers(t, +search.get('page'), +search.get('perPage'));
  };

  return {
    t,
    filterModal,
    usersFilters,
    onFilterChange,
    onSearch
  };
};

export { useUsersTableFiltersProps };
