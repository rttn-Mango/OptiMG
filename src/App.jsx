import Compress from "./Pages/Compress"
import Convert from "./Pages/Convert"
import Homepage from "./Pages/Homepage"
import Header from "./Components/Header"
import Footer from "./Components/Footer"

function App() {

  return (
    
    <>
      <Header/>
      <Homepage />
      <Compress />
      <Convert/>
      <Footer/>
    </>
  )
}

export default App
