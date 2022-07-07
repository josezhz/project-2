import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./pages/Home/Home";
import Teams from "./pages/Teams/Teams";

class App extends React.Component {
  state = {
    active: null
  }

  render() {
    return (
      <React.Fragment>
        <Teams />
      </React.Fragment>
    );
  }
}

export default App;
