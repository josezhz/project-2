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
        const BASE_URI = "https://3000-josezhz-project2api-rly1361e77s.ws-us52.gitpod.io/";

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
        this.allBosses = resBosses.data;

        let resTeams = await axios.get(BASE_URI + "teams");
        this.setState({
            teams: resTeams.data.teams
        })
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.allCharacters.map(c => {
                        return (<div>{c.display}</div>)
                    })
                }
            </React.Fragment>
        )
    }
}