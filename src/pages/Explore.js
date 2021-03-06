import React from "react";
import DisplayTeam from "../components/DisplayTeam";

export default class Explore extends React.Component {
    state = {
        teamName: "",
        numberOfFiveStar: 2,
        anyNumberOfFiveStar: true,
        includedCharacters: [],
        targetBoss: ""
    }

    filterForm() {
        return (
            <React.Fragment>
                <div className="container-fluid w-100 h-100 rounded py-2 overflow-auto"
                    style={{ backgroundColor: "rgba(255, 255, 255, .8)" }}
                >
                    <div>
                        <label className="fs-5">Team Name:</label>
                        <input type="text" className="form-control rounded-pill bg-light" value={this.state.teamName}
                            onInput={e => { this.setState({ teamName: e.target.value }) }}
                        />
                    </div>
                    <hr />
                    <div>
                        <label className="fs-5">Number of 5&#9733;:</label>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={this.state.anyNumberOfFiveStar || this.state.includedCharacters.length}
                                onChange={() => { this.setState({ anyNumberOfFiveStar: !this.state.anyNumberOfFiveStar }) }}
                            />
                            <label>Any</label>
                        </div>
                        {this.state.anyNumberOfFiveStar || this.state.includedCharacters.length ?
                            null :
                            <div className="d-flex">
                                <input type="range" className="form-range" min="0" max="4" step="1"
                                    value={this.state.numberOfFiveStar}
                                    onInput={e => { this.setState({ numberOfFiveStar: parseInt(e.target.value) }) }}
                                />
                                <span className="badge bg-primary ms-2 fs-6" style={{ minWidth: "32px" }}>{this.state.numberOfFiveStar}</span>
                            </div>
                        }
                    </div>
                    <hr />
                    <div>
                        <label className="fs-5">Included Characters:</label>
                        <div className="d-flex mt-2">
                            {this.state.includedCharacters.length ?
                                <React.Fragment>
                                    {this.state.includedCharacters.map((c, index) =>
                                        <React.Fragment key={index}>
                                            <div className="position-relative"
                                                style={{
                                                    width: "22%",
                                                    maxWidth: "80px",
                                                    marginLeft: index ? "10px" : "0"
                                                }}
                                            >
                                                <img src={require(`../images/characters/icons/${this.props.getCharacterById(c).value}_icon.webp`)} alt=""
                                                    className="border border-2 rounded w-100"
                                                    style={{
                                                        backgroundColor: this.props.getCharacterById(c).value === "aloy" ?
                                                            "#dc3545" : this.props.getCharacterById(c).rarity === 5 ? "#ffc107" : "#6f42c1",
                                                    }}
                                                />
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"
                                                    className="position-absolute top-0 start-100 translate-middle bg-danger text-light rounded-circle"
                                                    style={{ padding: "2px", cursor: "pointer" }}
                                                    onClick={() => {
                                                        let clone = this.state.includedCharacters
                                                        this.setState({
                                                            includedCharacters: [
                                                                ...clone.slice(0, index),
                                                                ...clone.slice(index + 1)
                                                            ]
                                                        })
                                                    }}
                                                >
                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                                </svg>
                                            </div>
                                        </React.Fragment>
                                    )}
                                </React.Fragment> : null
                            }
                            {this.state.includedCharacters.length < 4 ?
                                <div className="position-relative"
                                    style={{
                                        width: "22%",
                                        maxWidth: "80px",
                                        marginLeft: this.state.includedCharacters.length ? "10px" : "0"
                                    }}
                                >
                                    <img src={require("../images/icons/character.webp")} alt=""
                                        className="border border-2 border-dark rounded w-100"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => { this.props.updateSelectingCharacters(true) }}
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"
                                        className="position-absolute top-0 start-100 translate-middle bg-primary text-light rounded-circle"
                                        style={{ padding: "2px", cursor: "pointer" }}
                                        onClick={() => { this.props.updateSelectingCharacters(true) }}
                                    >
                                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                    </svg>
                                </div> : null
                            }
                        </div>
                    </div>
                    <hr />
                    <div>
                        <label className="fs-5">Target Boss:</label>
                        <div className="d-flex mt-2">
                            {this.state.targetBoss ?
                                <div className="position-relative">
                                    <img src={require(`../images/bosses/${this.props.getBossById(this.state.targetBoss).value}.webp`)} alt=""
                                        className="border border-secondary rounded bg-danger"
                                        style={{ height: "100px", cursor: "pointer" }}
                                        onClick={() => { this.props.updateSelectingBoss(true) }}
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"
                                        className="position-absolute top-0 start-100 translate-middle border border-danger bg-light text-danger rounded-circle"
                                        style={{ padding: "2px", cursor: "pointer" }}
                                        onClick={() => { this.setState({ targetBoss: "" }) }}
                                    >
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                    </svg>
                                </div>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16"
                                    className="border border-dark rounded"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => { this.props.updateSelectingBoss(true) }}
                                >
                                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                </svg>
                            }
                        </div>
                    </div>
                    <hr />
                    <div>
                        <button className="btn btn-primary w-100 rounded-pill py-1"
                            onClick={() => {
                                let criteria = {
                                    teamName: this.state.teamName,
                                    numberOfFiveStar: this.state.anyNumberOfFiveStar || this.state.includedCharacters.length ? null : this.state.numberOfFiveStar,
                                    includedCharacters: this.state.includedCharacters,
                                    targetBoss: this.state.targetBoss
                                };
                                this.props.toggleFilter();
                                this.props.refreshTeams(criteria);
                            }}
                        >Search</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    selectCharacters() {
        return (
            <div
                className="container-fluid bg-light p-0 d-flex justify-content-center"
                style={{
                    zIndex: "5",
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
                                    className={this.state.includedCharacters.includes(c._id) ? "border border-5 border-primary" : ""}
                                    style={{
                                        backgroundColor: c.value === "aloy" ?
                                            "#dc3545" : c.rarity === 5 ? "#ffc107" : "#6f42c1",
                                        width: "100%",
                                        borderRadius: "8%",
                                        marginTop: "2%",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => {
                                        if (this.state.includedCharacters.length < 4 && !this.state.includedCharacters.includes(c._id)) {
                                            let clone = this.state.includedCharacters
                                            clone.push(c._id)
                                            this.setState({ includedCharacters: clone })
                                        } else if (this.state.includedCharacters.includes(c._id)) {
                                            let clone = this.state.includedCharacters
                                            let index = clone.findIndex(i => i === c._id)
                                            this.setState({
                                                includedCharacters: [
                                                    ...clone.slice(0, index),
                                                    ...clone.slice(index + 1)
                                                ]
                                            })
                                        }
                                    }}
                                />
                                <div className="text-center">{c.display}</div>
                            </div>
                        </React.Fragment>
                    )}
                </div>
                {this.state.includedCharacters.length ?
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
                        onClick={() => { this.props.updateSelectingCharacters(false) }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg>
                    </button> : null
                }

            </div>
        )
    }

    selectBoss() {
        return (
            <div
                className="container-fluid bg-light p-0 d-flex justify-content-center"
                style={{
                    zIndex: "5",
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
                    {this.props.allBosses.map(b =>
                        <React.Fragment key={b._id}>
                            <div className="col-4 col-sm-3 col-md-2 p-1">
                                <img
                                    src={require(`../images/bosses/${b.value}.webp`)}
                                    alt=""
                                    className={this.state.targetBoss === b._id ? "border border-5 border-primary" : ""}
                                    style={{
                                        backgroundColor: "#dc3545",
                                        width: "100%",
                                        borderRadius: "8%",
                                        marginTop: "2%",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => {
                                        this.setState({ targetBoss: b._id })
                                        this.props.updateSelectingBoss(false)
                                    }}
                                />
                                <div className="text-center">{b.display}</div>
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>

        )
    }

    render() {
        return (
            <React.Fragment>
                <div className={"container-fluid filter p-3" + (this.props.filterHidden ? " hide" : "")}>
                    {this.filterForm()}
                </div>
                <div className="content container-fluid p-0 pt-3 bg-light overflow-auto">
                    <div className="container" style={{ maxWidth: "768px" }}>
                        {this.props.teams.length ?
                            this.props.teams.map(t => (
                                <React.Fragment key={t._id}>
                                    <DisplayTeam
                                        t={t}
                                        editing={this.props.editing}
                                        getCharacterById={this.props.getCharacterById}
                                        getWeaponById={this.props.getWeaponById}
                                        getArtifactById={this.props.getArtifactById}
                                        getBossById={this.props.getBossById}
                                        updateTeamBeingUpdated={this.props.updateTeamBeingUpdated}
                                        updateTeamBeingDeleted={this.props.updateTeamBeingDeleted}
                                        toggleEditing={this.props.toggleEditing}
                                    />
                                </React.Fragment>
                            )) : this.props.loading ? null : <h1 className="text-center">No Results Found</h1>
                        }

                    </div>
                </div>
                <div className="btns">
                    <button style={{ zIndex: "3" }} onClick={() => {
                        this.props.changePage("create");
                        if (this.props.editing) {
                            this.props.toggleEditing();
                        };
                    }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                        </svg>
                    </button>
                    <button style={{ zIndex: "3" }} onClick={this.props.toggleEditing}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                            {this.props.editing ?
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                :
                                <React.Fragment>
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </React.Fragment>
                            }
                        </svg>
                    </button>
                    <button className="d-lg-none"
                        style={{ zIndex: "5" }}
                        onClick={() => {
                            this.props.toggleFilter();
                            if (this.props.editing) {
                                this.props.toggleEditing();
                            };
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                            {this.props.filterHidden ?
                                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                                :
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                            }
                        </svg>
                    </button>
                </div>
                {this.props.selectingCharacters ? this.selectCharacters() : null}
                {this.props.selectingBoss ? this.selectBoss() : null}
            </React.Fragment>
        )
    }
};