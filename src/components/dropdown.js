import React from "react";
import { connect } from "react-redux";
import "../css/Dropdown.css";
import { fetchCategory, selectCategory } from "../actions/dropdownClick";
import { Link, Route } from "react-router-dom";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: this.props.placeHolder,
      isMenu: false,
      items: [],
    };
  }

  handleItemClick = (value) => {
    this.setState({ selectedValue: value });
    this.props.dispatch(selectCategory(value));
    const data = this.props.dispatch(fetchCategory(value));
  };

  getValue = () => {
    return this.props.placeHolder;
  };

  handleMenuClick = () => {
    if (this.state.isMenu) {
      this.setState({
        isMenu: false,
      });
    } else {
      this.setState({
        isMenu: true,
      });
    }
  };

  render() {
    const { homeitems } = this.props;

    const { selectedValue, isMenu } = this.state;

    const uniqueArray = homeitems.reduce((acc, curr) => {
      const matchNode = acc.find((item) => item.category === curr.category);
      if (!matchNode) {
        acc.push(curr);
      }
      return acc;
    }, []);

    return (
      <div className="dropdown-container">
        <div className="dropdown-input" onClick={() => this.handleMenuClick()}>
          <div className="dropdown-selected-value">{selectedValue}</div>
          <div className="dropdown-tools">
            <div className="dropdown-tool">
              <Icon />
            </div>
          </div>
        </div>
        {isMenu && (
          <div className="dropdown">
            {uniqueArray.map((item) => (
              <div
                key={item.id}
                onClick={() => this.handleItemClick(item.category)}
                className="dropdownItem"
              >
                <Link to="/category"> {item.category} </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    homeitems: state.homeitems,
  };
};

export default connect(mapStateToProps)(Dropdown);
