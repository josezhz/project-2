import React from "react";
import axios from "axios";

export default class Teams extends React.Component {
    state = {
        teams: []
    };

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
                {
                    this.state.teams.map(t => {
                        return (
                            <React.Fragment>
                                <h5>{t.team_name}</h5>
                                <ul>
                                    {t.team_composition.map(m => {
                                        return (
                                            <li>
                                                <img src={require(`../../images/characters/icons/${this.allCharacters.filter(c => c._id === m.character.$oid)[0].value}_icon.webp`)} alt="" style={{backgroundColor: "gold"}}/>
                                                <div>
                                                    {this.allCharacters.filter(c => c._id === m.character.$oid)[0].display}
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </React.Fragment>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}