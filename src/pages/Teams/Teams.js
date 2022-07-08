import React from "react";
import axios from "axios";
import Team from "./components/Team";

export default class Teams extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Team />
                {
                    this.props.teams.map(t => {
                        return (
                            <React.Fragment>
                                <h3>{t.team_name}</h3>
                                <ul>
                                    {t.team_composition.map(m => {
                                        return (
                                            <li>
                                                <img src={require(`../../images/characters/icons/${this.props.allCharacters.filter(c => c._id === m.character.$oid)[0].value}_icon.webp`)} alt="" style={{backgroundColor: "gold"}}/>
                                                <h5>
                                                    {this.props.allCharacters.filter(c => c._id === m.character.$oid)[0].display}
                                                </h5>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </React.Fragment>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}