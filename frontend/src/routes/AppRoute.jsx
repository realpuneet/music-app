import { Route, Routes } from 'react-router'
import Home from '../pages/Home'
import Upload from '../components/Upload'
import Search from '../components/Search'
import AllSongs from '../pages/AllSongs'

const AppRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/search' element={<Search/>} />
      <Route path='/upload' element={<Upload/>} />
      <Route path='/all-songs' element={<AllSongs/>} />
    </Routes>
  )
}

export default AppRoute;