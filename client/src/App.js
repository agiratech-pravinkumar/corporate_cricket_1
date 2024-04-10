import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Pagenotfound from "./pages/Pagenotfound";
import LoginForm from "./pages/LoginForm";
import SignUpForm from "./pages/SignUpForm";
import JoinTournamentForm from "./pages/JoinTournamentForm";
import HomeWithOrgId from "./pages/HomeOrgId";
import CreateTournament from "./pages/CreateTournament"
import MatchesPage from "./pages/MatchesPage"; 
import UpdateTournament from "./pages/UpdateTournament";
import ForbiddenPage from "./pages/ForbiddenPage";
function App() {

  console.log("ENV For more information  " + process.env.REACT_APP_SERVER);
  return (
    <>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/register" element={<SignUpForm/>}/>
          <Route path="/tournaments/Jointournament" element={<JoinTournamentForm/>}/>
          <Route path="/home/:organization_id" element={<HomeWithOrgId/>}/>
          <Route path="/forbidden" element={<ForbiddenPage/>} /> 
          <Route path="*" element={<Pagenotfound />} />
          <Route path="tournaments/create_tournament" element={<CreateTournament/>}/>
          <Route path="tournaments/matches/:tournamentId" element={<MatchesPage />} />
          <Route path="/tournaments/matches/update-result/:matchId" element={<UpdateTournament />} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;


