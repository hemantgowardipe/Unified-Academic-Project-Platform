import React from 'react';
import PropTypes from 'prop-types';
function ProjectCard({ project, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
        </div>
    );
}
ProjectCard.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        startDate: PropTypes.string,      // optional if used elsewhere
        guideName: PropTypes.string       // optional if used elsewhere
    }).isRequired,
    onClick: PropTypes.func.isRequired
};
export default ProjectCard;
