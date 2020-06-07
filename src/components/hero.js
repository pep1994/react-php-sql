import React from 'react'

function hero(props) {
    return (
        <li className="collection-item" style={{ borderBottom: '1px solid #dadada' }}>
            <span className="title">{props.hero.name}</span>
            <span className="secondary-content">
                <button className="waves-effect waves-light btn-small" onClick={props.toggleImportant}>{props.hero.important == true ? 'not important' : <i className="material-icons">grade</i>}</button>
                <button className="btn-floating btn-small waves-effect waves-light red" style={{ marginLeft: '10px' }} onClick={props.deleteHero}> <i className="material-icons">delete</i> </button>
            </span>
        </li>
    )
}

export default hero
