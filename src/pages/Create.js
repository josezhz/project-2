import React from "react";

export default class Create extends React.Component {
    state = {
        team_name: "",
        teamNameUsed: false
    }

    updateTeamName = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    checkIfTeamNameUsed() {
        if (this.props.teams.map(t => t.team_name).includes(this.state.team_name)) {
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="content container-fluid p-0 pt-5 bg-dark overflow-auto">
                    <div className="container" style={{ maxWidth: "992px" }}>
                        <div className="container-fluid pt-3" style={{ backgroundColor: "rgba(255, 255, 255, .8)", borderRadius: "1rem" }}>
                            <div className="mb-3">
                                <label className="fs-5">Team Name</label>
                                <input
                                    type="text"
                                    className={"form-control rounded-pill" + (this.checkIfTeamNameUsed() ? " is-invalid" : "")}
                                    name="team_name"
                                    value={this.state.team_name}
                                    onInput={this.updateTeamName}
                                />
                                {this.checkIfTeamNameUsed() ? <span className="text-danger fs-6">This team name is used</span> : null}
                            </div>
                            <div className="mb-3">
                                <label className="fs-5">Team Composition</label>
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }
};