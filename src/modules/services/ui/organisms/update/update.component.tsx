import { Fragment } from 'react';
import { hoc } from '@utils';
import { Form, View } from '../../moleculars';
import { useUpdateServiceProps } from './update.props';

/**
 * <UpdateService />
 */
const UpdateService = hoc.observer(
  useUpdateServiceProps,
  ({
    isEditing,
    isFetchedService,
    initialValues,
    onSubmit,
    onDelete,
    toggleEditing
  }) => (
    <Fragment>
      {isEditing ? (
        <Form
          isEdit
          isFetchedService={isFetchedService}
          initialValues={initialValues}
          onSubmit={onSubmit}
          toggleEditing={toggleEditing}
        />
      ) : (
        <View
          isFetchedService={isFetchedService}
          initialValues={initialValues}
          onDelete={onDelete}
          toggleEditing={toggleEditing}
        />
      )}
    </Fragment>
  )
);

export { UpdateService };
