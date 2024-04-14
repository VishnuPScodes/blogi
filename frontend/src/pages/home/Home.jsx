import React from 'react';
import styles from './home.module.css';
import LeftSidebar from '../../components/Leftbar/LeftBar';
import BlogCard from '../../components/BlogCard/BlogCard';
function Home() {
  const data = [1, 2, 3, 4];
  return (
    <div className={styles.main_page}>
      <div>Welcome to the house!</div>
      <LeftSidebar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {data.map((e) => {
          return <BlogCard data={e} />;
        })}
      </div>
    </div>
  );
}

export default Home;
