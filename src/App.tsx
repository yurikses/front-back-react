import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Navigation} from "./components/navigation.tsx";
import {HomePage} from "./pages/Home.tsx";
import {AddTechnologyPage} from "./pages/AddTechnology.tsx";
import {TechnologyDetailPage} from "./pages/TechnologyDetails.tsx";
import {TechnologyListPage} from "./pages/TechnologyList.tsx";
import {StatisticsPage} from "./pages/statistics.tsx";
import {AuthorizationPage} from "@/pages/Authorization.tsx";
import {SettingsPage} from "@/pages/Settings.tsx";
import {AuthProvider} from "@/hooks/useUser.tsx";
import {ThemeProvider} from "@/hooks/useTheme.tsx";

export type Technology = {
  id: string,
  title: string,
  description: string,
  status: string,
  previewSrc: string,
  notes: string ,
  category: string,
  resources: string[] ,
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router basename={'/front-back-react/'}>
          <Navigation/>
          <Routes>
            <Route path="/" Component={HomePage}/>
            <Route path="/add-technology" Component={AddTechnologyPage}/>
            <Route path="/technologies" Component={TechnologyListPage}/>
            <Route path="/technology/:techId" Component={TechnologyDetailPage}/>
            <Route path="/statistics" Component={StatisticsPage}/>
            <Route path="/auth" Component={AuthorizationPage}/>
            <Route path="/settings" Component={SettingsPage}/>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
