import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';

export const Settings = () => {
  const auth = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(
    auth.user?.name ? auth.user.name : ''
  );
  const [editPassword, setEditPassword] = useState('');
  const [editConfirmPassword, setEditConfirmPass] = useState('');
  const [Save, setSave] = useState(false);
  const { addToast } = useToasts();
  const clearForm = () => {
    setEditName('');
    setEditPassword('');
    setEditConfirmPass('');
  };

  const updateProfile = async () => {
    setSave(true);
    let error = false;
    if (!editName || !editPassword || !editConfirmPassword) {
      addToast('Please fill all the fields!', { appearance: 'error' });
      error = true;
    }
    if (editPassword !== editConfirmPassword) {
      addToast('Password and Confirm Password should be same!', {
        appearance: 'error',
      });
      error = true;
    }

    if (error) {
      return setSave(false);
    }

    const response = await auth.updateProfile(
      auth.user._id,
      editName,
      editPassword,
      editConfirmPassword
    );
    if (response.success) {
      setEditMode(false);
      setSave(false);
      clearForm();
      return addToast('Profile Updated Successfully!', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, { appearance: 'error' });
    }

    setSave(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/256/4825/4825038.png"
          alt=""
        />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={editConfirmPassword}
              onChange={(e) => setEditConfirmPass(e.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={() => updateProfile()}
            >
              {Save ? 'Saving Profile...' : 'Save Profile'}
            </button>

            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(false)}
            >
              Go Back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};
