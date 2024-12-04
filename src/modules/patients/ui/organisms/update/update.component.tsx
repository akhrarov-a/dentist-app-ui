import { Fragment } from 'react';
import { hoc } from '@utils';
import { Form, View } from '../../moleculars';
import { useUpdatePatientProps } from './update.props';

/**
 * <UpdatePatient />
 */
const UpdatePatient = hoc.observer(
  useUpdatePatientProps,
  ({
    isEditing,
    isFetchedPatient,
    initialValues,
    onSubmit,
    onDelete,
    toggleEditing
  }) => (
    <Fragment>
      {isEditing ? (
        <Form
          isEdit
          isFetchedPatient={isFetchedPatient}
          initialValues={initialValues}
          onSubmit={onSubmit}
          toggleEditing={toggleEditing}
        />
      ) : (
        <View
          isFetchedPatient={isFetchedPatient}
          initialValues={initialValues}
          onDelete={onDelete}
          toggleEditing={toggleEditing}
        />
      )}
    </Fragment>
  )
);

export { UpdatePatient };
