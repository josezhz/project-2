# GITeams

![Logo](./src/images/readme/logo.png)

https://giteams.netlify.app

---
## Overview

GITeams is a fan-made Genshin Impact knowledge exchange platform which enables its users to share their recommended team builds in great detail.

### Users' Goals

To share their unique insights on team building and to gain insights from others.

### Organization's Goals

To be able to contribute to the Genshin Impact community by providing a communication tool specifically for the team building aspect of the game.

---

## UI/UX

### User Stories & Acceptance Criteria

| User Stories | Acceptance Criteria |
| ------------ | ------------------- |
| As a beginner of Genshin, I struggle with deciding which characters to invest my limited resources on to composite a robust team. I want to have a detailed team building guide containing information such as team composition, and the weapon and artifact sets good for each team member. | A website where users can find team building guides posted by other people in great detail. |
| As a casual Genshin player, I have issue defeating the boss Azhdaha by myself. My characters are relatively well built but I have no idea how to composite my team. | A website that enables users to search for good teams for a specific boss. |
| As a pro Genshin player, I have plenty of insights on the game mechanism and team building that may be helpful to beginners. I want to help more people in the community by sharing my knowledge. | A website that enables users to post their team builds in great detail. |

### Color

![Theme colors](./src/images/readme/palette.png)

Bootstrap color scheme is used because it is diverse enough and visually appealing.

### Font

_HYWenHei-85W_ is used because it is the primary typeface of Genshin Impact, seen as the font which is used to display virtually everything in-game.

---

## Features

### Create

Create and post personalized team builds containing detailed information such as team name, team composition, recommended bosses, rotation guide, and customized notes.

### Read

Search for teams by team name, number of five-star characters, included characters, or target boss.

### Update

Update every piece of information of a team.

### Delete

Delete a team.

---

## Technologies Used

1. HTML
2. CSS
3. JavaScript
4. [MongoDB](https://www.mongodb.com/)
    - database
5. [Express](http://expressjs.com/)
    - API
6. [Heroku](https://www.heroku.com/)
    - API deployment
7. [React](https://reactjs.org/)
    - for single-page application
8. [Bootstrap 5.1](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
    - for styling and responsiveness
9. [Axios](https://www.axios.com/)
    - for fetching data from API

---

## Sample Documents

### "teams"

```json
{
    "_id": {
        "$oid": "62dbadfb99daa1a07235358c"
    },
    "team_name": "National Team",
    "team_composition": [
        {
            "character": {
                "$oid": "62c3be3de120685cac3ab505"
            },
            "weapon": {
                "$oid": "62c3bcc0e120685cac3a2b81"
            },
            "artifacts": [
                {
                    "$oid": "62c3c154e120685cac3bcef7"
                },
                {
                    "$oid": "62c3c154e120685cac3bceed"
                }
            ],
            "roles": [
                "Support"
            ]
        },
        {
            "character": {
                "$oid": "62c3be3de120685cac3ab52a"
            },
            "weapon": {
                "$oid": "62c3bcc0e120685cac3a2b6a"
            },
            "artifacts": [
                {
                    "$oid": "62c3c154e120685cac3bcef8"
                },
                {
                    "$oid": "62c3c154e120685cac3bceed"
                }
            ],
            "roles": [
                "Sub DPS"
            ]
        },
        {
            "character": {
                "$oid": "62c3be3de120685cac3ab504"
            },
            "weapon": {
                "$oid": "62c3bcc0e120685cac3a2b60"
            },
            "artifacts": [
                {
                    "$oid": "62c3c154e120685cac3bceed"
                }
            ],
            "roles": [
                "Support",
                "Heal"
            ]
        },
        {
            "character": {
                "$oid": "62c3be3de120685cac3ab528"
            },
            "weapon": {
                "$oid": "62c3bcc0e120685cac3a2b9a"
            },
            "artifacts": [
                {
                    "$oid": "62c3c154e120685cac3bcef6"
                },
                {
                    "$oid": "62c3c154e120685cac3bcefc"
                }
            ],
            "roles": [
                "Main DPS"
            ]
        }
    ],
    "number_of_five_star": {
        "$numberInt": "0"
    },
    "bosses": [
        {
            "$oid": "62c3d18ee120685cac423196"
        },
        {
            "$oid": "62c3d18ee120685cac423199"
        },
        {
            "$oid": "62c3d18ee120685cac423198"
        },
        {
            "$oid": "62c3d18ee120685cac423197"
        },
        {
            "$oid": "62c3d18ee120685cac42319b"
        }
    ],
    "rotation_guide": [
        {
            "character": {
                "$oid": "62c3be3de120685cac3ab505"
            },
            "action": "E"
        },
        {
            "character": {
                "$oid": "62c3be3de120685cac3ab52a"
            },
            "action": "Q"
        },
        {
            "character": {
                "$oid": "62c3be3de120685cac3ab52a"
            },
            "action": "E"
        },
        {
            "character": {
                "$oid": "62c3be3de120685cac3ab504"
            },
            "action": "Q"
        },
        {
            "character": {
                "$oid": "62c3be3de120685cac3ab528"
            },
            "action": "Q"
        },
        {
            "character": {
                "$oid": "62c3be3de120685cac3ab528"
            },
            "action": "E"
        },
        {
            "character": {
                "$oid": "62c3be3de120685cac3ab505"
            },
            "action": "Q"
        },
        {
            "character": {
                "$oid": "62c3be3de120685cac3ab528"
            },
            "action": "A"
        }
    ],
    "notes": [
        "Melt reaction is the main source of damage"
    ]
}
```

### "characters"

```json
{
    "_id": {
        "$oid": "62c3be3de120685cac3ab4fe"
    },
    "display": "Albedo",
    "value": "albedo",
    "rarity": {
        "$numberInt": "5"
    },
    "element": "Geo",
    "weapon_type": "sword",
    "region": "Mondstadt"
}
```

### "weapons"

```json
{
    "_id": {
        "$oid": "62c3bcc0e120685cac3a2b60"
    },
    "display": "Skyward Blade",
    "value": "skyward_blade",
    "type": "sword",
    "rarity": {
        "$numberInt": "5"
    }
}
```

### "artifacts"

```json
{
    "_id": {
        "$oid": "62c3c154e120685cac3bceeb"
    },
    "display": "Gladiator's Finale",
    "value": "gladiators_finale",
    "rarity": {
        "$numberInt": "5"
    }
}
```

### "bosses"

```json
{
    "_id": {
        "$oid": "62c3d18ee120685cac423196"
    },
    "display": "Andrius",
    "value": "andrius",
    "type": "weekly"
}
```

---

## Test Cases

| No. | Test Description | Test Steps | Expected Result |
|:--------:| ---------------- | ---------- | --------------- |
| 1 | Create a new team | 1. Go to the Create page through the navbar or the + button at the bottom-right corner.<br>2. Give your team a unique team name.<br>3. Add at least one team member which should have a character, a weapon, one or two artifact sets, and least one role.<br>4. Select at least one recommended boss.<br>5. Add at least one rotation guide step which should include a character and an action.<br> 6. Add at least one note.<br>7. Press [Add Team]. | The team you have just created is shown on the top of the Explore page. |
| 2 | Search for teams by team name | 1. Go to the filter form on the left side of the Explore page (for desktop) or by pressing the filter button at the bottom-right corner (for mobile).<br>2. Type in “national team” (case-insensitive) for [Team Name].<br>3. Press [Search]. | Only teams with “national team” appearing in its team name are displayed. |
| 3 | Search for teams by number of five-star characters | 1. Repeat step 1 of test 2.<br>2. Under “Number of 5-star”, uncheck [Any].<br>3. Select “1”.<br>4. Press [Search]. | Only teams with exactly 1 five-star character are displayed. |
| 4 | Search for teams by included characters | 1. Repeat step 1 of test 2.<br>2. Under “Included Characters”, select “Xingqiu” and “Bennett”.<br>3. Press [Search]. | Only teams that contain both Xingqiu and Bennett are displayed. |
| 5 | Search for teams by target boss | 1. Repeat step 1 of test 2.<br>2. Under “Target Boss”, select Dvalin.<br>3. Press [Search] | Only teams that are good for fighting the boss Dvalin are displayed. |
| 6 | Update an existing team | 1. Go to the Explore page.<br>2. Press the edit button at the bottom-right corner.<br>3. Under the team you want to update, press the blue button.<br>4. Update the team as you please. Make sure it has a unique team name, at least one team member, at least one recommended boss, at least one rotation guide step, and at least one note.<br>5. Press [Update Team]. | The team is updated as seen in the Explore page. |
| 7 | Delete an existing team | 1. Repeat steps 1-2 of test 6.<br>2. Under the team you want to delete, press the red button.<br>3. Press [Delete]. | The team is no longer displayed in the Explore page. |

---