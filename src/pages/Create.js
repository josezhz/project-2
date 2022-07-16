import React from "react";

export default class Create extends React.Component {
    state = {
        team_name: ""
    }

    render() {
        return (
            <React.Fragment>
                <div className="content container-fluid p-0 pt-5 bg-light overflow-auto">
                    <div className="container" style={{ maxWidth: "992px" }}>
                        <div className="mb-3">
                            <label className="fs-5">Team Name</label>
                            <input type="text" name="team_name" className="form-control rounded-pill" id=""/>
                        </div>
                        <div className="mb-3">
                            <label className="fs-5">Team Composition</label>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
};