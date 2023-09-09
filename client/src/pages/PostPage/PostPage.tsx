import moment from 'moment';
import 'moment/locale/ru';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { $api } from '../../api';
import { avatar, likes, views } from '../../assets';
import { Article, Text } from '../../components';
import { getPost } from '../../redux/actions/postActions';
import { StateSchema, useAppDispatch, useAppSelector } from '../../redux/store';
import { AuthSchema } from '../../redux/types/authTypes';
import cls from './Post.module.scss';

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const post = useAppSelector((state: StateSchema) => state.post.post);
  const user = useAppSelector((state: StateSchema) => state.auth.user);
  const anotherPosts = useAppSelector(
    (state: StateSchema) => state.post.anotherPosts
  );

  useEffect(() => {
    if (id) {
      dispatch(getPost(id));
    }
  }, [id, dispatch]);

  const likeOrUnlike = async () => {
    setIsLiked(!isLiked);
    const token = localStorage.getItem('token');
    try {
      const res = await $api.patch(
        `/post/${id}`,
        {
          likes: [],
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.data) {
        res.data.message === 'Like' ? setIsLiked(true) : setIsLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) return;
    if (post[0].likes.includes(user._id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [post]);

  return (
    <div className="container">
      {post.map((post) => (
        <div className={cls.wrapper}>
          <div className={cls.img_Wrap}>
            <img
              src={`http://localhost:5000${post.picture}`}
              className={cls.image}
              alt="img"
            />
            <div className={cls.likeBtn} onClick={likeOrUnlike}>
              {isLiked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="red"
                >
                  <circle cx="17.5" cy="17.5" r="17.5" fill="white" />
                  <path
                    d="M13.8749 10.75C11.0905 10.75 8.83325 13.0072 8.83325 15.7917C8.83325 20.8333 14.7916 25.4167 17.9999 26.4828C21.2083 25.4167 27.1666 20.8333 27.1666 15.7917C27.1666 13.0072 24.9093 10.75 22.1249 10.75C20.4198 10.75 18.9123 11.5965 17.9999 12.8922C17.0875 11.5965 15.5801 10.75 13.8749 10.75Z"
                    stroke="#454545"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                >
                  <circle cx="17.5" cy="17.5" r="17.5" fill="white" />
                  <path
                    d="M13.8749 10.75C11.0905 10.75 8.83325 13.0072 8.83325 15.7917C8.83325 20.8333 14.7916 25.4167 17.9999 26.4828C21.2083 25.4167 27.1666 20.8333 27.1666 15.7917C27.1666 13.0072 24.9093 10.75 22.1249 10.75C20.4198 10.75 18.9123 11.5965 17.9999 12.8922C17.0875 11.5965 15.5801 10.75 13.8749 10.75Z"
                    stroke="#454545"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>

          <div className={cls.content}>
            <div className={cls.main}>
              <Text type="h2" className={cls.title}>
                {post.title}
              </Text>
              <span>{moment(post.createdAT).format('LLL')}</span>
              <span className={cls.category}>{post.category}</span>
              <p className={cls.text}>{post.description}</p>
            </div>
            <div className={cls.blogInfo}>
              <div className={cls.author}>
                <img
                  className={cls.avatar}
                  width={35}
                  height={35}
                  src={avatar}
                  alt="avatar"
                />
                <span></span>
              </div>
              <div className={cls.likesAndViews}>
                <div className={cls.likes}>
                  <img src={likes} alt="like" />
                  <span>{post.likes.length}</span>
                </div>
                <div className={cls.views}>
                  <img src={views} alt="view" />
                  <span>{post.views}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className={cls.another}>
        {anotherPosts.map(
          (post) =>
            post._id !== id && (
              <Article
                id={post._id}
                title={post.title}
                description={post.description}
                createdAt={post.createdAT}
              />
            )
        )}
      </div>
    </div>
  );
};

export default PostPage;
