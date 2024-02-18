import React from "react"
import "../styles/home.css"
import { Container, Row, Col, CardSubtitle } from "reactstrap"
import worldImg from "../image/world.png";

import Subtitle from "../shared/subtitle";
import ServiceList from "../services/serviceLists";
import NewsLetter from "../shared/Newsletter";

const Home = () => {
  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know Before You Go"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Empower your passion, book your{" "}
                  <span className="hightlight">victory</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Ullam ipsum nobis asperiores soluta voluptas quas voluptates.
                  Molestiae tempora dignissimos, animi praesentium molestias
                  perferendis porro expedita delectus. Soluta natus porro.
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box">
                <img
                  src="https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="football"
                />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box hero__video-box mt-4">
                <img
                  src="https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="cricket"
                />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img
                  src="https://images.unsplash.com/photo-1540828999861-3a4ecd58d9c9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="basketball"
                />
              </div>
            </Col>

            {/* <SearchBar /> */}
          </Row>
        </Container>
      </section>
      {/* ============================================================== */}

      {/* ==================== HERO SECTION START ====================== */}
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">What we serve</h5>
              <h2 className="services__title">We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/* ========== FEATURED venu SECTION START ========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured__tour-title">Our featured venue</h2>
            </Col>
            {/* <FeaturedTourList component here /> */}
          </Row>
        </Container>
      </section>
      {/* ========== FEATURED TOUR SECTION END =========== */}

      {/* ========== EXPERIENCE SECTION START ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Experience"} />
                <h2>
                  With our all experience <br /> we will serve you
                </h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  <br /> Quas aliquam, hic tempora inventore suscipit unde.{" "}
                </p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Sports venue</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular clients</h6>
                </div>
                <div className="counter__box">
                  <span>5</span>
                  <h6>Year experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img ">
                <img
                  src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ========== EXPERIENCE SECTION END ============== */}

      {/* ========== GALLERY SECTION START ============== */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title">Visit our gallery</h2>
            </Col>
            <Col lg="12">{/* <MasonryImagesGallery /> */}</Col>
          </Row>
        </Container>
      </section>
      {/* ========== GALLERY SECTION END ================ */}

      {/* ========== TESTIMONIAL SECTION START ================ */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Fans Love"} />
              <h2 className="testimonial__title">
                What our constumer say about us
              </h2>
            </Col>
            <Col lg="12">
              {/* testimonial here */}
            </Col>
          </Row>
        </Container>
      </section>
      {/* ========== TESTIMONIAL SECTION END ================== */}
      <NewsLetter />
    </>
  );
};

export default Home;
