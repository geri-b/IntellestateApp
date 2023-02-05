import logo from './logo.svg';
import './App.css';
import Navibar from './components/Navibar';
import HomepageLayout from './layout/layout';

function App() {
  return (
    <div className="App">
      <Navibar />
      <HomepageLayout />
    </div>
  );
}

export default App;
