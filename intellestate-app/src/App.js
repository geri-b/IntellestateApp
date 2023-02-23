import './App.css';
import HomepageLayout from './layout/layout';
import BrowsPageLayout from './layout/BrowsPageLayout';
import React, {useState} from 'react';
import Navibar from './components/Navibar';

function App() {
  //hook to determine current page
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log("Executed")
  }

  let pageContent;
  if (currentPage === 'home') {
    pageContent = <HomepageLayout />;
  }
  else if (currentPage === 'browse') {
    pageContent = <BrowsPageLayout />;
  }

  return (
    <div className="App">
      <Navibar handlePageChange={handlePageChange} />
      {pageContent}
    </div>
  );
}

export default App;
