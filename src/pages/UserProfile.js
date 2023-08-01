import styles from '../styles/settings.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addFriend, fetchUser, removeFriend } from '../api';
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../components';
import { useAuth } from '../hooks';
export const UserProfile = () => {
  const { addToast } = useToasts();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  console.log('auth', auth);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUser(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        addToast(response.message, { appearance: 'error' });
        navigate('/');
      }
      setLoading(false);
    };

    getUser();
  }, [userId, navigate, addToast]);

  if (loading) return <Loader />;

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friends;

    const friendIds = friends?.map((friend) => friend.to_user._id);
    const index = friendIds?.indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);
    const response = await removeFriend(userId);
    if (response.success) {
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user._id === userId
      );
      auth.updateUserFriends(false, friendship[0]);
      addToast('Friend Removed Successfully !!', { appearance: 'success' });
    } else {
      addToast(response.message, { appearance: 'error' });
    }

    setRequestInProgress(false);
  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);
    const response = await addFriend(userId);
    if (response.success) {
      const { friendship } = response.data;
      auth.updateUserFriends(true, friendship);
      addToast('Friend Added Successfully !!', { appearance: 'success' });
    } else {
      addToast(response.message, { appearance: 'error' });
    }

    setRequestInProgress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/256/8326/8326720.png"
          alt=""
        />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Removing Friend' : 'Remove Friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Adding Friend' : 'Add Friend'}
          </button>
        )}
      </div>
    </div>
  );
};
