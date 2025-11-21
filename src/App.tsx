import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Navigation} from "./components/navigation.tsx";
import {HomePage} from "./pages/Home.tsx";
import {AddTechnologyPage} from "./pages/AddTechnology.tsx";
import {TechnologyDetailPage} from "./pages/TechnologyDetails.tsx";
import {TechnologyListPage} from "./pages/TechnologyList.tsx";
import {StatisticsPage} from "./pages/statistics.tsx";

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
    <Router  basename={'/front-back-react/'}>
      <Navigation/>
      <Routes >
        <Route path="/" Component={HomePage}/>
        <Route path="/add-technology" Component={AddTechnologyPage}/>
        <Route path="/technologies" Component={TechnologyListPage}/>
        <Route path="/technology/:techId" Component={TechnologyDetailPage}/>
        <Route path="/statistics" Component={StatisticsPage}/>
      </Routes >

    </Router>
  )
}


export default App
