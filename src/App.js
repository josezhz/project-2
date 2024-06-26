import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Explore from "./pages/Explore";
import Create from "./pages/Create";
import UpdateTeam from "./components/UpdateTeam";

class App extends React.Component {
  state = {
    allTeams: [],
    teams: [],
    active: "explore",
    navbarHidden: true,
    filterHidden: true,
    loading: false,
    editing: false,
    teamBeingUpdated: null,
    teamBeingDeleted: null,
    selectingCharacters: false,
    selectingBoss: false
  }

  // BASE_URI = "https://giteams.herokuapp.com/";
  BASE_URI = "https://giteams.up.railway.app/";

  allCharacters = [];
  allWeapons = [];
  allArtifacts = [];
  allBosses = [];

  async componentDidMount() {
    this.setState({
      loading: true
    })

    const BASE_URI = this.BASE_URI;

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
      allTeams: resTeams.data.teams,
      teams: resTeams.data.teams.reverse(),
      loading: false
    });
  }

  getCharacterById = _id => this.allCharacters.filter(c => c._id === _id)[0];
  getWeaponById = _id => this.allWeapons.filter(w => w._id === _id)[0];
  getArtifactById = _id => this.allArtifacts.filter(a => a._id === _id)[0];
  getBossById = _id => this.allBosses.filter(b => b._id === _id)[0];

  renderPage() {
    if (this.state.teamBeingUpdated) {
      return (
        <UpdateTeam
          t={this.state.teamBeingUpdated}
          allTeams={this.state.allTeams}

          allCharacters={this.allCharacters}
          allWeapons={this.allWeapons}
          allArtifacts={this.allArtifacts}
          allBosses={this.allBosses}
          BASE_URI={this.BASE_URI}

          getCharacterById={this.getCharacterById}
          getWeaponById={this.getWeaponById}
          getArtifactById={this.getArtifactById}
          getBossById={this.getBossById}
          refreshTeams={this.refreshTeams}
          changePage={this.changePage}
          updateTeamBeingUpdated={this.updateTeamBeingUpdated}
        />
      )
    } else if (this.state.active === "explore") {
      return (
        <Explore
          allTeams={this.state.allTeams}
          teams={this.state.teams}
          filterHidden={this.state.filterHidden}
          loading={this.state.loading}
          editing={this.state.editing}
          selectingCharacters={this.state.selectingCharacters}
          selectingBoss={this.state.selectingBoss}

          allCharacters={this.allCharacters}
          allBosses={this.allBosses}
          BASE_URI={this.BASE_URI}

          getCharacterById={this.getCharacterById}
          getWeaponById={this.getWeaponById}
          getArtifactById={this.getArtifactById}
          getBossById={this.getBossById}
          toggleFilter={this.toggleFilter}
          refreshTeams={this.refreshTeams}
          changePage={this.changePage}
          updateTeamBeingUpdated={this.updateTeamBeingUpdated}
          updateTeamBeingDeleted={this.updateTeamBeingDeleted}
          toggleEditing={this.toggleEditing}
          updateSelectingCharacters={this.updateSelectingCharacters}
          updateSelectingBoss={this.updateSelectingBoss}
        />
      )
    } else if (this.state.active === "create") {
      return (
        <Create
          allTeams={this.state.allTeams}
          teams={this.state.teams}

          allCharacters={this.allCharacters}
          allWeapons={this.allWeapons}
          allArtifacts={this.allArtifacts}
          allBosses={this.allBosses}
          BASE_URI={this.BASE_URI}

          getCharacterById={this.getCharacterById}
          getWeaponById={this.getWeaponById}
          getArtifactById={this.getArtifactById}
          getBossById={this.getBossById}
          refreshTeams={this.refreshTeams}
          changePage={this.changePage}
        />
      )
    }
  }

  changePage = (page) => {
    this.setState({
      active: page
    });
  }

  refreshTeams = async (criteria) => {
    this.setState({
      loading: true
    })
    let resAllTeams = await axios.get(this.BASE_URI + "teams");
    let resTeams = await axios.get(this.BASE_URI + "teams", { params: criteria });
    this.setState({
      allTeams: resAllTeams.data.teams,
      teams: resTeams.data.teams.reverse(),
      loading: false
    });
  }

  toggleFilter = () => {
    this.setState({
      filterHidden: !this.state.filterHidden
    })
  }

  toggleEditing = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  updateSelectingCharacters = boolean => {
    this.setState({
      selectingCharacters: boolean
    })
  }

  updateSelectingBoss = boolean => {
    this.setState({
      selectingBoss: boolean
    })
  }

  updateTeamBeingUpdated = t => {
    this.setState({
      teamBeingUpdated: t
    })
  }

  updateTeamBeingDeleted = t => {
    this.setState({
      teamBeingDeleted: t
    })
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <nav className="navbar navbar-expand-sm navbar-light bg-light p-0">
            <div className="container-fluid bg-light p-0">
              <button className="navbar-brand border-0 bg-none ms-md-3"
                onClick={() => {
                  this.refreshTeams();
                  this.setState({
                    active: "explore",
                    navbarHidden: true,
                    filterHidden: true,
                    teamBeingUpdated: null,
                    editing: false,
                    selectingCharacters: false,
                    selectingBoss: false
                  });
                }}
              >
                <img src={require("./images/logos/logo.png")} alt="" className="" height="48px" />
              </button>
              <button className="d-sm-none border-0 bg-none" onClick={() => { this.setState({ navbarHidden: !this.state.navbarHidden }) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                  {this.state.navbarHidden ?
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    :
                    <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                  }
                </svg>
              </button>
              <div className={"navbar-content container-fluid bg-light" + (this.state.navbarHidden ? " hide" : "")}>
                <ul className="navbar-nav container-fluid d-flex justify-content-md-evenly">
                  <li className="nav-item mx-auto mx-md-0 mb-2 mb-sm-0">
                    <button
                      className={"nav-link border-0 bg-none pb-sm-0" + (this.state.active === "explore" ? " active" : "")}
                      onClick={() => {
                        this.refreshTeams();
                        this.setState({
                          active: "explore",
                          navbarHidden: true,
                          filterHidden: true,
                          teamBeingUpdated: null,
                          editing: false,
                          selectingCharacters: false,
                          selectingBoss: false
                        });
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                        {this.state.active === "explore" ?
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
                      onClick={() => {
                        this.setState({
                          active: "create",
                          navbarHidden: true,
                          filterHidden: true,
                          teamBeingUpdated: null,
                          editing: false,
                          selectingCharacters: false,
                          selectingBoss: false
                        })
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                        {this.state.active === "create" ?
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

                </ul>
              </div>
            </div>
          </nav>
        </header>

        <main>
          {this.renderPage()}
          {this.state.loading ?
            <div className="loading-page">
              <div className="loading-text">
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
              </div>
            </div> : null
          }
          {this.state.teamBeingDeleted ?
            <div className="confirm-delete-page">
              <div className="confirm-delete-alert rounded border border-danger">
                <h5>Confirm delete team:</h5>
                <div className="text-center">{"Raiden National Team"}?</div>
                <div className="d-flex px-4 mt-4">
                  <button className="btn btn-outline-secondary btn-sm rounded-pill"
                    sty
                    onClick={() => { this.updateTeamBeingDeleted(null) }}
                  >Cancel</button>
                  <button className="btn btn-danger btn-sm rounded-pill ms-auto"
                    onClick={async () => {
                      await axios.delete(this.BASE_URI + "teams/" + this.state.teamBeingDeleted._id);
                      this.refreshTeams();
                      this.updateTeamBeingDeleted(null);
                      this.setState({ editing: false });
                    }}
                  >Delete</button>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16"
                  className="position-absolute top-0 start-100 translate-middle bg-light text-secondary rounded-circle"
                  style={{ cursor: "pointer" }}
                  onClick={() => { this.updateTeamBeingDeleted(null) }}
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                </svg>
              </div>
            </div> : null
          }
        </main>
      </React.Fragment>
    );
  }
}

export default App;
