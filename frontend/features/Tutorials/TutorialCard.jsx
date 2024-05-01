import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./TutorialCard.module.css";

const TutorialCard = ({ tutorial }) => {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Link
        to={`/tutorials/${tutorial.slug}`}
        style={{ textDecoration: "none", display: "block", width: "80%" }}
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
      <Card
        sx={{
          width: "20%",
          height: "100%",
          textAlign: "center",
          background: "yellow",
        }}
      >
        <Avatar
          sx={{ margin: "auto", width: 24, height: 24 }}
          alt={tutorial.author.username}
          src={tutorial.author.avatar}
        />
        <Typography>{tutorial.author.username}</Typography>

        <Typography
          sx={{ flexBasis: "100%" }}
          variant="body2"
          color="textSecondary"
        >
          {new Date(tutorial.createdAt).toLocaleDateString()}
        </Typography>
      </Card>
    </Card>
  );
};

export default TutorialCard;

// import React from 'react';
// import { Card, CardHeader, CardContent, Avatar, Typography, Chip } from '@mui/material';

// const TutorialCard = ({ tutorial }) => {
//   const { title, description, estimatedReadingTime, tags, avatar, username } = tutorial;

//   return (
//     <Card>
//       <CardHeader
//         avatar={<Avatar alt={username} src={avatar} />}
//         title={username}
//         subheader={`${estimatedReadingTime} min read`}
//       />
//       <CardContent>
//         <Typography variant="h6" gutterBottom>
//           {title}
//         </Typography>
//         <Typography variant="body1" paragraph>
//           {description}
//         </Typography>
//         <div>
//           {tags.map((tag, index) => (
//             <Chip key={index} label={tag.name} style={{ marginRight: '0.5rem' }} />
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default TutorialCard;
