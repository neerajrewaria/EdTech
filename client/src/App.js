import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Common/Navbar';
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail"
import Dashboard from "./pages/Dashboard";
import PrivateRoute from './Components/Common/PrivateRoute';
import CategoryPage from './Components/core/CatalogPage/CategoryPage';
import CoursePage from './pages/CoursePage';
import './App.css';
import CartPage from './pages/CartPage';
import ViewCourse from './pages/ViewCourse';
import AboutPage from './pages/AboutPage';
import ForgotPassword from './pages/ForgotPassword';
import CheckEmail from './pages/CheckEmail';
import ResetPassword from './pages/ResetPassword';
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";



function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/about' element={<About/>} /> */}
        <Route path='/signup' element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-course/:courseId"
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        />
        {/* //pages */}
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/check-email"
          element={<CheckEmail />}
        />
        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route path='/cart' element={<CartPage />} />
        <Route path='/catalog/:categoryId' element={<CategoryPage />}></Route>
        <Route path='/courses/:courseId' element={<CoursePage />} />
      </Routes>

    </div>




  );
}

export default App;
