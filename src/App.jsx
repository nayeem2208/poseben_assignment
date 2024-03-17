import './App.css'
import Router from './Router'
import Header from './components/Header'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className='bg-slate-100 h-screen '>
      <Header/>
      <ToastContainer/>
      {/* <Body/> */}
      <Router/>
    </div>
  )
}

export default App
