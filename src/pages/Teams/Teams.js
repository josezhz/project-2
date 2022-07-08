import React from "react";
import axios from "axios";

export default class Teams extends React.Component {
    state = {
        teams: [],
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
                        return (<div>{t.team_name}</div>)
                    })
                }
                <hr />
                {
                    this.allCharacters.map(c => {
                        return (
                            <React.Fragment>
                                <img src={require(`../../images/characters/icons/${c.value}_icon.webp`)} alt="" style={{backgroundColor: "gold"}}/>
                                <div>{c.display}</div>
                            </React.Fragment>
                        )
                    })
                }
                <hr />
                {
                    this.allArtifacts.map(a => {
                        return (
                            <React.Fragment>
                                <img src={require(`../../images/artifacts/${a.value}.webp`)} alt="" style={{backgroundColor: "purple"}}/>
                                <div>{a.display}</div>
                            </React.Fragment>
                        )
                    })
                }
                <hr />
                {
                    this.allBosses.map(b => {
                        return (
                            <React.Fragment>
                                <img src={require(`../../images/bosses/${b.value}.webp`)} alt="" style={{backgroundColor: "gold"}}/>
                                <div>{b.display}</div>
                            </React.Fragment>
                        )
                    })
                }
                <hr />
                {
                    this.allWeapons.map(w => {
                        return (
                            <React.Fragment>
                                <div>{w.value}</div>
                            </React.Fragment>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}