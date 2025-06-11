
import './App.css'
import { NavBar } from './components/NavBar/NavBar';
import { NewHabit } from './views/NewHabit/NewHabit';
import { Home } from './views/Home/Home';
import { Layout, theme } from 'antd';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';


function App() {
  
  return (
    <>
    	<Router>
      	<NavBar />
      	<Layout style={{ padding: '15px', backgroundColor: '#000000', height:'100vh' }}>
          <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/newHabit" element={<NewHabit />} />
          </Routes> 
      	</Layout>
      </Router>
    </>

  )
}

export default App
