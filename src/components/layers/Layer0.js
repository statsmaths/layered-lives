import React from 'react';

function Layer0(props) {

    // Should have access to all of these:
    //    props.handlePage(PAGENUM)

    let sup_version = true;

    return(
<div>

  <div class="fpage">
    <div class="title">LAYERED LIVES:</div>
    <div class="subtitle">
      Rhetoric and Representation in the Southern Life History Project
    </div>
    <div class="line-break"></div>
    <div class="byline">Taylor Arnold, Courtney Rivard, Lauren Tilton</div>
  </div>

  <button className="toc-button" onClick={() => props.handlePage(1)}>
    Introduction
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(2)}>
    Layer 1
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(3)}>
    Layer 2
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(4)}>
    Layer 3
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(5)}>
    Layer 4
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(6)}>
    Conclusion
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(7)}>
    Methods
  </button>

  <button className="toc-button" onClick={() => props.handlePage(8)}>
    Bibliography
  </button>

  {(!sup_version) && (<button
    className="toc-button toc-button-download"
    onClick={() => window.open('https://raw.githubusercontent.com/statsmaths/layered-lives/main/pdf/layered-lives.pdf', '_blank')}
  >
    Download PDF
  </button>) }



  {(false) && (<div className="message"></div>) }

</div>
    )
}


export {Layer0};
