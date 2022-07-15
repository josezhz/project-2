import React from "react";

export default class DisplayTeam extends React.Component {
    state = {
        teamCompositionExpanded: false,
        characterExpanded: null,
        rotationGuideCollapsed: true,
        notesCollapsed: true
    }

    displayTeamComposition = t => (
        <React.Fragment>
            <div className={"card-body p-0 px-1 px-md-3 d-flex justify-content-between" + (this.state.characterExpanded ? "" : " pb-1 pb-md-3")}>
                {t.team_composition.map(m =>
                    <React.Fragment key={m.character.$oid}>
                        <img
                            src={require(`../images/characters/icons/${this.props.getCharacterById(m.character.$oid).value}_icon.webp`)}
                            alt=""
                            className={"border" + (this.state.characterExpanded === m ? " border-5" : " border-2 border-secondary")}
                            style={{
                                backgroundColor: this.props.getCharacterById(m.character.$oid).rarity === 5 ? "#ffc107" : "#6f42c1",
                                width: "23.5%",
                                borderRadius: "8%",
                                marginTop: "2%",
                                cursor: "pointer"
                            }}
                            onClick={() => { this.setState({ characterExpanded: m }) }}
                        />
                    </React.Fragment>
                )}
            </div>
            {this.displayCharacterDetails()}
        </React.Fragment>
    )

    displayCharacterDetails = () => {
        if (this.state.characterExpanded) {
            let m = this.state.characterExpanded;
            return (
                <React.Fragment>
                    <div className="p-0 px-1 px-md-3">
                        <div className="mt-1 d-flex align-items-center">
                            <img
                                src={require(`../images/weapon_types/${this.props.getCharacterById(m.character.$oid).weapon_type}.webp`)}
                                alt=""
                                style={{
                                    height: "32px"
                                }}
                            />
                            <span className="fs-6 ms-1 me-auto">{this.props.getCharacterById(m.character.$oid).display}</span>
                            {m.roles.map(r =>
                                <span
                                    className="badge rounded-pill ms-1 d-flex align-items-center"
                                    style={{
                                        backgroundColor: (() => {
                                            if (r === "Main DPS") { return "#dc3545" }
                                            else if (r === "Sub DPS") { return "#fd7e14" }
                                            else if (r === "Support") { return "#0d6efd" }
                                            else if (r === "Heal") { return "#198754" }
                                        })()
                                    }}
                                >{r}</span>
                            )}
                        </div>
                        <div>
                            <div className="mt-2">
                                <img
                                    src={require(`../images/icons/weapon.webp`)}
                                    alt=""
                                    className="border border-3 bg-secondary rounded"
                                    style={{
                                        height: "48px"
                                    }}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="mx-3" viewBox="0 0 16 16">
                                <path d="M9.502 5.513a.144.144 0 0 0-.202.134V6.65a.5.5 0 0 1-.5.5H2.5v2.9h6.3a.5.5 0 0 1 .5.5v1.003c0 .108.11.176.202.134l3.984-2.933a.51.51 0 0 1 .042-.028.147.147 0 0 0 0-.252.51.51 0 0 1-.042-.028L9.502 5.513zM8.3 5.647a1.144 1.144 0 0 1 1.767-.96l3.994 2.94a1.147 1.147 0 0 1 0 1.946l-3.994 2.94a1.144 1.144 0 0 1-1.767-.96v-.503H2a.5.5 0 0 1-.5-.5v-3.9a.5.5 0 0 1 .5-.5h6.3v-.503z"/>
                                </svg>
                                <img
                                    src={require(`../images/weapons/${this.props.getWeaponById(m.weapon.$oid).value}.webp`)}
                                    alt=""
                                    className="border border-3 rounded"
                                    style={{
                                        height: "48px",
                                        backgroundColor: (() => {
                                            if (this.props.getWeaponById(m.weapon.$oid).rarity === 5) { return "#ffc107" }
                                            else if (this.props.getWeaponById(m.weapon.$oid).rarity === 4) { return "#6f42c1" }
                                            else if (this.props.getWeaponById(m.weapon.$oid).rarity === 3) { return "#0d6efd" }
                                        })()
                                    }}
                                />

                            </div>
                            <div className="mt-2">
                                <img
                                    src={require(`../images/icons/artifact.webp`)}
                                    alt=""
                                    className="border border-3 bg-secondary rounded"
                                    style={{
                                        height: "48px"
                                    }}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="mx-3" viewBox="0 0 16 16">
                                <path d="M9.502 5.513a.144.144 0 0 0-.202.134V6.65a.5.5 0 0 1-.5.5H2.5v2.9h6.3a.5.5 0 0 1 .5.5v1.003c0 .108.11.176.202.134l3.984-2.933a.51.51 0 0 1 .042-.028.147.147 0 0 0 0-.252.51.51 0 0 1-.042-.028L9.502 5.513zM8.3 5.647a1.144 1.144 0 0 1 1.767-.96l3.994 2.94a1.147 1.147 0 0 1 0 1.946l-3.994 2.94a1.144 1.144 0 0 1-1.767-.96v-.503H2a.5.5 0 0 1-.5-.5v-3.9a.5.5 0 0 1 .5-.5h6.3v-.503z"/>
                                </svg>
                                {m.artifacts.map((a, index) => (
                                    <React.Fragment key={index}>
                                        {index ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                            </svg>
                                            :
                                            null
                                        }
                                        <img
                                            src={require(`../images/artifacts/${this.props.getArtifactById(a.$oid).value}.webp`)}
                                            alt=""
                                            className="border border-3 rounded"
                                            style={{
                                                height: "48px",
                                                backgroundColor: this.props.getArtifactById(a.$oid).rarity === 5 ? "#ffc107" : "#6f42c1"
                                            }}
                                        />
                                    </React.Fragment>

                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                        className="text-center"
                        style={{ cursor: "pointer" }}
                        onClick={() => { this.setState({ characterExpanded: null }) }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                        </svg>
                    </div>
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="card mb-5" style={{ backgroundColor: "rgba(255, 255, 255, .8)" }}>
                    <div className="card-header border-bottom ps-2 ps-md-3 fs-5" style={{ backgroundColor: "#dee2e6" }}>{this.props.t.team_name}</div>
                    {this.displayTeamComposition(this.props.t)}
                    <div
                        className="card-body border-top bg-none ps-2 ps-md-3 pe-1 pe-md-2 py-1 d-flex justify-content-start align-items-center">
                        <span className="me-auto">Good for:</span>
                        {this.props.t.bosses.map(b =>
                            <React.Fragment key={b.$oid}>
                                <img
                                    src={require(`../images/bosses/${this.props.getBossById(b.$oid).value}.webp`)}
                                    alt=""
                                    className="me-1 bg-danger border border-1 border-secondary rounded-pill"
                                    style={{
                                        width: "9%"
                                    }}
                                />
                            </React.Fragment>
                        )}
                    </div>
                    <div className="card-body p-0">
                        <div className="accordion accordion-flush border-top">
                            <div className="accordion-item bg-none">
                                <div className="accordion-header">
                                    <button
                                        className={"accordion-button px-2 px-md-3 py-1" + (this.state.rotationGuideCollapsed ? " collapsed" : "")}
                                        style={{ backgroundColor: "#dee2e6", borderRadius: "0" }}
                                        type="button"
                                        onClick={() => { this.setState({ rotationGuideCollapsed: !this.state.rotationGuideCollapsed }) }}
                                    >
                                        Rotation Guide
                                    </button>
                                </div>
                                <div className={"accordion-collapse collapse" + (this.state.rotationGuideCollapsed ? "" : " show")}>
                                    <div className="accordion-body">
                                        <h5>Steps:</h5>
                                        <ul className="list-group list-group-flush">
                                            {this.props.t.rotation_guide.map((s, index) =>
                                                <li className="list-group-item border-0 d-flex align-items-center bg-none" key={index}>
                                                    <span style={{ width: "24px" }}>{index + 1}.</span>
                                                    <img
                                                        src={require(`../images/characters/icons/${this.props.getCharacterById(s.character.$oid).value}_icon.webp`)}
                                                        className="border border-secondary rounded me-1"
                                                        style={{
                                                            backgroundColor: this.props.getCharacterById(s.character.$oid).rarity === 5 ? "#ffc107" : "#6f42c1",
                                                            width: "48px"
                                                        }}
                                                    />
                                                    <span>
                                                        {this.props.getCharacterById(s.character.$oid).display}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right mx-1" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                                        </svg>
                                                        <span className="badge bg-primary" style={{ width: "32px" }}>{s.action}</span>
                                                    </span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion accordion-flush border-top border-light">
                            <div className="accordion-item bg-none">
                                <div className="accordion-header">
                                    <button
                                        className={"accordion-button px-2 px-md-3 py-1" + (this.state.notesCollapsed ? " collapsed" : "")}
                                        style={{ backgroundColor: "#dee2e6" }}
                                        type="button"
                                        onClick={() => { this.setState({ notesCollapsed: !this.state.notesCollapsed }) }}
                                    >
                                        Notes
                                    </button>
                                </div>
                                <div className={"accordion-collapse collapse" + (this.state.notesCollapsed ? "" : " show")}>
                                    <div className="accordion-body">
                                        <ul className="list-group list-group-flush">
                                            {this.props.t.notes.map((n, index) =>
                                                <li key={index} className="list-group-item border-0 d-flex bg-none">
                                                    <div style={{ minWidth: "16px" }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                                        </svg>
                                                    </div>
                                                    <div>{n}</div>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}