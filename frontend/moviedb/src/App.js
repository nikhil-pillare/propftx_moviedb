import logo from './logo.svg';
import './App.css';
import Nav from './component/Nav'
import { MainRoutes } from './pages/mainRoutes';
function App() {
  const backgroundImageStyle = {
    
    margin: 0,
    padding: 0,
    height: '100vh', 
    overflow: 'hidden',
    backgroundImage: "url('https://dqae.org/wp-content/uploads/2022/09/234234-1536x864.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  
  };
  return (
    <div className="App" >
      
      <MainRoutes/>
    </div>
  );
}

export default App;
