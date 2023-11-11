import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AOS from "aos";
import "aos/dist/aos.css";
import { Container, Grid } from "@mui/material";

type CourseProps = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

function ServicesComponent({ title, description, imageUrl }: CourseProps) {
  React.useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <Card data-aos="zoom-in">
      <CardMedia
        component="img"
        height="50"
        image={imageUrl}
        // image="../../src/assets/constellation-bg.svg"
        alt="Image of the member"
      />
      <CardContent>
        <Typography fontFamily="Poppins-Medium" gutterBottom variant="h6">
          {title}
        </Typography>

        <p className="font-poppinsLight text-md">{description}</p>
      </CardContent>
    </Card>
  );
}

function ServicesSection() {
  const Courses: CourseProps[] = [
    {
      id: 1,
      imageUrl: "/service.png",
      title: "Story Telling",
      description: `Step into the realm of community well-being and disease prevention. Our Public Health Certificate equips you with the knowledge to assess health challenges, design effective interventions, and advocate for healthier societies. Dive into epidemiology, health policies, and health promotion strategies, positioning yourself as a force for positive change.`,
    },
  ];

  return (
    <Container maxWidth="lg" style={{ marginTop: "40px" }}>
      <Grid container spacing={2}>
        {Courses.map((item: CourseProps, index: number) => {
          return (
            <Grid item key={item.id} xs={12} sm={12} md={6} lg={6}>
              <ServicesComponent {...item} />;
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default ServicesSection;
