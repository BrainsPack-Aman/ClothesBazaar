import ProductPage from '../src/Pages/ProductPage';
import Filters from "../src/components/Filters";
import Navbar from "./components/Navbar";
import './App.css'

function App() {
  return (
    <div>
      <Navbar />
      <Filters />
      <ProductPage />
    </div>
  )
}

export default App