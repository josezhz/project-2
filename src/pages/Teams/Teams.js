import React from "react";
import Team from "./components/Team";

export default class Teams extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Team
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