import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Home from './pages/home/Home';
import BlogCard from './components/BlogCard/BlogCard';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* <Home /> */}
      <BlogCard />
    </div>
  );
}

export default App;
