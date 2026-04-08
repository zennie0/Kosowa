import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import Story from './pages/Story/Story'
import MyStory from './pages/MyStory/MyStory'
import Profile from './pages/Profile/Profile'
import Dashboard from './pages/Dashboard/Dashboard'
import CreateStory from './pages/CreateStory/CreateStory'
import NotFound from './pages/NotFound/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/story/:id" element={<Story />} />
        <Route path="/story/new" element={<CreateStory />} />
        <Route path="/mystory/:id" element={<MyStory />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App