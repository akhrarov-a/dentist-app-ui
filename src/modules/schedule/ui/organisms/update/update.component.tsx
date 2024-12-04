import { hoc } from '@utils';
import { NotFound } from '@components';
import { Form } from '../../moleculars';
import { useUpdatePatientProps } from './update.props';

/**
 * <UpdateAppointment />
 */
const UpdateAppointment = hoc.observer(
  useUpdatePatientProps,
  ({ initialValues, isFetchedSchedule, onSubmit, onDelete }) => {
    if (!Object.keys(initialValues || {}).length && isFetchedSchedule)
      return <NotFound />;

    return (
      <Form
        isEdit
        initialValues={initialValues}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    );
  }
);

export { UpdateAppointment };
