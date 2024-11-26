import { useSearchParams } from 'react-router-dom';
import { useStore } from '@store';
import { useLocales } from '@locales';

/**
 * <ServicesTableFilters /> props
 */
const useServicesTableFiltersProps = () => {
  const [search] = useSearchParams();

  const { t } = useLocales();

  const {
    services: { servicesFilters, setServicesFilters, getServices }
  } = useStore();

  const onFilterChange = (key: keyof typeof servicesFilters, value: any) => {
    setServicesFilters({ [key]: value });

    const keys: any[] = Object.keys(servicesFilters).filter(k => key !== k);

    if (
      !!value ||
      keys.some(key => !!servicesFilters[key as keyof typeof servicesFilters])
    )
      return;

    onSearch();
  };

  const onSearch = () => {
    getServices(+search.get('page'), +search.get('perPage'));
  };

  return {
    t,
    servicesFilters,
    onFilterChange,
    onSearch
  };
};

export { useServicesTableFiltersProps };
