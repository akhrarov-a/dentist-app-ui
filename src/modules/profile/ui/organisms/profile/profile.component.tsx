import { Fragment } from 'react';
import { hoc } from '@utils';
import { Form, View } from '../../moleculars';
import { useProfileProps } from './profile.props';

/**
 * <Profile />
 */
const Profile = hoc.observer(
  useProfileProps,
  ({ isEditing, toggleEditing }) => (
    <Fragment>
      {isEditing ? (
        <Form toggleEditing={toggleEditing} />
      ) : (
        <View toggleEditing={toggleEditing} />
      )}
    </Fragment>
  )
);

export { Profile };
