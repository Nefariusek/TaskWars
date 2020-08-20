import React from 'react';
import 'semantic-ui-css/semantic.min.css';

class Details extends React.Component {

    render() {
        return (
            <div className="detailsDiv">
                <h1>{this.props.name}</h1>
                <h3>Level: {this.props.level}</h3>
            </div>
        );
    }
}

export default Details;