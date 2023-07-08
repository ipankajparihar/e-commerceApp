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
import { clickedItem } from "../actions/items";

class Category extends React.Component {
  handleClick = (item) => {
    this.props.dispatch(clickedItem(item));
  };
  render() {
    const { categoryData, selectedCategory } = this.props;

    return (
      <div className="Category">
        <Container className="py-5 mt-5">
          <Row>
            {categoryData.items.map((item) => (
              <Col key={item.id} md={4} className="mb-4">
                <Link to="/category/description">
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoryData: state.categoryData,
  };
};

export default connect(mapStateToProps)(Category);
