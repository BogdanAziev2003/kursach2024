import "./App.css"
import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Unemployed from "./components/Unemployed"
import Vacancy from "./components/Vacancy"
import Archive from "./components/Archive"

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Unemployed />} />
        <Route path="/vacancy" element={<Vacancy />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </div>
  )
}

export default App
