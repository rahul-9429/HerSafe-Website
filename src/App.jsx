import Header from './components/header'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import './App.css'
import Join from './components/Join'
import Quote from './components/Quote'
function App() {
  

  return (
    <>
    <Header/>
    <div className='sm:px-20 px-6 sm:py-4 py-2 xyz'>
    <Hero/>
    <Join/>
    <Features/>
    <Quote/>
    </div>
    <Footer/>
    </>
  )
}

export default App
