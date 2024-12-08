import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import img1 from "../Assets/img1.jpg";
import img2 from "../Assets/img2.jpg";
import "./Home.css";
// import Card from "react-bootstrap/Card";

const images = [
  "https://img.freepik.com/free-photo/view-vintage-objects-still-life_23-2150348530.jpg?t=st=1733078289~exp=1733081889~hmac=1ff844fa5ff107d02323a383138d694281ba1de82d61cced6a4067db1417e8cd&w=1060",
  "https://img.freepik.com/free-photo/vintage-objects-arrangement-still-life_23-2150348581.jpg?t=st=1733078368~exp=1733081968~hmac=d1b133dffc77ce66f9bf84b27c64c315808539186d47ca60103578b1b0373fdd&w=1060",
  "https://img.freepik.com/free-photo/top-view-vintage-objects-still-life_23-2150348557.jpg?t=st=1733078221~exp=1733081821~hmac=4b41a0b513ba290b7f1fc91fd4cf2acc40c03d388193f31cdc9b3c9b05bc55fc&w=1060"
 
];

function Home() {
  return (
    <div>
      <div className="box">
        <Carousel useKeyboardArrows={true}>
          {images.map((URL, index) => (
            <div className="slide">
              <img alt="sample_file" src={URL} key={index} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="texts text-center container p-5">
        <h2>THE GREATEST STORIES SHOULD LIVE FOREVER. </h2>
        <br></br>
        <br></br>
        <h5>
          Antique Story is, simply, all about the story. We take great pride in
          culling out the most profound narratives from the past, and retelling
          them through the lens of vintage artifacts, home décor and handpicked
          collectibles. No matter what form they take and where they go, the
          stories live on. Join us in giving these stories a new life.
        </h5>
      </div>
      <br></br><br></br>
      <div className="texts">
        <Container>
          <Row>
            <Col>
              <img src={img1} alt="img1"></img>
            </Col>
            <Col className="text-center pt-5 mt-5">
              <h3>OUR HISTORY DESERVES A FUTURE.</h3>

              <h6 className="mt-5 pt-5">
                All our work at Antique Story is a natural extension of this
                spirit. As heirs to the glorious legacy of India that spans
                millennia and defies imaginations, it is our pleasure and
                privilege to conserve the treasures of this time, and pass them
                on, unadulterated, to the generations of the future.
              </h6>
            </Col>
          </Row>
        </Container>
        <br></br>
        <Container className="pt-3">
          <Row>
            <Col className="text-center pt-5 mt-5">
              <h3>THE ONE THING ART MUST HAVE IS HEART.</h3>

              <h6 className="mt-5 pt-5">
                At antique story, we put great thought and passion into what we
                pick and why we pick it. From rare folk art to exquisitely
                carved wooden panels , every object you will discover in this
                space carries deep inspiration, meaning and joy in equal
                measures. Much more than pieces of decoration, they are lessons
                on life itself. Nothing less can be called art.
              </h6>
            </Col>

            <Col>
              <img className="width" src={img2} alt="img2"></img>
            </Col>
          </Row>
        </Container>
      </div>
      <br></br><br></br>
       
    </div>
  );
}
export default Home;
