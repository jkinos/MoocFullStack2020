import React from "react";
import { CourseName } from '../types'

const Header: React.FC<CourseName> = ({name}) => {
    return(
        <div>
            <h1>{name}</h1>
        </div>
    )
}

export default Header