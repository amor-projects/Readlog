import { Link } from "react-router";
import { useState } from "react";
function Sidebar ({current}) {
  const [tab, setTab] = useState(current);
  const handleActiveTab = (name) => {
    setTab(name);
  }
  return (
    <nav id='side-bar'>
      <Link 
        to='/' 
        className={tab==='home' ? 'current-tab': ''} 
        onClick={() => handleActiveTab('home')}
      >Home</Link>
      <Link 
        to='/favorites' 
        className={tab==='favorites' ? 'current-tab': ''}
        onClick={() => handleActiveTab('favorites')}
      >Favorites</Link>
      <Link 
        to='/mylists' 
        className={tab==='mylists' ? 'current-tab': ''}
        onClick={() => handleActiveTab('mylists')}
      >My Lists</Link>
      <Link 
        to='/discover' 
        className={tab==='discover' ? 'current-tab' : ''}
        onClick={() => handleActiveTab('discover')}
      >Discover</Link>
      <Link
        to='/quotes' 
        className={tab==='quotes' ? 'current-tab' : ''}
        onClick={() => handleActiveTab('quotes')}
      >Quotes</Link>
      <Link
        to='/readlog' 
        className={tab==='readlog' ? 'current-tab' : ''}
        onClick={() => handleActiveTab('readlog')}
      >Readlog</Link>
    </nav>
  )
}

export default Sidebar;