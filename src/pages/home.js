import styles from '../styles/home.module.css';
import { Loader, FriendList, CreatePost } from '../components';
import { useAuth, usePosts } from '../hooks';
import { Post } from '../components/Post';

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
          < Post post={post} key={post._id} />
        ))}
        ;
      </div>
      {auth.user && <FriendList />}
    </div>
  );
};



export default Home;
