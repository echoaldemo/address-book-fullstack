import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem, FormControl, InputLabel, OutlinedInput } from '@material-ui/core'
import withWidth from '@material-ui/core/withWidth';


const useStyles = makeStyles(theme => ({
    headInput: {
        display: 'grid',
        gridGap: '20px',
        padding: '20px',
        gridTemplateColumns: '1fr 1fr'
    },
    xsHeadInput: {
        display: 'grid',
        gridGap: '20px',
        padding: '20px',
        gridTemplateColumns: '1fr'
    },
}));

function InputHead(props) {
    const classes = useStyles();
    const { width } = props;
    const inputLabel = React.useRef(null);
    const [selected, setSelected] = React.useState(0);
    const [labelWidth, setLabelWidth] = React.useState(0);

    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    function handleSelect(event){
        let params = {};
        setSelected(event.target.value)
        if (event.target.value === 'firstAsc'){
            params = {
                sort_column: 'first_name',
                sort_by: 'asc'
            }
        }
        else if (event.target.value === 'firstDesc'){
            params = {
                sort_column: 'first_name',
                sort_by: 'desc'
            }
        }
        else if (event.target.value === 'lastAsc') {
            params = {
                sort_column: 'last_name',
                sort_by: 'asc'
            }
        }
        else if (event.target.value === 'lastDesc') {
            params = {
                sort_column: 'last_name',
                sort_by: 'desc'
            }
        }
        props.sortHandler(params)
    }


    return (
        <div className={
            (() => {
                if (width === 'xs') {
                    return classes.xsHeadInput
                } else {
                    return classes.headInput
                }
            })()}
        >
            {/* SEARCH */}
            <FormControl variant="outlined">
                <InputLabel ref={inputLabel} htmlFor="outlined-search">
                    Search
                </InputLabel>
                <OutlinedInput
                    labelWidth={labelWidth}
                    style={{ display: "inline-block" }}
                    onChange={e => props.handleChange(e.target.value)}
                    id="outlined-search"
                />
                </FormControl>
            {/* END SEARCH */}

            {/* SELECT */}
            <FormControl variant="outlined">
                <InputLabel ref={inputLabel} htmlFor="select">
                    Sort By
                </InputLabel>
                <Select
                    input={<OutlinedInput 
                    labelWidth={labelWidth} 
                    id="select"
                    value={selected || "firstAsc"} onChange={handleSelect}
                />}
                >
                    <MenuItem value="firstAsc">First Name A-Z</MenuItem>
                    <MenuItem value="lastAsc">Last Name A-Z</MenuItem>
                    <MenuItem value="firstDesc">First Name Z-A</MenuItem>
                    <MenuItem value="lastDesc">Last Name Z-A</MenuItem>
                 </Select>
            </FormControl>
            {/* END SELECT */}
        </div>
    );
}
export default withWidth()(InputHead)