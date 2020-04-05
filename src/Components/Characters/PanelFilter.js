import React,{useState,useEffect,useMemo}from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import CardCharacter from './Characters'
import Container from '@material-ui/core/Container';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        paddingBottom: 20

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'initial',
        color: 'white',
        backgroundColor: 'black',
        fontSize: 15

    },

    formControl: {
        margin: theme.spacing(2),
        minWidth: 145,
        float:'right'
      },
      selectEmpty: {
        marginTop: theme.spacing(3),
      },
      cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
     
      },

}));

function PanelFilters(props) {

    const { onLoadCharacters, characters } = props;

    const [options,setOptions] = useState('');

    const [perPage,setPerPage] = useState(20);

    const [totalPage,setTotalPage] = useState(1);

    const [params,setParams] = useState({});

    useEffect(()=>{
       onLoadCharacters(params);
    },[params])

    useMemo(()=>{
       if(characters){
        const totalPage = Math.ceil(characters.total / perPage)
        setTotalPage(totalPage);
       }
    
     },[characters,perPage])
 

    function handleChange(event)
    {
        const params = {orderBy:event.target.value}
        setOptions(event.target.value)
        setParams(params)
    
    }
    function handleChangePerPage(event)
    {
        const params = {limit:event.target.value}
        setPerPage(event.target.value)
        setParams(params)
    }

    function handlePaginator(event)
    {
        const params = {offset:(event.target.textContent - 1)* perPage}
      
          setParams(params);
    }
    const classes = useStyles();
    return (
        <Container className={classes.cardGrid} maxWidth="md">
        <div className={classes.root}>
            <Paper className={classes.paper}>Filters</Paper> 
        
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Result per page</InputLabel>
            <Select
            value={perPage}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            
            onChange={handleChangePerPage}
            >
           <MenuItem value={`20`}>20</MenuItem>
          <MenuItem value={`40`}>40</MenuItem>
          <MenuItem value={`60`}>60</MenuItem>
          <MenuItem value={`100`}>100</MenuItem>
         
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Sorting By Name</InputLabel>
            <Select
            value={options}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            
            onChange={handleChange}
            >
          <MenuItem value={`name`}>Asc</MenuItem>
          <MenuItem value={`-name`}>Desc</MenuItem>
     
        </Select>
      </FormControl>
            <CardCharacter  characters={characters.results} />
        </div>
         <Pagination count={totalPage} onChange={handlePaginator}/>
        </Container>
        
    );

    
}
PanelFilters.propTypes ={
    onLoadCharacters:PropTypes.func.isRequired,
    characters:PropTypes.array.isRequired
}

export default PanelFilters