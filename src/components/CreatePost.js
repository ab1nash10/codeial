import { useState } from 'react';
import styles from '../styles/home.module.css';
import { addPost } from '../api';
import { useToasts } from 'react-toast-notifications';
import { usePosts } from '../hooks';

export const CreatePost = () => {
  const [post, setPost] = useState([]);
  const [addingPost, setAddingPost] = useState(false);
  const { addToast } = useToasts();
  const posts = usePosts();


  const handleAddPostClick = async () => {
    setAddingPost(true);
    if (post.length === 0) {
      addToast('Post cannot be empty', { appearance: 'error' });
      setAddingPost(false);
      return;
    }
    const response = await addPost(post);
    if (response.success) {
      setPost('');
      posts.addPostToState(response.data.post);
      addToast('Post Created Successfully', { appearance: 'success' });
    } else {
      addToast(response.message, { appearance: 'error' });
    }
    setAddingPost(false);
  };
  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        onChange={(e) => setPost(e.target.value)}
        value={post}
      />
      <div className={styles}>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? 'Adding Post...' : 'Add Post'}
        </button>
      </div>
    </div>
  );
};
