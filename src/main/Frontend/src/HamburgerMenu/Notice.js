import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/NoticeStyle.css';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    
  },
}));

const Notice = () => {
    
    const [trigger, setTrigger] = useState('');
    const [notice, setNotice] = useState([{
        title : '',
        contents : '',
        registerDate : ''
    }])

    useEffect(async() => {

        axios.get('/contents/notice').then((response) => {

            if(response.data.length > 0) {

                setTrigger('items');
                const _notice = response.data.map((notice) => ({
                    title : notice.title,
                    contents : notice.contents,
                    registerDate : notice.noticeDate
                }));

                setNotice(_notice);

            } else {
                setTrigger('none');
            }

        })
    
    }, []);



    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className = 'NoticeContainer'>

            <h4>Notice</h4>
            <hr style = {{ border : '0.5px solid black', marginTop : '-15px', width : '100%' }}/>

            <div className = 'Notice'>

                <div className={classes.root}>

                {notice.map((notice, index) => {

                    var text = notice.contents.replace(/<br\s*\/?>/img, '\r\n');
                    let temp = notice.registerDate;
                    temp.replace(/(\d{4}(\d{2})(\d))/, '$1-$2-$3');
                    let date = new Date(temp).toLocaleDateString();

                    if(trigger == 'none') {
                        return (
                            <div>
                                <h4 className = "emptyNotice"> 등록된 공지가 없습니다.</h4>
                            </div>
                        )
                    } else if(trigger == 'items') {

                        return (

                            <Accordion expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                >
                                    <Typography className={classes.heading} style = {{ width : '100px'}}>{date}</Typography>
                                    <Typography className={classes.secondaryHeading} style = {{ width : '400px'}}>{notice.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails style = {{ backgroundColor : 'white', borderBottom : '1px solid black', borderTop : '1px solid black'}}>
                                    <Typography style = {{ height : '350px'}}>
                                        <pre>
                                            <p>{text}</p>
                                        </pre>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            
                        );
                    }

                })}

                
                </div>

                    

            </div>
            
        </div>
    );
}

export default Notice;