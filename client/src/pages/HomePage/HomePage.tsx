import React, { useEffect, useState } from 'react';
import { Article, Text } from '../../components';
import { deletePost, getPosts } from '../../redux/actions/postActions';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import cls from './Home.module.scss';
import moment from 'moment';
import { Editor } from '../../components/Modal/Editor';

const HomePage = () => {
  const { posts } = useAppSelector((state) => state.post);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const removePost = async (id: string) => {
    dispatch(deletePost(id));
  };

  const openEditor = (id: string) => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <div className="container">
      {isOpen && <Editor active={true} closeEditor={() => {setIsOpen(false)}}/>}

      <div className={cls.home}>
        <Text type="h1" className={cls.title}>
          Unusual blog
        </Text>
        <div className={cls.allposts}>
          {posts.map((post) => (
            <Article
              title={post.title}
              description={post.description}
              createdAt={moment(post.createdAT).format('LLL')}
              id={post._id}
              onDeletePost={removePost}
              onOpenEditor={openEditor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
