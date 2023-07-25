import styles from '../styles/home.module.css';
import PropTypes from 'prop-types';

export const Comment = ({ comment }, index) => {
  return (
    <div className={styles.postCommentsItem} key={index}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>a minute ago</span>
        <span className={styles.postCommentLikes}>22</span>
      </div>

      <div className={styles.postCommentContent}>{comment.comtent}</div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};
