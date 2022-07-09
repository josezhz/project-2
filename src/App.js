import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Teams from "./pages/Teams/Teams";
import AddTeam from "./pages/AddTeam/AddTeam";

class App extends React.Component {
  state = {
    teams: [],
    active: null
  }

  allCharacters = [];
  allWeapons = [];
  allArtifacts = [];
  allBosses = [];

  async componentDidMount() {
    const BASE_URI = "https://giteams.herokuapp.com/";

    let reqCharacters = axios.get(BASE_URI + "characters");
    let reqWeapons = axios.get(BASE_URI + "weapons");
    let reqArtifacts = axios.get(BASE_URI + "artifacts");
    let reqBosses = axios.get(BASE_URI + "bosses");
    let resCharacters = await reqCharacters;
    let resWeapons = await reqWeapons;
    let resArtifacts = await reqArtifacts;
    let resBosses = await reqBosses;
    this.allCharacters = resCharacters.data;
    this.allWeapons = resWeapons.data;
    this.allArtifacts = resArtifacts.data;
    this.allBosses = resBosses.data.filter(b => b.type === "weekly");

    let resTeams = await axios.get(BASE_URI + "teams");
    this.setState({
      teams: resTeams.data.teams
    });
  }

  render() {
    return (
      <React.Fragment>
        <Teams
          teams={this.state.teams}
          allCharacters={this.allCharacters}
          allWeapons={this.allWeapons}
          allArtifacts={this.allArtifacts}
          allBosses={this.allBosses}
        />
        <AddTeam />


        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="">
                <img src={require("./images/logos/logo.png")} alt="" height="48px" />
              </a>
              <button className="d-lg-none border-0 bg-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
              </button>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav mx-auto">
                  <li className="nav-item">
                    <a className="nav-link fs-5" href="">Explore</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link fs-5" href="">Create</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link fs-5" href="">Edit</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>


      </React.Fragment>
    );
  }
}

export default App;
