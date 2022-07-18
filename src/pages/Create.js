import react from "react";
import React from "react";

export default class Create extends React.Component {
    state = {
        teamName: "",
        teamNameUsed: false,
        teamMembersBeingAdded: [],
        selectingCharacter: false,
        selectingWeapon: false,
        selectingArtifacts: false,
        characterBeingAdded: null,
        weaponBeingAdded: null,
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
                className="container-fluid bg-light p-0  d-flex justify-content-center"
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
                    className="container row m-0 py-2 overflow-auto"
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
                                    className={this.state.characterBeingAdded === c._id ? "border border-5 border-danger" : ""}
                                    style={{
                                        backgroundColor: c.rarity === 5 ? "#ffc107" : "#6f42c1",
                                        width: "100%",
                                        borderRadius: "8%",
                                        marginTop: "2%",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => {
                                        if (this.state.characterBeingAdded && this.props.getCharacterById(this.state.characterBeingAdded).weapon_type !== c.weapon_type) {
                                            this.setState({ weaponBeingAdded: null })
                                        }
                                        this.setState({ characterBeingAdded: c._id, selectingCharacter: false })
                                    }}
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
                                    className={this.state.weaponBeingAdded === w._id ? "border border-5 border-danger" : ""}
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

    selectArtifacts() {
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
                                    className={this.state.artifactsBeingAdded.includes(a._id) ? "border border-5 border-danger" : ""}
                                    style={{
                                        backgroundColor: a.rarity === 5 ? "#ffc107" : "#6f42c1",
                                        width: "100%",
                                        borderRadius: "8%",
                                        marginTop: "2%",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => {
                                        if (this.state.artifactsBeingAdded.length < 2 && !this.state.artifactsBeingAdded.includes(a._id)) {
                                            let clone = this.state.artifactsBeingAdded
                                            clone.push(a._id)
                                            this.setState({ artifactsBeingAdded: clone })
                                        } else if (this.state.artifactsBeingAdded.includes(a._id)) {
                                            let clone = this.state.artifactsBeingAdded
                                            let index = clone.findIndex(i => i === a._id)
                                            console.log(index)
                                            this.setState({
                                                artifactsBeingAdded: [
                                                    ...clone.slice(0, index),
                                                    ...clone.slice(index + 1)
                                                ]
                                            })
                                        }
                                    }}
                                />
                                <div className="text-center">{a.display}</div>
                            </div>
                        </React.Fragment>
                    )}
                </div>
                {this.state.artifactsBeingAdded.length ?
                    <button
                        className=""
                        style={{
                            zIndex: "3",
                            position: "absolute",
                            bottom: "48px",
                            right: "32px",
                            border: "none",
                            borderRadius: "50%",
                            padding: "8px",
                            backgroundColor: "rgba(200, 200, 200, .7)",
                            color: "rgba(0, 0, 0, .5)",
                        }}
                        onClick={() => { this.setState({ selectingArtifacts: false }) }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg>
                    </button>
                    : null
                }

            </div>
        )
    }

    addTeamMember() {
        return (
            <React.Fragment>
                <div>
                    <div className="mt-3 d-flex align-items-center border">
                        {!this.state.characterBeingAdded ?
                            // <button className="bg-none border-0 p-0" onClick={() => { this.setState({ selectingCharacter: true }) }}>
                            //     <svg className="border border-3 border-dark rounded" xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
                            //         <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                            //     </svg>
                            // </button>
                            <div className="position-relative">
                                <img
                                    src={require("../images/icons/character.webp")}
                                    alt=""
                                    className="border border-2 border-dark rounded"
                                    style={{
                                        height: "80px",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => { this.setState({ selectingCharacter: true }) }}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"
                                    className="position-absolute top-0 start-100 translate-middle bg-danger text-light rounded-circle"
                                    style={{ padding: "2px", cursor: "pointer" }}
                                    onClick={() => { this.setState({ selectingCharacter: true }) }}
                                >
                                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                </svg>
                            </div>
                            :
                            <React.Fragment>
                                <div className="position-relative">
                                    <img
                                        src={require(`../images/characters/icons/${this.props.getCharacterById(this.state.characterBeingAdded).value}_icon.webp`)}
                                        alt=""
                                        className="border border-2 rounded"
                                        style={{
                                            height: "80px",
                                            backgroundColor: this.props.getCharacterById(this.state.characterBeingAdded).rarity === 5 ? "#ffc107" : "#6f42c1",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => { this.setState({ selectingCharacter: true }) }}
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"
                                        className="position-absolute top-0 start-100 translate-middle bg-danger text-light rounded-circle"
                                        style={{ padding: "2px", cursor: "pointer" }}
                                        onClick={() => { this.setState({ selectingCharacter: true }) }}
                                    >
                                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                                    </svg>
                                </div>
                                {!this.state.weaponBeingAdded ?
                                    <div className="position-relative align-self-end ms-3">
                                        <img
                                            src={require("../images/icons/weapon.webp")}
                                            alt=""
                                            className="border border-2 border-dark rounded"
                                            style={{
                                                height: "64px",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => { this.setState({ selectingWeapon: true }) }}
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"
                                            className="position-absolute top-0 start-100 translate-middle bg-danger text-light rounded-circle"
                                            style={{ padding: "2px", cursor: "pointer" }}
                                            onClick={() => { this.setState({ selectingWeapon: true }) }}
                                        >
                                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                        </svg>
                                    </div>
                                    :
                                    <div className="position-relative align-self-end ms-3">
                                        <img
                                            src={require(`../images/weapons/${this.props.getWeaponById(this.state.weaponBeingAdded).value}.webp`)}
                                            alt=""
                                            className="border border-2 rounded"
                                            style={{
                                                height: "64px",
                                                backgroundColor: (() => {
                                                    if (this.props.getWeaponById(this.state.weaponBeingAdded).rarity === 5) { return "#ffc107" }
                                                    else if (this.props.getWeaponById(this.state.weaponBeingAdded).rarity === 4) { return "#6f42c1" }
                                                    else if (this.props.getWeaponById(this.state.weaponBeingAdded).rarity === 3) { return "#0d6efd" }
                                                })(),
                                                cursor: "pointer"
                                            }}
                                            onClick={() => { this.setState({ selectingWeapon: true }) }}
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"
                                            className="position-absolute top-0 start-100 translate-middle bg-danger text-light rounded-circle"
                                            style={{ padding: "2px", cursor: "pointer" }}
                                            onClick={() => { this.setState({ selectingWeapon: true }) }}
                                        >
                                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                                        </svg>
                                    </div>
                                }
                                {!this.state.artifactsBeingAdded.length ?
                                    <div className="position-relative align-self-end ms-3">
                                        <img
                                            src={require("../images/icons/artifact.webp")}
                                            alt=""
                                            className="border border-2 border-dark rounded"
                                            style={{
                                                height: "64px",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => { this.setState({ selectingArtifacts: true }) }}
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"
                                            className="position-absolute top-0 start-100 translate-middle bg-danger text-light rounded-circle"
                                            style={{ padding: "2px", cursor: "pointer" }}
                                            onClick={() => { this.setState({ selectingArtifacts: true }) }}
                                        >
                                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                        </svg>
                                    </div>
                                    :
                                    <div className="position-relative align-self-end ms-3">
                                        {this.state.artifactsBeingAdded.map(a =>
                                            <React.Fragment>
                                                <img
                                                    src={require(`../images/artifacts/${this.props.getArtifactById(a).value}.webp`)}
                                                    alt=""
                                                    className="border border-2 rounded"
                                                    style={{
                                                        height: "64px",
                                                        backgroundColor: this.props.getArtifactById(a).rarity === 5 ? "#ffc107" : "#6f42c1",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => { this.setState({ selectingArtifacts: true }) }}
                                                />
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"
                                                    className="position-absolute top-0 start-100 translate-middle bg-danger text-light rounded-circle"
                                                    style={{ padding: "2px", cursor: "pointer" }}
                                                    onClick={() => { this.setState({ selectingArtifacts: true }) }}
                                                >
                                                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                                                </svg>
                                            </React.Fragment>
                                        )}
                                    </div>
                                }
                            </React.Fragment>
                        }
                    </div>
                    <div className="mt-1 d-flex align-items-center">
                        <span>Roles:</span>
                        <input type="checkbox" class="btn-check" checked={this.state.rolesBeingAdded.includes("Main DPS")} />
                        <label
                            class="badge rounded-pill ms-1"
                            style={{
                                fontSize: "10px",
                                cursor: "pointer",
                                border: "1px solid #dc3545",
                                backgroundColor: (this.state.rolesBeingAdded.includes("Main DPS") ? "#dc3545" : "rgba(0,0,0,0)"),
                                color: (this.state.rolesBeingAdded.includes("Main DPS") ? "#f8f9fa" : "#dc3545")
                            }}
                            onClick={() => { this.updateRolesBeingAdded("Main DPS") }}
                        >Main DPS</label>
                        <input type="checkbox" class="btn-check" checked={this.state.rolesBeingAdded.includes("Sub DPS")} />
                        <label
                            class="badge rounded-pill ms-1"
                            style={{
                                fontSize: "10px",
                                cursor: "pointer",
                                border: "1px solid #fd7e14",
                                backgroundColor: (this.state.rolesBeingAdded.includes("Sub DPS") ? "#fd7e14" : "rgba(0,0,0,0)"),
                                color: (this.state.rolesBeingAdded.includes("Sub DPS") ? "#f8f9fa" : "#fd7e14")
                            }}
                            onClick={() => { this.updateRolesBeingAdded("Sub DPS") }}
                        >Sub DPS</label>
                        <input type="checkbox" class="btn-check" checked={this.state.rolesBeingAdded.includes("Support")} />
                        <label
                            class="badge rounded-pill ms-1"
                            style={{
                                fontSize: "10px",
                                cursor: "pointer",
                                border: "1px solid #0d6efd",
                                backgroundColor: (this.state.rolesBeingAdded.includes("Support") ? "#0d6efd" : "rgba(0,0,0,0)"),
                                color: (this.state.rolesBeingAdded.includes("Support") ? "#f8f9fa" : "#0d6efd")
                            }}
                            onClick={() => { this.updateRolesBeingAdded("Support") }}
                        >Support</label>
                        <input type="checkbox" class="btn-check" checked={this.state.rolesBeingAdded.includes("Heal")} />
                        <label
                            class="badge rounded-pill ms-1"
                            style={{
                                fontSize: "10px",
                                cursor: "pointer",
                                border: "1px solid #198754",
                                backgroundColor: (this.state.rolesBeingAdded.includes("Heal") ? "#198754" : "rgba(0,0,0,0)"),
                                color: (this.state.rolesBeingAdded.includes("Heal") ? "#f8f9fa" : "#198754")
                            }}
                            onClick={() => { this.updateRolesBeingAdded("Heal") }}
                        >Heal</label>
                    </div>
                    <div className="mt-1">
                        <button
                            className="w-100 btn-outline-success bg-none rounded-pill"
                            onClick={()=>{
                                let teamMember = {
                                    character: {$oid: this.state.characterBeingAdded},
                                    weapon: {$oid: this.state.weaponBeingAdded},
                                    artifacts: [this.state.artifactsBeingAdded.map(a => {return {$oid: a}})],
                                    roles: this.state.rolesBeingAdded
                                }
                                console.log(teamMember)
                            }}
                        >Add Team Member</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    updateRolesBeingAdded(r) {
        let clone = this.state.rolesBeingAdded
        if (!clone.includes(r)) {
            this.setState({
                rolesBeingAdded: [...clone, r]
            })
        } else {
            let index = clone.findIndex(i => i === r)
            this.setState({
                rolesBeingAdded: [
                    ...clone.slice(0, index),
                    ...clone.slice(index + 1)
                ]
            })
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
                                <div>


                                    {this.addTeamMember()}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.selectingCharacter ? this.selectCharacter() : null}
                {this.state.selectingWeapon ? this.selectWeapon() : null}
                {this.state.selectingArtifacts ? this.selectArtifacts() : null}
            </React.Fragment>
        )
    }
};