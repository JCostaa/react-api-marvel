
import React, { useState, useEffect,useMemo } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import api from '../../Services/api'
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { grey } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TabMarvel from './TabsMarvel'
import FilterPanel from './PanelFilter'
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
 
  },
  card: {
 
    display: 'flex',
    flexDirection: 'column',
    height:500
  },
  cardMedia: {
    height: 300,
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  buttonCard: {
    textAlign: 'center',
    color: 'white',
    width:'100%'
  },
 
  actionCard: {
    justifyContent: 'center',
    backgroundColor:'red',
 
  },
 
  characterModal:{
    height: 200,
    width: 200,
    marginRight: 10,
    marginBottom: 10
  },
  imgCircle:{
    borderRadius:'50%'
  },

  titleCard: {
    backgroundColor: 'black',
    color: 'white',
  },
  modalDesc:{
    flex:'1 1 0'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  linkModal:{
    display:'block',
    width:'100%'
  },
  modalBody:{
    display:'flex',
    flexFlow:'row wrap'
  },
  closeButton: {
    position: 'absolute',
    right: 1,
    top: 1,
    color: grey[500],
  },

}));
 
 
function AlertDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { character } = props;


  function handleClickOpen(){
    setOpen(true);
  };

  function handleClose()  {
    setOpen(false);
  };


  return (
    <>
    <Button className={classes.buttonCard} onClick={handleClickOpen}>
        View More
      </Button>
    <div>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
  <DialogTitle id="form-dialog-title">{character.name}</DialogTitle>
      <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogContent className={classes.modalBody} dividers>
          <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} className={`${classes.characterModal} ${classes.imgCircle}`}></img>
          <div className={classes.modalDesc}>
              <h3>Description</h3>
              <Typography>
                {!character.description ? 'Description not available. ' : character.description}
              </Typography>
              <Link href="http://marvel.com/comics/characters/1011334/3-d_man?utm_campaign=apiRef&utm_source=dc68926c6f06eb9f4259918772520b23"  className={classes.linkModal}>
                    Read more on Marvel
                </Link>
                <Link href="http://marvel.com/universe/3-D_Man_(Chandler)?utm_campaign=apiRef&utm_source=dc68926c6f06eb9f4259918772520b23" className={classes.linkModal}>
                Read more on Marvel Universe Wiki
                </Link>
                <Link href="http://marvel.com/comics/characters/1011334/3-d_man?utm_campaign=apiRef&utm_source=dc68926c6f06eb9f4259918772520b23"  className={classes.linkModal}>
                Read Comic Public Info
                </Link>
          </div>
          <TabMarvel character={character}/>
        </DialogContent>
    </Dialog>
    </div>
    </>
  )
  
}

function MediaCard(props) {
 
  const {characters }  = props
  const classes = useStyles();

  return (
    
  
      <Container className={classes.cardGrid} maxWidth="md">

        {/* End hero unit */}
        <Grid container spacing={4}>
          {characters && characters.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card  className={classes.card}>
                <span className={classes.titleCard}>
                  <h2>
                    {item.name}
                  </h2>
                </span>
                <CardMedia
                  className={classes.cardMedia}
                  image={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography>
                  {
                    !item.description ?  'Description not available.':
                     item.description.length > 150 ?
                     item.description.substring(0, 90).split('').concat('...').join('') :
                     item.description
                    }
                  </Typography>
                </CardContent>
                <CardActions className={classes.actionCard}>
                    <AlertDialog  character={item} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
  );
}
AlertDialog.propTypes = {
  character:PropTypes.object.isRequired,
};
MediaCard.propTypes ={
  characters:PropTypes.array.isRequired
}
export default MediaCard