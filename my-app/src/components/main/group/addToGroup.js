import React from 'react';
import { Button, IconButton, DialogActions, DialogContent, DialogTitle, Tooltip, Dialog, withWidth } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { DeleteForever } from '@material-ui/icons'
import axios from 'axios'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    dialogTitle: {
        backgroundColor: '#00293b',
        color: 'white',
        textAlign: 'center'
    },
   title: {
        fontSize: '29px',
        letterSpacing: '6px',
        margin: 0
   },
   container: {
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gridGap: '30px'
   },
   xsContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        padding: '0 15px'
   },
   actions: {
       display: 'grid', 
       gridTemplateColumns: '1fr 1fr'
   },
   delete: {
       display: 'grid', 
       gridTemplateColumns: '1fr 3fr'
   },
    label: {
        color: '#1e6f92',
        fontSize: '15px'
    },
    formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
 
}));

const id = localStorage.getItem('id');

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(id, selected, theme) {
  return {
    fontWeight:
        selected.findIndex(i => i.id === id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function AddToGroup(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { width } = props
    let [ contacts, setContacts ] = React.useState([]),
    [edit, setEdit] = React.useState(true),
    [save, setSave] = React.useState(false),
    [dataLoaded, setDataLoaded] = React.useState(false);
    const [current, setCurrent] = React.useState([]);
    const [selected, setSelected] = React.useState([]);

  
    React.useEffect(() => {
        setCurrent(props.currentMembers)   
        setDataLoaded(true)
    }, [props.currentMembers]);

    function handleChange(event) {
        setCurrent(event.target.value)
    }

    function handleSave(){
        var contacts = []
        current.map(contact => {
           contacts.push(contact.id)
        })
        const state = {
            contacts
        }
        axios.patch(process.env.REACT_APP_BASE_URL + `/api/groups/${props.groupId}`, state)
            .then(response => {
                props.handleAdd()
            })
            .catch(error => {
                console.error(error)
            })
        
    }


    return (   
        <React.Fragment>
        <Dialog fullScreen={width === 'xs' ? true : false} disableBackdropClick disableEscapeKeyDown open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                <p className={classes.title}>
                    Add Contacts to Group
                </p>
            </DialogTitle>
            {dataLoaded
            ? 
            <DialogContent>
                <div style={{ display: 'grid', margin: '25px 70px', justifyItems: 'center' }}>
                     <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple-chip">Members</InputLabel>
                        <Select
                          autoWidth
                          multiple
                          value={current}
                          onChange={handleChange}
                          input={<Input id="select-multiple-chip" />}
                          renderValue={selected => (
                            <div className={classes.chips}>
                              {selected.map(value => (
                                <Chip key={value.id} label={value.first_name} className={classes.chip} />
                              ))}
                            </div>
                          )}
                          MenuProps={MenuProps}
                        >
                          {props.notInclude.map(contact => (
                            <MenuItem key={contact.id} value={contact} style={getStyles(contact.id, current, theme)}>
                              {contact.first_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                </div>
            </DialogContent>
            : null
            }
            <div className={classes.actions}>
                <div className={classes.delete}>
                    <Tooltip title="Delete Contact" placement="right">
                        <IconButton color="primary">
                            <DeleteForever />
                        </IconButton>
                    </Tooltip>
                </div>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleSave()} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
        </React.Fragment>
    );
}
export default withWidth()(AddToGroup);