import {Routes,Route} from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Authentication from './components/Authentication'
import Singup from './components/Singup'
import Validate from './components/Validate'

function Router() {
  return (
    <Routes>
    <Route path='/' element={<Authentication/>}>
        <Route path='' index element={<Login/>}/>
        <Route path='/signup' element={<Singup/>}/>
    </Route>
    <Route path='/home' element={<Body/>}/>
    <Route path='/validate' element={<Validate/>}/>
    </Routes>
  )
}

export default Router
