import React from "react";
import ReactDOM from "react-dom";
import "./css/Menu.default.css";

export default class Menu extends React.Component {
  state = {
    anchorTop: false
  };

  render() {
    const { anchorTop } = this.state;
    const { style } = this.props;
    return (
      <div id="menu-bar" className={"menu"}>
        {MenuDesktop.bind(this)()}
        <div
          id="menu-bar-top"
          hidden={!anchorTop}
          className="menu anchor-top"
          style={style}
        >
          {MenuDesktop.bind(this)()}
        </div>
      </div>
    );
  }
  componentDidMount = () => {
    addScrollListener.bind(this)();
  };
}
function addScrollListener() {
  window.addEventListener(
    "scroll",
    function(event) {
      const { anchorTop } = this.state;
      const boundingBox = ReactDOM.findDOMNode(this).getBoundingClientRect();
      if (boundingBox.y < 0 && !anchorTop) {
        this.setState({ anchorTop: true });
      } else if (boundingBox.y > 0 && anchorTop) {
        this.setState({ anchorTop: false });
      }
    }.bind(this)
  );
}

// works until 542 width
function MenuDesktop() {
  let menu = [];
  if (this.props.buttons)
    Object.entries(this.props.buttons)
      .map(([side, buttons]) => {
        return buttons.map(name => {
          const id = name.split(" ").join("-");
          const isCurrentButton = this.props.currentLocation.includes(id);
          const className = isCurrentButton ? "current-button" : "";
          return (
            <button
              // @ts-ignore
              style={{ float: side }}
              className={className}
              disabled={isCurrentButton}
              key={id}
              id={id}
              onClick={() => {
                window.history.replaceState({ id }, name, `/${id}`);
              }}
            >
              {name}
            </button>
          );
        });
      })
      .forEach(array => (menu = menu.concat(array)));

  return menu;
}
