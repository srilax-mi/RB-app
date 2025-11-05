
import './App.css'
import Header from './Components/Header';
import Footer  from './Components/Footer';
import { Route, Routes } from 'react-router-dom';
import Landingpage from './Pages/Landingpage'
import Resumegenerator from './Pages/Resumegenerator'
import History from './Pages/History'
import Form from './Pages/Form'
import Pagenotfound from './Pages/Pagenotfound'


function App() {

  return (
    <div className="app-wrapper">
      <Header/>
      <main className="main-content">
        <Routes>
          <Route path='' element={<Landingpage/>}/>
          <Route path='/resume-generator' element={<Resumegenerator/>}/>
          <Route path='/History' element={<History/>}/>
          <Route path='/Form' element={<Form/>}/>
          <Route path='/*' element={<Pagenotfound/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App
