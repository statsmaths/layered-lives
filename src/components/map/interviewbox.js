import React from 'react';

import './interviewbox.css';

const handleOpenXml = (id) => {
    window.open("./data/xml/" + id + ".xml");
  };

class InterviewBox extends React.Component {

  render() {

    if ((this.props.selectid < 0))
    {
      return(
        <div id="interview-container" className="hidden">
        </div>
      )
    }

    let links = this.props.selection.links.map( (val, i) => {
      return (
        <li>
          <button key={i} onClick={() => handleOpenXml(val.id)}>
            {val.title}
          </button>
        </li>
      )
    })

    return(
      <div id="interview-container">
        <div className="interview-meta">
          <h3> { this.props.selection.title } </h3>
          <hr width="100%"/>
          <button
            className="svg-close"
            onClick={() => this.props.handleSelectPoint(-1)}>
            <img
              src="static/close-black.svg"
              width="20"
              height="20"
              alt=""/>
          </button>
          <div className="interview-list-box">
            <ul>
              { links }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export {InterviewBox};
