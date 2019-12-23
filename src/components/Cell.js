import React from "react";

class Cell extends React.Component {
  render() {
    let className = this.props.state ? "cell":"raw-cell"
    return (
      <div className={this.props.winner ? "winning-cell" : className}>
        {this.props.state ? this.props.state : this.props.display}
      </div>
    );
  }
}

export default Cell;
