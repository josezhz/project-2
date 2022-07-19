import React from "react";
import DisplayTeam from "../components/DisplayTeam";

export default class Explore extends React.Component {
    state = {
        teamName: "",
        numberOfFiveStar: null,
        includedCharacters: [],
        targetBoss: null
    }

    filterForm() {
        return (
            <React.Fragment>
                <div className="container w-100 h-100 rounded"
                    style={{ backgroundColor: "rgba(255, 255, 255, .8)" }}
                >
                    
                </div>
            </React.Fragment>
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
                                        getCharacterById={this.props.getCharacterById}
                                        getWeaponById={this.props.getWeaponById}
                                        getArtifactById={this.props.getArtifactById}
                                        getBossById={this.props.getBossById}
                                    />

                                </React.Fragment>
                            )) : <h1 className="text-center">No Results Found</h1>
                        }
                    </div>
                </div>
                <button className="filter-btn d-lg-none" onClick={() => { this.props.toggleFilter() }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                        {this.props.filterHidden ?
                            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                            :
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        }
                    </svg>
                </button>
            </React.Fragment>
        )
    }
};