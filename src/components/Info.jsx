import React from 'react'
import AppContext from '../context'

function Info({title, description, image}) {

    const {setCartOpened} = React.useContext(AppContext)
    return (
        <div className="cartEmpty">
            <div className="cartInfo">
                <img width={120} src={image} />
                <b>{title}</b>
                <p>{description}</p>
            </div>
            <button onClick={() => setCartOpened(false)} className="greenButton">
                <img width={14} height={12} src="img/arrow-back.svg" />
                Вернуться назад
            </button>
        </div>
    )
}

export default Info 
