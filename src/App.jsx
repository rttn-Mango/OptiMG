import { Routes, Route } from "react-router-dom"
import ScaleLoader from 'react-spinners/ScaleLoader';

//Pages/Components
import Compress from "./Pages/Compress"
import Convert from "./Pages/Convert"
import Homepage from "./Pages/Homepage"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import { Suspense } from "react";

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
