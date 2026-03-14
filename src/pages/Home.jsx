import { useLoaderData } from 'react-router';
import useLocalStorage from '../hooks/useLocalStorage';

import defaultReadingList from '../utils/defaultReadingList.js';
import OpenBookList from '../components/OpenBookList.jsx';

function Home () {
  const {weeklyTrending, monthlyTrending} = useLoaderData();
  const [readingList, setReadingList] = useLocalStorage('readingList', defaultReadingList);
  return (
    <main id="home-page">
      <OpenBookList id='reading-list' books={readingList} title="My Books" />
      <OpenBookList id='weekly-trending' books={weeklyTrending} title="Trending this week"/>
      <OpenBookList id='monthly-trending' books={monthlyTrending} title="Trending this month"/>
    </main>
  )
}

export default Home;