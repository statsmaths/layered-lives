import React from 'react';

import './imagebox.css';

class ImageBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    fetch("./data/json/image.json").then(res => {
      return res.json()
    }).then(res => {
      this.setState({
        data: res
      });
    })
  }

  render() {

    if ((this.props.image < 0) | (!this.state.data))
    {
      return(
        <div id="interview-container" className="hidden">
        </div>
      )
    }

    let simage = this.state.data[this.props.image];

    let figname = simage.number <= 0 ? "" : ( <b>Figure {simage.number}</b> );

    return(
      <div id="image-container">
        <div className="image-meta">
          <p>{figname} {simage.caption}</p>
          <div className="image-list-box">
            <a href={simage.path} target="_blank" rel="noopener noreferrer">
              <img alt="archival data" src={simage.path}/>
            </a>
          </div>
          <img
            className="svg-close"
            src="static/close-black.svg"
            width="20"
            height="20"
            onClick={() => this.props.handleImage(-1)}
            alt=""/>
        </div>
      </div>
    )
  }
}

export {ImageBox};
