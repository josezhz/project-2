import React from "react";

export default class Create extends React.Component {
    state = {
        teamName: "",
        teamNameUsed: false,
        teamMembersBeingAdded: [],
        selectingCharacter: false,
        selectingWeapon: false,
        selectingArtifact: false,
        characterBeingAdded: null,
        weaonBeingAdded: null,
        artifactsBeingAdded: [],
        rolesBeingAdded: []
    }

    updateTeamName = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    checkIfTeamNameUsed() {
        if (this.props.teams.map(t => t.team_name.toLowerCase()).includes(this.state.team_name)) {
            return true
        } else {
            return false
        }
    }

    selectCharacter() {
        return (
            <div
                className="container-fluid bg-light p-0 d-flex justify-content-center"
                style={{
                    position: "absolute",
                    height: "calc(100vh - 64px)",
                    backgroundImage: `url(${require("../images/bgs/bg2.png")})`,
                    backgroundSize: "384px",
                    backgroundRepeat: "repeat",
                    backgroundPosition: "center",
                }}
            >
                <div
                    className="container row m-0 overflow-auto"
                    style={{
                        maxWidth: "992px",
                        backgroundColor: "rgba(200, 200, 200, .5)"
                    }}
                >
                    {this.props.allCharacters.map(c =>
                        <React.Fragment key={c._id}>
                            <div className="col-4 col-sm-3 col-md-2 p-1">
                                <img
                                    src={require(`../images/characters/icons/${c.value}_icon.webp`)}
                                    alt=""
                                    className="border border-5 border-light"
                                    style={{
                                        backgroundColor: c.rarity === 5 ? "#ffc107" : "#6f42c1",
                                        width: "100%",
                                        borderRadius: "8%",
                                        marginTop: "2%",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => { this.setState({ characterBeingAdded: c._id, selectingCharacter: false }) }}
                                />
                                <div className="text-center">{c.display}{c.display === "Traveler" ? ` (${c.element})` : null}</div>
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
        )
    }

    selectWeapon() {
        let type = this.props.getCharacterById(this.state.characterBeingAdded).weapon_type
        return (
            <div
                className="container-fluid bg-light p-0 d-flex justify-content-center"
                style={{
                    position: "absolute",
                    height: "calc(100vh - 64px)",
                    backgroundImage: `url(${require("../images/bgs/bg2.png")})`,
                    backgroundSize: "384px",
                    backgroundRepeat: "repeat",
                    backgroundPosition: "center",
                }}
            >
                <div
                    className="container row m-0 overflow-auto"
                    style={{
                        maxWidth: "992px",
                        backgroundColor: "rgba(200, 200, 200, .5)"
                    }}
                >
                    {this.props.allWeapons.filter(w => w.type === type).map(w =>
                        <React.Fragment key={w._id}>
                            <div className="col-4 col-sm-3 col-md-2 p-1">
                                <img
                                    src={require(`../images/weapons/${w.value}.webp`)}
                                    alt=""
                                    className="border border-5 border-light"
                                    style={{
                                        backgroundColor: (() => {
                                            if (w.rarity === 5) { return "#ffc107" }
                                            else if (w.rarity === 4) { return "#6f42c1" }
                                            else if (w.rarity === 3) { return "#0d6efd" }
                                        })(),
                                        width: "100%",
                                        borderRadius: "8%",
                                        marginTop: "2%",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => { this.setState({ weaponBeingAdded: w._id, selectingWeapon: false }) }}
                                />
                                <div className="text-center">{w.display}</div>
                            </div>
                        </React.Fragment>

                    )}
                </div>
            </div>

        )
    }

    selectArtifact() {
        return (
            <div
                className="container-fluid bg-light p-0 d-flex justify-content-center"
                style={{
                    position: "absolute",
                    height: "calc(100vh - 64px)",
                    backgroundImage: `url(${require("../images/bgs/bg2.png")})`,
                    backgroundSize: "384px",
                    backgroundRepeat: "repeat",
                    backgroundPosition: "center",
                }}
            >
                <div
                    className="container row m-0 overflow-auto"
                    style={{
                        maxWidth: "992px",
                        backgroundColor: "rgba(200, 200, 200, .5)"
                    }}
                >
                    {this.props.allArtifacts.map(a =>
                        <React.Fragment key={a._id}>
                            <div className="col-4 col-sm-3 col-md-2 p-1">
                                <img
                                    src={require(`../images/artifacts/${a.value}.webp`)}
                                    alt=""
                                    className="border border-5 border-light"
                                    style={{
                                        backgroundColor: a.rarity === 5 ? "#ffc107" : "#6f42c1",
                                        width: "100%",
                                        borderRadius: "8%",
                                        marginTop: "2%",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => {
                                        let clone = this.state.artifactsBeingAdded
                                        clone.push(a._id)
                                        this.setState({ artifactsBeingAdded: clone, selectingArtifact: false })
                                    }}
                                />
                                <div className="text-center">{a.display}</div>
                            </div>
                        </React.Fragment>

                    )}
                </div>
            </div>
        )
    }

    addTeamMember() {
        return (
            <React.Fragment>
                <div>
                    <div className="mt-3 d-flex align-items-center">
                        {this.state.characterBeingAdded === null ?
                            <button className="bg-none border-0 p-0" onClick={() => { this.setState({ selectingCharacter: true }) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                </svg>
                            </button>

                            :
                            <div className="position-relative">
                                <img
                                    src={require(`../images/characters/icons/${this.props.getCharacterById(this.state.characterBeingAdded).value}_icon.webp`)}
                                    alt=""
                                    className="border border-3 rounded"
                                    style={{
                                        height: "80px",
                                        backgroundColor: this.props.getCharacterById(this.state.characterBeingAdded).rarity === 5 ? "#ffc107" : "#6f42c1"
                                    }}
                                />
                                {/* <span
                                    className="position-absolute top-0 start-100 translate-middle p-0 bg-danger rounded-circle"
                                    style={{
                                        padding: "12px"
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                                    </svg>
                                </span> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"
                                    className="position-absolute top-0 start-100 translate-middle bg-danger text-light rounded-circle"
                                    style={{ padding: "2px" }}
                                    onClick={() => { this.setState({ selectingCharacter: true }) }}
                                >
                                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                                </svg>
                            </div>

                        }
                    </div>
                </div>
            </React.Fragment>
        )
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
                                <div className="d-flex">


                                    {this.addTeamMember()}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.selectingCharacter ? this.selectCharacter() : null}
                {this.state.selectingWeapon ? this.selectWeapon() : null}
                {this.state.selectingArtifact ? this.selectArtifact() : null}
            </React.Fragment>
        )
    }
};