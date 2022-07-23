import axios from "axios";
import React from "react";

export default class Create extends React.Component {
    state = {
        teamName: "",
        teamMembersBeingAdded: [],

        selectingCharacter: false,
        selectingWeapon: false,
        selectingArtifacts: false,
        selectingBosses: false,

        characterBeingAdded: null,
        weaponBeingAdded: null,
        artifactsBeingAdded: [],
        rolesBeingAdded: [],

        bossesBeingAdded: [],

        rotationGuideStepsBeingAdded: [],
        characterBeingAddedForRotationGuide: "",
        actionBeingAddedForRotationGuide: "",

        notesBeingAdded: [],
        noteBeingAdded: ""
    }

    updateTeamName = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    checkIfTeamNameUsed() {
        if (this.props.allTeams.map(t => t.team_name.toLowerCase()).includes(this.state.teamName.toLocaleLowerCase())) {
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
                    {this.props.allCharacters.filter(c => !this.state.teamMembersBeingAdded.map(m => m.character.$oid).includes(c._id)).map(c =>
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

    selectBosses() {
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
                    className="container row m-0 overflow-auto align-items-start"
                    style={{
                        maxWidth: "992px",
                        backgroundColor: "rgba(200, 200, 200, .5)"
                    }}
                >
                    {this.props.allBosses.map(b =>
                        <React.Fragment key={b._id}>
                            <div className="col-4 col-sm-3 col-md-2 p-1">
                                <img
                                    src={require(`../images/bosses/${b.value}.webp`)}
                                    alt=""
                                    className={this.state.bossesBeingAdded.includes(b._id) ? "border border-5 border-warning" : ""}
                                    style={{
                                        backgroundColor: "#dc3545",
                                        width: "100%",
                                        borderRadius: "8%",
                                        marginTop: "2%",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => {
                                        if (!this.state.bossesBeingAdded.includes(b._id)) {
                                            let clone = this.state.bossesBeingAdded
                                            clone.push(b._id)
                                            this.setState({ bossesBeingAdded: clone })
                                        } else {
                                            let clone = this.state.bossesBeingAdded
                                            let index = clone.findIndex(i => i === b._id)
                                            this.setState({
                                                bossesBeingAdded: [
                                                    ...clone.slice(0, index),
                                                    ...clone.slice(index + 1)
                                                ]
                                            })
                                        }
                                    }}
                                />
                                <div className="text-center">{b.display}</div>
                            </div>
                        </React.Fragment>
                    )}
                </div>
                {this.state.bossesBeingAdded.length ?
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
                        onClick={() => { this.setState({ selectingBosses: false }) }}
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

    displayTeamMembersBeingAdded() {
        return (
            <React.Fragment>
                {this.state.teamMembersBeingAdded.map((m, index) =>
                    <React.Fragment key={index}>
                        <li>
                            <div className="position-relative mt-2" style={{ width: "fit-content" }}>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <img
                                            src={require(`../images/characters/icons/${this.props.getCharacterById(m.character.$oid).value}_icon.webp`)}
                                            alt=""
                                            className="border border-2 rounded"
                                            style={{
                                                height: "80px",
                                                backgroundColor: this.props.getCharacterById(m.character.$oid).rarity === 5 ? "#ffc107" : "#6f42c1"
                                            }}
                                        />
                                    </div>
                                    <div className="align-self-end ms-2 ms-sm-3">
                                        <img
                                            src={require(`../images/weapons/${this.props.getWeaponById(m.weapon.$oid).value}.webp`)}
                                            alt=""
                                            className="border border-2 rounded"
                                            style={{
                                                height: "64px",
                                                backgroundColor: (() => {
                                                    if (this.props.getWeaponById(m.weapon.$oid).rarity === 5) { return "#ffc107" }
                                                    else if (this.props.getWeaponById(m.weapon.$oid).rarity === 4) { return "#6f42c1" }
                                                    else if (this.props.getWeaponById(m.weapon.$oid).rarity === 3) { return "#0d6efd" }
                                                })()
                                            }}
                                        />
                                    </div>
                                    <div className="align-self-end ms-2 ms-sm-3">
                                        {m.artifacts.map(a =>
                                            <React.Fragment key={a.$oid}>
                                                <img
                                                    src={require(`../images/artifacts/${this.props.getArtifactById(a.$oid).value}.webp`)}
                                                    alt=""
                                                    className="border border-2 rounded"
                                                    style={{
                                                        height: "48px",
                                                        backgroundColor: this.props.getArtifactById(a.$oid).rarity === 5 ? "#ffc107" : "#6f42c1"
                                                    }}
                                                />
                                            </React.Fragment>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-1">
                                    {m.roles.map((r, index) =>
                                        <React.Fragment key={index}>
                                            {(() => {
                                                let color;
                                                if (r === "Main DPS") { color = "#dc3545" }
                                                else if (r === "Sub DPS") { color = "#fd7e14" }
                                                else if (r === "Support") { color = "#0d6efd" }
                                                else if (r === "Heal") (color = "#198754")
                                                return (
                                                    <label
                                                        className="badge rounded-pill ms-1 text-light"
                                                        style={{
                                                            fontSize: "10px",
                                                            border: ("1px solid " + color),
                                                            backgroundColor: color
                                                        }}
                                                    >{r}</label>
                                                )
                                            })()}
                                        </React.Fragment>
                                    )}
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"
                                    className="position-absolute top-0 start-100 translate-middle bg-danger text-light rounded-circle"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        let clone = this.state.teamMembersBeingAdded;
                                        this.setState({
                                            teamMembersBeingAdded: [
                                                ...clone.slice(0, index),
                                                ...clone.slice(index + 1)
                                            ],
                                            rotationGuideStepsBeingAdded: []
                                        })
                                    }}
                                >
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </div>
                        </li>
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }

    addTeamMember() {
        return (
            <React.Fragment>
                <div>
                    <div className="mt-3 d-flex align-items-center">
                        {!this.state.characterBeingAdded ?
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
                                    className="position-absolute top-0 start-100 translate-middle bg-secondary text-light rounded-circle"
                                    style={{ padding: "2px", cursor: "pointer" }}
                                    onClick={() => { this.setState({ selectingCharacter: true }) }}
                                >
                                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
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
                                        className="position-absolute top-0 start-100 translate-middle bg-secondary text-light rounded-circle"
                                        style={{ padding: "2px", cursor: "pointer" }}
                                        onClick={() => { this.setState({ selectingCharacter: true }) }}
                                    >
                                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                                    </svg>
                                </div>
                                {!this.state.weaponBeingAdded ?
                                    <div className="position-relative align-self-end ms-2 ms-sm-3">
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
                                            className="position-absolute top-0 start-100 translate-middle bg-secondary text-light rounded-circle"
                                            style={{ padding: "2px", cursor: "pointer" }}
                                            onClick={() => { this.setState({ selectingWeapon: true }) }}
                                        >
                                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                        </svg>
                                    </div>
                                    :
                                    <div className="position-relative align-self-end ms-2 ms-sm-3">
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
                                            className="position-absolute top-0 start-100 translate-middle bg-secondary text-light rounded-circle"
                                            style={{ padding: "2px", cursor: "pointer" }}
                                            onClick={() => { this.setState({ selectingWeapon: true }) }}
                                        >
                                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                                        </svg>
                                    </div>
                                }
                                {!this.state.artifactsBeingAdded.length ?
                                    <div className="position-relative align-self-end ms-2 ms-sm-3">
                                        <img
                                            src={require("../images/icons/artifact.webp")}
                                            alt=""
                                            className="border border-2 border-dark rounded"
                                            style={{
                                                height: "48px",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => { this.setState({ selectingArtifacts: true }) }}
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"
                                            className="position-absolute top-0 start-100 translate-middle bg-secondary text-light rounded-circle"
                                            style={{ padding: "2px", cursor: "pointer" }}
                                            onClick={() => { this.setState({ selectingArtifacts: true }) }}
                                        >
                                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                        </svg>
                                    </div>
                                    :
                                    <div className="position-relative align-self-end ms-2 ms-sm-3">
                                        {this.state.artifactsBeingAdded.map(a =>
                                            <React.Fragment key={a}>
                                                <img
                                                    src={require(`../images/artifacts/${this.props.getArtifactById(a).value}.webp`)}
                                                    alt=""
                                                    className="border border-2 rounded"
                                                    style={{
                                                        height: "48px",
                                                        backgroundColor: this.props.getArtifactById(a).rarity === 5 ? "#ffc107" : "#6f42c1",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => { this.setState({ selectingArtifacts: true }) }}
                                                />
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"
                                                    className="position-absolute top-0 start-100 translate-middle bg-secondary text-light rounded-circle"
                                                    style={{ padding: "2px", cursor: "pointer" }}
                                                    onClick={() => { this.setState({ selectingArtifacts: true }) }}
                                                >
                                                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
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
                        <input type="checkbox" className="btn-check" checked={this.state.rolesBeingAdded.includes("Main DPS")} readOnly />
                        <label
                            className="badge rounded-pill ms-1"
                            style={{
                                fontSize: "10px",
                                cursor: "pointer",
                                border: "1px solid #dc3545",
                                backgroundColor: (this.state.rolesBeingAdded.includes("Main DPS") ? "#dc3545" : "rgba(0,0,0,0)"),
                                color: (this.state.rolesBeingAdded.includes("Main DPS") ? "#f8f9fa" : "#dc3545")
                            }}
                            onClick={() => { this.updateRolesBeingAdded("Main DPS") }}
                        >Main DPS</label>
                        <input type="checkbox" className="btn-check" checked={this.state.rolesBeingAdded.includes("Sub DPS")} readOnly />
                        <label
                            className="badge rounded-pill ms-1"
                            style={{
                                fontSize: "10px",
                                cursor: "pointer",
                                border: "1px solid #fd7e14",
                                backgroundColor: (this.state.rolesBeingAdded.includes("Sub DPS") ? "#fd7e14" : "rgba(0,0,0,0)"),
                                color: (this.state.rolesBeingAdded.includes("Sub DPS") ? "#f8f9fa" : "#fd7e14")
                            }}
                            onClick={() => { this.updateRolesBeingAdded("Sub DPS") }}
                        >Sub DPS</label>
                        <input type="checkbox" className="btn-check" checked={this.state.rolesBeingAdded.includes("Support")} readOnly />
                        <label
                            className="badge rounded-pill ms-1"
                            style={{
                                fontSize: "10px",
                                cursor: "pointer",
                                border: "1px solid #0d6efd",
                                backgroundColor: (this.state.rolesBeingAdded.includes("Support") ? "#0d6efd" : "rgba(0,0,0,0)"),
                                color: (this.state.rolesBeingAdded.includes("Support") ? "#f8f9fa" : "#0d6efd")
                            }}
                            onClick={() => { this.updateRolesBeingAdded("Support") }}
                        >Support</label>
                        <input type="checkbox" className="btn-check" checked={this.state.rolesBeingAdded.includes("Heal")} readOnly />
                        <label
                            className="badge rounded-pill ms-1"
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
                            className="w-100 btn btn-outline-success bg-none rounded-pill py-0"
                            onClick={() => {
                                let teamMember = {
                                    character: { $oid: this.state.characterBeingAdded },
                                    weapon: { $oid: this.state.weaponBeingAdded },
                                    artifacts: this.state.artifactsBeingAdded.map(a => { return { $oid: a } }),
                                    roles: this.state.rolesBeingAdded
                                }
                                this.setState({
                                    teamMembersBeingAdded: [...this.state.teamMembersBeingAdded, teamMember],
                                    characterBeingAdded: null,
                                    weaponBeingAdded: null,
                                    artifactsBeingAdded: [],
                                    rolesBeingAdded: []
                                })
                            }}
                            disabled={!(
                                this.state.characterBeingAdded &&
                                this.state.weaponBeingAdded &&
                                this.state.artifactsBeingAdded.length &&
                                this.state.rolesBeingAdded.length
                            )}
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

    countNumberOfFiveStar() {
        let x = 0;
        for (let m of this.state.teamMembersBeingAdded) {
            if (this.props.getCharacterById(m.character.$oid).rarity === 5) { x++; }
        }
        return x;
    }

    render() {
        return (
            <React.Fragment>
                <div className="content container-fluid p-0 py-3 bg-dark">
                    <div className="container h-100" style={{ maxWidth: "992px" }}>
                        <div className="container-fluid pt-3 rounded h-100 overflow-auto" style={{ backgroundColor: "rgba(255, 255, 255, .8)" }}>
                            <div>
                                <label className="fs-5">Team Name:</label>
                                <input type="text" name="teamName" value={this.state.teamName} onInput={this.updateTeamName}
                                    className={"form-control form-control-sm" + (this.checkIfTeamNameUsed() ? " is-invalid" : "")}
                                />
                                {this.checkIfTeamNameUsed() ? <span className="text-danger fs-6">This team name is used</span> : null}
                            </div>
                            <hr />
                            <div>
                                <label className="fs-5">Team Composition:</label>
                                <div>
                                    <ul>
                                        {this.displayTeamMembersBeingAdded()}
                                    </ul>
                                    {this.state.teamMembersBeingAdded.length ? <hr /> : null}
                                    {this.state.teamMembersBeingAdded.length < 4 ? this.addTeamMember() : null}
                                </div>
                            </div>
                            <hr />
                            <div>
                                <label className="fs-5">Recommended Bosses:</label>
                                <div>
                                    {this.state.bossesBeingAdded.length ?
                                        this.state.bossesBeingAdded.map(b =>
                                            <React.Fragment key={b}>
                                                <img alt="" className="bg-danger border border-secondary rounded-circle me-1"
                                                    src={require(`../images/bosses/${this.props.getBossById(b).value}.webp`)}
                                                    style={{
                                                        height: "48px",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => { this.setState({ selectingBosses: true }) }}
                                                />
                                            </React.Fragment>
                                        ) : null
                                    }
                                    {this.state.bossesBeingAdded.length < 6 ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16"
                                            className="border border-dark rounded-circle"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => { this.setState({ selectingBosses: true }) }}
                                        >
                                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                        </svg> : null
                                    }
                                </div>
                            </div>
                            <hr />
                            <div>
                                <label className="fs-5">Rotation Guide:</label>
                                {this.state.teamMembersBeingAdded.length ?
                                    <React.Fragment>
                                        <ul className="list-group list-group-flush">
                                            {this.state.rotationGuideStepsBeingAdded.map((s, index) =>
                                                <React.Fragment key={index}>
                                                    <li className="list-group-item border-0 d-flex align-items-center bg-none">
                                                        <span style={{ width: "24px" }}>{index + 1}.</span>
                                                        <img alt="" className="border border-secondary rounded me-1"
                                                            src={require(`../images/characters/icons/${this.props.getCharacterById(s.character.$oid).value}_icon.webp`)}
                                                            style={{
                                                                backgroundColor: this.props.getCharacterById(s.character.$oid).rarity === 5 ? "#ffc107" : "#6f42c1",
                                                                width: "40px"
                                                            }}
                                                        />
                                                        <span>
                                                            {this.props.getCharacterById(s.character.$oid).display}
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right mx-1" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                                            </svg>
                                                            <span className="badge bg-primary" style={{ width: "32px" }}>{s.action}</span>
                                                        </span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"
                                                            className="ms-auto text-danger"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                let clone = this.state.rotationGuideStepsBeingAdded;
                                                                this.setState({
                                                                    rotationGuideStepsBeingAdded: [
                                                                        ...clone.slice(0, index),
                                                                        ...clone.slice(index + 1)
                                                                    ]
                                                                })
                                                            }}
                                                        >
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                                                        </svg>
                                                    </li>
                                                </React.Fragment>
                                            )}
                                        </ul>
                                        <div className="row m-0">
                                            <div className="col-12 col-sm-6 p-0">
                                                <div className="input-group input-group-sm">
                                                    <label className="input-group-text">Character:</label>
                                                    <select className="form-select" value={this.state.characterBeingAddedForRotationGuide} onChange={e => { this.setState({ characterBeingAddedForRotationGuide: e.target.value }) }}>
                                                        <option value="">--select--</option>
                                                        {this.state.teamMembersBeingAdded.map(m => this.props.getCharacterById(m.character.$oid)).map(c =>
                                                            <React.Fragment key={c._id}>
                                                                <option value={c._id}>{c.display}</option>
                                                            </React.Fragment>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 p-0">
                                                <div className="input-group input-group-sm">
                                                    <label className="input-group-text">Action:</label>
                                                    <select className="form-select" value={this.state.actionBeingAddedForRotationGuide} onChange={e => { this.setState({ actionBeingAddedForRotationGuide: e.target.value }) }}>
                                                        <option value="">--select--</option>
                                                        <option value="A">Attack</option>
                                                        <option value="E">Skill</option>
                                                        <option value="Q">Burst</option>
                                                    </select>
                                                    <button disabled={!this.state.characterBeingAddedForRotationGuide || !this.state.actionBeingAddedForRotationGuide}
                                                        className="btn btn-success"
                                                        style={{ zIndex: "0" }}
                                                        onClick={() => {
                                                            let newRotationGuideStep = {
                                                                character: { $oid: this.state.characterBeingAddedForRotationGuide },
                                                                action: this.state.actionBeingAddedForRotationGuide
                                                            };
                                                            let clone = this.state.rotationGuideStepsBeingAdded;
                                                            if (this.state.characterBeingAddedForRotationGuide && this.state.actionBeingAddedForRotationGuide) {
                                                                this.setState({
                                                                    rotationGuideStepsBeingAdded: [...clone, newRotationGuideStep],
                                                                    characterBeingAddedForRotationGuide: "",
                                                                    actionBeingAddedForRotationGuide: ""
                                                                })
                                                            }
                                                        }}
                                                    >Add Step</button>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                    :
                                    <div className="text-danger">Please add a team member first</div>
                                }
                            </div>
                            <hr />
                            <div>
                                <label className="fs-5">Notes:</label>
                                {this.state.notesBeingAdded.length ?
                                    <div className="row">
                                        {this.state.notesBeingAdded.map((n, index) =>
                                            <React.Fragment key={index}>
                                                <div className="col-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                                                        className="text-danger me-1"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => {
                                                            let clone = this.state.notesBeingAdded;
                                                            this.setState({
                                                                notesBeingAdded: [
                                                                    ...clone.slice(0, index),
                                                                    ...clone.slice(index + 1)
                                                                ]
                                                            })
                                                        }}
                                                    ><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" /></svg>
                                                </div>
                                                <div className="col-11">
                                                    <span style={{ wordWrap: "break-word" }}>{n}</span>
                                                </div>
                                            </React.Fragment>

                                        )}
                                    </div> : null
                                }
                                <div className="input-group input-group-sm">
                                    <textarea className="form-control" value={this.state.noteBeingAdded} onInput={e => { this.setState({ noteBeingAdded: e.target.value }) }}
                                    ></textarea>
                                    <button disabled={!this.state.noteBeingAdded}
                                        className="btn btn-success d-flex align-items-center"
                                        style={{ zIndex: "0" }}
                                        onClick={() => {
                                            if (this.state.noteBeingAdded) {
                                                let clone = this.state.notesBeingAdded;
                                                this.setState({
                                                    notesBeingAdded: [...clone, this.state.noteBeingAdded],
                                                    noteBeingAdded: ""
                                                })
                                            }
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <button className="w-100 btn btn-success rounded-pill py-0 mb-2"
                                    onClick={async () => {
                                        let newTeam = {
                                            team_name: this.state.teamName,
                                            team_composition: this.state.teamMembersBeingAdded,
                                            number_of_five_star: this.countNumberOfFiveStar(),
                                            bosses: this.state.bossesBeingAdded.map(b => { return { $oid: b } }),
                                            rotation_guide: this.state.rotationGuideStepsBeingAdded,
                                            notes: this.state.notesBeingAdded
                                        };
                                        await axios.post(this.props.BASE_URI + "teams", {
                                            newTeam
                                        });
                                        this.props.refreshTeams();
                                        this.props.changePage("explore")
                                    }}
                                    disabled={!(
                                        this.state.teamName
                                        && !this.checkIfTeamNameUsed()
                                        && this.state.teamMembersBeingAdded.length
                                        && this.state.bossesBeingAdded.length
                                        && this.state.rotationGuideStepsBeingAdded.length
                                        && this.state.notesBeingAdded.length
                                    )}
                                >Add Team</button>
                                <button className="w-100 btn btn-outline-danger rounded-pill py-0 mb-3"
                                    onClick={() => { this.props.changePage("explore") }}
                                >Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.selectingCharacter ? this.selectCharacter() : null}
                {this.state.selectingWeapon ? this.selectWeapon() : null}
                {this.state.selectingArtifacts ? this.selectArtifacts() : null}
                {this.state.selectingBosses ? this.selectBosses() : null}
            </React.Fragment>
        )
    }
};