import { Container } from "@mui/material";
import "./globals.css";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Section from "./components/Section";

const sections = [
  {
    title: "Astronomy Picture of the Day",
    description:
      "View today's Astronomy Picture of the Day (APOD) and explore the cosmos.",
    link: "/apod",
    backgroundImage: "null",
  },
  {
    title: "Mars Rover Photos",
    description:
      "Discover the latest photos taken by the Mars rovers and explore the Martian surface.",
    link: "/mars-photos",
    backgroundImage: "null",
  },
  {
    title: "Earth Images",
    description:
      "See daily images of Earth taken by the EPIC camera onboard the DSCOVR spacecraft.",
    link: "/earth-images",
    backgroundImage: "null",
  },
];

const Home = () => (
  <>
    <Navbar />
    <Hero
      title="Space Explorer"
      subtitle="Discover the Wonders of the Universe and Explore Space Images, Mars Rover Photos, and Near-Earth Objects."
    />
    <Container maxWidth="xl" sx={{ py: 5 }}>
      {sections.map((section, index) => (
        <Section
          key={index}
          title={section.title}
          description={section.description}
          link={section.link}
          backgroundImage={section.backgroundImage}
        />
      ))}
    </Container>
  </>
);

export default Home;
