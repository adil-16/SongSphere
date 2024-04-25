import { BrowserRouter as Router } from "react-router-dom";
import PagesRoutes from "./routes/PageRoutes";

function App() {
  return (
    <>
      <Router>
        <PagesRoutes />
      </Router>
    </>
  );
}

export default App;
