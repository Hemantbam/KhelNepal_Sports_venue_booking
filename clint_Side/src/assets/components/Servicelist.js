import React from "react";
import ServiceCard from "./smallcomponents/Servicecard";
import { Col } from "reactstrap";
import weatherImg from "../image/weather.png";
import guideImg from "../image/guide.png";
import customizationImg from "../image/customization.png";

const servicesData = [
  {
    imgUrl: weatherImg,
    title: `Best venu`,
    desc: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
  },
  {
    imgUrl: guideImg,
    title: `User -friendly`,
    desc: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
  },
  {
    imgUrl: customizationImg,
    title: "Customer support",
    desc: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
  },
];

const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg="3" md="6" sm="12" className="mb-4" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
