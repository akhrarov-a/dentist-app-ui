import { useSearchParams } from 'react-router-dom';
import { useStore } from '@store';

/**
 * <PatientsTableFilters /> props
 */
const usePatientsTableFiltersProps = () => {
  const [search] = useSearchParams();

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
    getPatients(+search.get('page'), +search.get('perPage'));
  };

  return {
    patientsFilters,
    onFilterChange,
    onSearch
  };
};

export { usePatientsTableFiltersProps };
