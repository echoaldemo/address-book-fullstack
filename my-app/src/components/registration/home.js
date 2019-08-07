import React, { useState } from 'react';
import { withRouter } from "react-router";
import Navbar from './navBar'
import axios from 'axios'
import Toast from './Toast'
import withWidth from '@material-ui/core/withWidth'
import Fade from '@material-ui/core/Fade';
import Registration from './registration'

function Home(props) {
  const { width } = props;
  let [open, setOpen] = useState(false);
  let [success, setSuccess] = useState(false);
  let [message, setMessage] = useState('');
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
      const token = localStorage.getItem('token');
      if(token){
        props.history.push('/contacts');
      }
  }, []);
  
  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  function handleChange() {
    setChecked(prev => !prev);
  }

  function submitHandler(state) {
    axios.post(process.env.REACT_APP_BASE_URL + '/api/users/register', state)
    .then(response => {
      setMessage('Succesfully registered!')
      setSuccess(true)
      setOpen(true);
      props.history.push('/contacts');
    })
    .catch(error => {
      setMessage('Username is already taken! Please enter another one.')
      setSuccess(false)
      setOpen(true)
      console.error(error)
    })
  }

  return (
    <div>
      { width === 'xs' 
      ? <React.Fragment>
          <Navbar hide={checked} handleChange={handleChange}/>
          <Fade in={checked}>
            <div> 
              <Registration hide={checked} handleChange={handleChange} submit={submitHandler}/>
            </div>
          </Fade>
        </React.Fragment>
      : <React.Fragment>
          <Navbar hide={checked} hide={false} handleChange={handleChange}/>
          <Registration hide={true}submit={submitHandler}/>
        </React.Fragment>
      }
      <Toast open={open} handleClose={handleClose} success={success} message={message} />
    </div>
  );
}
export default withRouter(withWidth()(Home));
