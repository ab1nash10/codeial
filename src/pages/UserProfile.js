import styles from '../styles/settings.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUser } from '../api';
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../components';
import { useAuth } from '../hooks';
export const UserProfile = () => {
  const { addToast } = useToasts();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();
  const auth  = useAuth();


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

  if (loading)
  return <Loader />;


  const checkIfUserIsAFriend = () => {
    
    const friends = auth.user.friendships;

    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
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
        { checkIfUserIsAFriend() ? (
          <button className={`button ${styles.saveBtn}`}>Remove friend</button>
        ) : (
          <button className={`button ${styles.saveBtn}`}>Add friend</button>
        )}
      </div>
    </div>
  );
};
