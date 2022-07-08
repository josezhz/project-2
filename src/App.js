import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
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
    })
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
      </React.Fragment>
    );
  }
}

export default App;
