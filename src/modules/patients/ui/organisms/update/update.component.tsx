import { hoc } from '@utils';
import { Form, View } from '../../moleculars';
import { useUpdatePatientProps } from './update.props';
import { Fragment } from 'react';

/**
 * <UpdatePatient />
 */
const UpdatePatient = hoc.observer(
  useUpdatePatientProps,
  ({ isEditing, initialValues, onSubmit, onDelete, toggleEditing }) => (
    <Fragment>
      {isEditing ? (
        <Form
          isEdit
          initialValues={initialValues}
          onSubmit={onSubmit}
          toggleEditing={toggleEditing}
        />
      ) : (
        <View
          initialValues={initialValues}
          onDelete={onDelete}
          toggleEditing={toggleEditing}
        />
      )}
    </Fragment>
  )
);

export { UpdatePatient };
