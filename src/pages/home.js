import { CreatePost, FriendList, Loader } from '../components';
import { Post } from '../components/Post';
import { useAuth, usePosts } from '../hooks';
import styles from '../styles/home.module.css';

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();
  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => (
          <Post post={post} key={post._id} />
        ))}
        ;
      </div>
      {auth.user && <FriendList />}
    </div>
  );
};

export default Home;
