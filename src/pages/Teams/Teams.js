import React from "react";
import DisplayTeams from "./components/DisplayTeams";

export default class Teams extends React.Component {
    render() {
        return (
            <React.Fragment>
                <DisplayTeams
                    teams={this.props.teams}
                    allCharacters={this.props.allCharacters}
                    allWeapons={this.props.allWeapons}
                    allArtifcats={this.props.allArtifcats}
                    allBosses={this.props.allBosses}
                />
            </React.Fragment>
        )
    }
}