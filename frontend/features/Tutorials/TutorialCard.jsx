import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./TutorialCard.module.css";

const TutorialCard = ({ tutorial }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Link
        to={`/tutorials/${tutorial.slug}`}
        style={{ textDecoration: "none" }}
      >
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} variant="h6">
              {tutorial.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {tutorial.description}
            </Typography>
            <br />
            <Typography variant="body2" color="textSecondary">
              Estimated Reading Time: {tutorial.estimatedReadingTime} minutes
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default TutorialCard;
