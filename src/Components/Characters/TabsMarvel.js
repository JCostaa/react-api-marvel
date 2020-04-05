import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={0}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        padding:0
    },
    listInline:{
        marginLeft:-5,
        paddingLeft:0,
        listStyle:'none'
    },
    listComics: {
        display:"inline-block",
        paddingLeft:5,
        paddingRight:5
    },
    labelDefault:{
        backgroundColor:'#777'

    },
    label:{
        display:'inline',
        padding:'.2em .6em .3em',
        fontSize:11,
        lineHeight:0.5,
        color:'#fff',
        textAlign:'center',
        whiteSpace:'wrap',
        borderRadius:'.25em'
    },
    containerTab:{
        padding:0
    }
    
}));

function MarvelTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const { character } = props;
 
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>

            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label={`Comics (${character.comics.available})`} {...a11yProps(0)} />
                <Tab label={`Series (${character.series.available})`}{...a11yProps(1)} />
                <Tab label={`Series (${character.stories.available})`} {...a11yProps(2)} />
            </Tabs>

            <TabPanel className={classes.listInline} value={value} index={0}>
                <ul className={classes.listInline}>
                    {character && character.comics.items.map((item) => (
                        <li className={classes.listComics}>
                            <span className={`${classes.labelDefault} ${classes.label}`}>{item.name}</span>
                        </li>

                    ))}
                </ul>
            </TabPanel>
            <TabPanel className={classes.listInline} value={value} index={1}>
                <ul className={classes.listInline}>
                    {character && character.series.items.map((item) => (
                        <li className={classes.listComics}>
                            <span className={`${classes.labelDefault} ${classes.label}`}>{item.name}</span>
                        </li>

                    ))}
                </ul>
            </TabPanel>
            <TabPanel className={classes.listInline} value={value} index={2}>
                <ul className={classes.listInline}>
                    {character && character.stories.items.map((item) => (
                        <li className={classes.listComics}>
                            <span className={`${classes.labelDefault} ${classes.label}`}>{item.name}</span>
                        </li>

                    ))}
                </ul>
            </TabPanel>
        </div>
    );
}
MarvelTabs.propTypes = {
    character: PropTypes.object.isRequired,
};

export default MarvelTabs