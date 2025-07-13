import React from 'react';

function ProjectCard({ project, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
        </div>
    );
}

export default ProjectCard;
