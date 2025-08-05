import { Route, Routes } from 'react-router'
import Home from '../pages/Home'
import Upload from '../pages/Upload'
import Search from '../components/Search'

const AppRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/search' element={<Search/>} />
      <Route path='/upload' element={<Upload/>} />
    </Routes>
  )
}

export default AppRoute