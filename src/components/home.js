import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import { clickedItem, homeItems } from "../actions/items";

class Home extends React.Component {
  handleClick = (item) => {
    this.props.dispatch(clickedItem(item));
  };
  handleSort = (e) => {
    const { homeitems } = this.props;

    if (e === "increasePrice") {
      const sortedArray = homeitems.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
      this.props.dispatch(homeItems([...sortedArray]));
    } else if (e === "decreasePrice") {
      const sortedArray = homeitems.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
      this.props.dispatch(homeItems([...sortedArray]));
    } else {
      const sortedArray = homeitems.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      this.props.dispatch(homeItems([...sortedArray]));
    }
  };
  render() {
    const { homeitems } = this.props;

    return (
      <div className="Home">
        <div>
          <Container className="py-5 mt-5">
            <div className="sort">
              {/* sorting homeitems */}
              <label>
                Sort:
                <select
                  onClick={(e) => this.handleSort(e.target.value)}
                  className="sort-select"
                >
                  <option value="increasePrice">Price Increasing Order</option>
                  <option value="decreasePrice">Price Decreasing Order</option>
                  <option value="AtoZ">A-Z</option>
                </select>
              </label>
            </div>
            <Row>
              {/* listing the home with products fatched from firebase */}
              {homeitems.map((item) => (
                <Col key={item.id} md={4} className="mb-4">
                  <Link to="description">
                    <Card
                      className="h-100"
                      onClick={() => this.handleClick(item)}
                    >
                      <CardImg top src={item.image} alt={item.title} />
                      <CardBody>
                        <CardTitle>{item.title}</CardTitle>
                        <CardSubtitle>Price:{item.price}$</CardSubtitle>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

//connection component with redux store
const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    homeitems: state.homeitems,
  };
};

export default connect(mapStateToProps)(Home);
