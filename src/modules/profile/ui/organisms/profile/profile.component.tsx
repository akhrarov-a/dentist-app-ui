import { Fragment } from 'react';
import { hoc } from '@utils';
import { Form, View } from '../../moleculars';
import { useProfileProps } from './profile.props';

/**
 * <Profile />
 */
const Profile = hoc.observer(useProfileProps, ({ isEditing }) => (
  <Fragment>{isEditing ? <Form /> : <View />}</Fragment>
));

export { Profile };
