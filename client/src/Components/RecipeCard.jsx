import React from "react";
import styles from "./RecipeCard.module.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
let prevId = 1;
function RecipeCard(recipes) {
  const { image, name, dietTypes, spoonacularScore } = recipes;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {spoonacularScore}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {dietTypes}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <a href="https://www.google.com" target="_blank"><Button size="small">Learn More</Button></a>
      </CardActions> */}
    </Card>
  );
}

export default RecipeCard;
