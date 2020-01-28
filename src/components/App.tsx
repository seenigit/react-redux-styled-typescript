import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home"
import Parts from "./pages/Parts"

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={Home} />
        <Route path="/add_parts" component={Parts} />
      </div>
    </Router>
    
  );
}

export default App;
