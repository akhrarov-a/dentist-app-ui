import { useSearchParams } from 'react-router-dom';
import { useStore } from '@store';
import { useLocales } from '@locales';
import { useModal } from '@hooks';

/**
 * <PatientsTableFilters /> props
 */
const usePatientsTableFiltersProps = () => {
  const filterModal = useModal()

  const [search] = useSearchParams();

  const { t } = useLocales();

  const {
    patients: { patientsFilters, setPatientsFilters, getPatients }
  } = useStore();

  const onFilterChange = (key: keyof typeof patientsFilters, value: any) => {
    setPatientsFilters({ [key]: value });

    const keys: any[] = Object.keys(patientsFilters).filter(k => key !== k);

    if (
      !!value ||
      keys.some(key => !!patientsFilters[key as keyof typeof patientsFilters])
    )
      return;

    onSearch();
  };

  const onSearch = () => {
    getPatients(t, +search.get('page'), +search.get('perPage'));
  };

  return {
    t,
    filterModal,
    patientsFilters,
    onFilterChange,
    onSearch
  };
};

export { usePatientsTableFiltersProps };
