import React from 'react';
import '../Application.scss';
import './MathSidebar.scss'

type ActionsGroupProps = { title: string; groupType: string, children?: JSX.Element };
const ActionsGroup = ({ groupType, title, children }: ActionsGroupProps) => {
    return (
        <section className='actions-group'>
            <h1 className='actions-group-title' id={groupType}>{title}</h1>
            <div className='actions-group-content'>{children}</div>
        </section>
    );
}

export default ActionsGroup;
