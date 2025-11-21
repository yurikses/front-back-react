import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Navigation} from "./components/navigation.tsx";
import {HomePage} from "./pages/Home.tsx";
import {AddTechnologyPage} from "./pages/AddTechnology.tsx";
import {TechnologyDetailPage} from "./pages/TechnologyDetails.tsx";
import {TechnologyListPage} from "./pages/TechnologyList.tsx";

export type Technology = {
  id: number,
  title: string,
  description: string,
  status: string,
  notes: string ,
  category: string,
}



function App() {


  return (
    /*<Navigation/>*/
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" Component={HomePage}/>
        <Route path="/add-technology" Component={AddTechnologyPage}/>
        <Route path="/technologies" Component={TechnologyListPage}/>
        <Route path="/technology/:techId" Component={TechnologyDetailPage}/>
      </Routes>

    </Router>
  )
}


export default App
