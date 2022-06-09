import React, { useEffect, useState } from 'react';
import styles from './News.module.scss';
import cn from "classnames";
import { useAppDispatch, useAppSelector, useAuth } from '../../app/hooks';
import { setPosts } from './NewsSlice';
import { endpoints } from '../../api/endpoints';
import avatar from "./assets/monogram.svg";
import image from "./assets/media.png";
import plus from "./assets/icon.svg";
import { MyModal } from '../modal/modal';

export function News() {
  const auth = useAuth();
  const posts = useAppSelector(state => state.news.posts);
  const dispatch = useAppDispatch();
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await endpoints.news();
      dispatch(setPosts(data));
    };
    fetchData();
  }, []);

  return (
    <div className={styles.newsWrapper}>
      <div className={styles.addPost}
        onClick={() => setModalActive(true)}>
        <img src={plus} />
        <span>Add Post</span>
      </div>
      <div className={styles.cardsWrapper}>
        {posts.map(post => (
          <div key={post.created_at} className={styles.card}>
            <div className={styles.user}>
              <img src={avatar} />
              {auth.userData.name}
            </div>
            {/* <img src={post.image} /> */}
            <img src={image} />
            <span className={styles.title}>
              {post.title}
            </span>
            <p className={styles.description}>
              {post.description}
            </p>
          </div>
        ))}
        <MyModal active={modalActive} setActive={setModalActive} />
      </div>
    </div>
  );
}
