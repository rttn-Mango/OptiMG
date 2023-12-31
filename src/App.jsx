import { Routes, Route } from "react-router-dom"
import ScaleLoader from 'react-spinners/ScaleLoader';

//Pages/Components
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import { Suspense, lazy } from "react";

//Lazy loaded Pages
const Homepage = lazy(() => import("./Pages/Homepage"))
const Compress = lazy(() => import("./Pages/Compress"))
const Convert = lazy(() => import("./Pages/Convert"))

function App() {

  return (
    
    <>
      <Header/>
      <Suspense fallback={<div aria-hidden='true' className="loading-fallback"> <ScaleLoader color="#fff" size={100}/> </div>}>
        <Routes>
          <Route index path="/" element={<Homepage/>}/>
          <Route path="/compress" element={<Compress/>}/>
          <Route path="/convert" element={<Convert/>}/>
        </Routes>
      </Suspense>
      <Footer/>
    </>
  )
}

export default App
