import { useToasts } from "react-toast-notifications";
import { usePosts } from "../hooks";
import PropTypes from "prop-types";
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createComment } from "../api";
import { Comment } from "./comment";





export const Post = ({ post }) => {
    const [comment, setComment] = useState('');
    const [creatingComment, setCreatingComment] = useState(false);
    const posts = usePosts();
    const { addToast } = useToasts();


    const handleAddComment = async (e) => {
        if (e.key === 'Enter') {
            setCreatingComment(true);

            const response = await createComment(comment, post._id);

            if (response.success) {
                setComment('');
                posts.addComment(response.data.comment, post._id);
                addToast('Comment Added Successfully', { appearance: 'success' });
            }
            else {
                addToast(response.message, { appearance: 'error' });
            }
            setCreatingComment(false);
        }

    };

    return (
        <div className={styles.postWrapper} key={post._id}>
            <div className={styles.postHeader}>
                <div className={styles.postAvatar}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/256/4825/4825123.png"
                        alt="user-pic"
                    />
                    <div>
                        <Link
                            to={`/user/${post.user._id}`}
                            state={{ user: post.user }}
                            className={styles.postAuthor}
                        >
                            {post.user.name}
                        </Link>

                        <span className={styles.postTime}>a minute ago</span>
                    </div>
                </div>
                <div className={styles.postContent}>{post.content}</div>

                <div className={styles.postActions}>
                    <div className={styles.postLike}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/3237/3237429.png"
                            alt="likes-icon"
                        />
                        <span>{post.likes.length}</span>
                    </div>

                    <div className={styles.postCommentsIcon}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/6460/6460733.png"
                            alt="comments-icon"
                        />
                        <span>{post.comments.length}</span>
                    </div>
                </div>
                <div className={styles.postCommentBox}>
                    <input placeholder="Start typing a comment" value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={handleAddComment} />
                </div>

                <div className={styles.postCommentsList}>
                    {post.comments.map((comment) => (
                        <Comment comment={comment} key={`post-comment-${comment._id}`} />
                    ))}
                </div>
            </div>
        </div>
    )
}

Post.propTypes = {
    posts: PropTypes.object.isRequired,
};