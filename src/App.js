import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import Teams from "./pages/Teams/Teams";
import AddTeam from "./pages/AddTeam/AddTeam";

class App extends React.Component {
  state = {
    teams: [],
    active: "explore",
    navbarHidden: true,
    filterHidden: true
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
          <nav className="navbar navbar-expand-sm navbar-light bg-light p-0">
            <div className="container-fluid bg-light p-0">
              <button className="navbar-brand border-0 bg-none ms-md-3" onClick={() => { this.setState({ active: "explore" }) }}>
                <img src={require("./images/logos/logo.png")} alt="" className="" height="48px" />
              </button>
              <button className="d-sm-none border-0 bg-none" onClick={() => { this.setState({ navbarHidden: !this.state.navbarHidden }) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                  {
                    this.state.navbarHidden ?
                      <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                      :
                      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                  }
                </svg>
              </button>
              <div className={"navbar-content container-fluid bg-light" + (this.state.navbarHidden ? " hide" : "")}>
                <ul className="navbar-nav container-fluid d-flex justify-content-md-evenly">
                  <li className="nav-item mx-auto mx-md-0 mb-2 mb-sm-0">
                    <button
                      className={"nav-link border-0 bg-none pb-sm-0" + (this.state.active === "explore" ? " active" : "")}
                      onClick={() => { this.setState({ active: "explore" }) }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                        {
                          this.state.active === "explore" ?
                            <path d="M15.5 8.516a7.5 7.5 0 1 1-9.462-7.24A1 1 0 0 1 7 0h2a1 1 0 0 1 .962 1.276 7.503 7.503 0 0 1 5.538 7.24zm-3.61-3.905L6.94 7.439 4.11 12.39l4.95-2.828 2.828-4.95z" />
                            :
                            <React.Fragment>
                              <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                              <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                            </React.Fragment>
                        }
                      </svg>
                      Explore
                    </button>
                  </li>
                  <li className="nav-item mx-auto mx-md-3 mx-lg-5 mb-2 mb-sm-0">
                    <button
                      className={"nav-link border-0 bg-none pb-sm-0" + (this.state.active === "create" ? " active" : "")}
                      onClick={() => { this.setState({ active: "create" }) }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                        {
                          this.state.active === "create" ?
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                            :
                            <React.Fragment>
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </React.Fragment>
                        }
                      </svg>
                      Create
                    </button>
                  </li>
                  {/* <li className="nav-item mx-auto mx-md-3 mx-lg-5 mb-2 mb-sm-0">
                    <button
                      className={"nav-link border-0 bg-none pb-sm-0" + (this.state.active === "edit" ? " active" : "")}
                      onClick={() => { this.setState({ active: "edit" }) }}
                    >Edit</button>
                  </li> */}

                </ul>
              </div>
            </div>
          </nav>
        </header>

        <main>

          <div className={"container-fluid filter" + (this.state.filterHidden ? " hide" : "")}>
            {/* <h1>Filter</h1> */}
          </div>

          <div className="container-fluid content bg-light overflow-auto">
            <div className="container">

              <div className="card mt-5">
                <div className="card-header">Raiden National Team</div>
                <div className="card-body d-flex justify-content-between">
                  <img src={require("./images/characters/icons/albedo_icon.webp")} alt="" />
                  <img src={require("./images/characters/icons/albedo_icon.webp")} alt="" />
                  <img src={require("./images/characters/icons/albedo_icon.webp")} alt="" />
                  <img src={require("./images/characters/icons/albedo_icon.webp")} alt="" />
                </div>
              </div>

            </div>
          </div>

          <button className="filter-btn d-lg-none" onClick={() => { this.setState({ filterHidden: !this.state.filterHidden }) }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
              {
                this.state.filterHidden ?
                  <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                  :
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              }
            </svg>
          </button>

        </main>


      </React.Fragment>
    );
  }
}

export default App;
