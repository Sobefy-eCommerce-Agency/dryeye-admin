import { BrowserRouter as Router } from "react-router-dom";
import AppContainer from "./components/container/appContainer";
import Sidebar from "./components/sidebar";
import WorkspaceContainer from "./components/container/workspaceContainer";

function App() {
  return (
    <AppContainer>
      <Router>
        <Sidebar />
        <WorkspaceContainer />
      </Router>
    </AppContainer>
  );
}

export default App;
