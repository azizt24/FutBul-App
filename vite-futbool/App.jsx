import HomePage from '../vite-futbool/src/components/Homepage';

import Welcome from '../vite-futbool/src/components/Welcome';
import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import SavedTeamPage from '../vite-futbool/src/components/SavedTeamsPage';
import SummaryPage from '../vite-futbool/src/components/SummaryPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/live" element={<SummaryPage />} />
        <Route path="/saved" element={<SavedTeamPage />} />
      </Routes>
    </Router>
  );
}

export default App;