import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { PatientForm } from '../../../patients.types.ts';
import styles from './view.module.scss';

/**
 * <View />
 */
const View = observer(
  ({
    initialValues,
    onDelete,
    toggleEditing
  }: {
    initialValues: PatientForm;
    onDelete: () => void;
    toggleEditing?: () => void;
  }) => {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <p>
            Patient: {initialValues.firstname || ''}{' '}
            {initialValues.lastname || ''}
          </p>
          <div className={styles.header_buttons}>
            <Button onClick={onDelete}>Delete</Button>
            <Button type="primary" onClick={toggleEditing}>
              Edit
            </Button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.content_field}>
            <p>Firstname</p>
            <p>{initialValues.firstname}</p>
          </div>
          <div className={styles.content_field}>
            <p>Phone</p>
            <p>{initialValues.phone}</p>
          </div>
          <div className={styles.content_field}>
            <p>Lastname</p>
            <p>{initialValues.lastname}</p>
          </div>
          <div className={styles.content_field}>
            <p>Email</p>
            <p>{initialValues.email}</p>
          </div>
        </div>
        <div className={styles.content_field}>
          <p>Description</p>
          <p>{initialValues.description}</p>
        </div>
      </div>
    );
  }
);

export { View };
