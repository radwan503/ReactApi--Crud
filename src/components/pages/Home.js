import React,{useState} from 'react';
import { Box } from '@mui/system';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { deepPurple, green, orange } from '@mui/material/colors';
import List from '../studentes/List';
import axios from 'axios';


const useStyle = makeStyles({
   headingColor:{
      backgroundColor:deepPurple[400],
      color: "white"
   },
   addstudentColor:{
      backgroundColor:green[400],
      color: 'white'
   },

})

const Home = () => {
   const classes = useStyle();
   const [student, setStudent] = useState({
      stuname:"",
      email:""
   })

   const [status, setStatus] = useState()

   const onTextFieldChange = (e) =>{
      setStudent({
         ...student,
         [e.target.name]:e.target.value
      })
      //console.log(student)
   }

   const onFormSubmit = async (e)=>{
      e.preventDefault();
      try {
        await axios.post(`http://localhost:3333/student`,student);
        setStatus(true)
      
      } catch (error) {
         console.log(error)
      }
   }
   
   if(status){
      return <Home/>
   }

   return (
      <>
         <Box textAlign="center" className={classes.headingColor} p={3}>
            <Typography>
               CRUD
            </Typography>
         </Box>

         <Grid container spacing={2} justifyContent="center">
            <Grid item md={6} xs={12}>
               <Box textAlign="center" p={2} className={classes.addstudentColor} mb={2}>
                  <Typography variant='h4'>Add Student</Typography>
               </Box>
               <form noValidate>
                     <Grid container spacing={2} pl={2}>
                        <Grid item xs={12}>
                           <TextField autoComplete="stuname" name="stuname" variant="outlined" required fullWidth id="stuname" label="Name" onChange={e=>onTextFieldChange(e)} autoFocus>
                           </TextField>
                        </Grid>
                        
                        <Grid item xs={12}>
                           <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email" onChange={e=>onTextFieldChange(e)} autoFocus>
                           </TextField>
                        </Grid>

                        <Box m={2}>
                           <Button type="submit" variant="contained" color="primary" size="large" fullWidth onClick={e => onFormSubmit(e)}>Add</Button>
                        </Box>

                        
                     </Grid>
                  </form>
            </Grid>
            <Grid item md={6} xs={12}>
               <List></List>
            </Grid>
         </Grid>
        
      </>
   )
}

export default Home
