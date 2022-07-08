import React from "react";

export default function Team(props) {
    return (
        <React.Fragment>
            <h1>Team</h1>
            <h2>{props.team_name}</h2>
            {
                props.teams.map(t => {
                    return (
                        <React.Fragment>
                            <h3>{t.team_name}</h3>
                            <ul>
                                {t.team_composition.map(m => {
                                    return (
                                        <li>
                                            <img src={require(`../../../images/characters/icons/${props.allCharacters.filter(c => c._id === m.character.$oid)[0].value}_icon.webp`)} alt="" style={{ backgroundColor: "gold" }} />
                                            <h5>
                                                {props.allCharacters.filter(c => c._id === m.character.$oid)[0].display}
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
};