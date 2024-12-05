import { Fragment } from 'react';
import { hoc } from '@utils';
import { Form, View } from '../../moleculars';
import { useUpdateUserProps } from './update.props';

/**
 * <UpdateUser />
 */
const UpdateUser = hoc.observer(
  useUpdateUserProps,
  ({
    isEditing,
    isFetchedUser,
    initialValues,
    onSubmit,
    onDelete,
    toggleEditing
  }) => (
    <Fragment>
      {isEditing ? (
        <Form
          isEdit
          isFetchedUser={isFetchedUser}
          initialValues={initialValues}
          onSubmit={onSubmit}
          toggleEditing={toggleEditing}
        />
      ) : (
        <View
          isFetchedUser={isFetchedUser}
          initialValues={initialValues}
          onDelete={onDelete}
          toggleEditing={toggleEditing}
        />
      )}
    </Fragment>
  )
);

export { UpdateUser };
