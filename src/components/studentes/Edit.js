import React,{useState,useEffect} from 'react';
import { Box } from '@mui/system';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { deepPurple, green, orange } from '@mui/material/colors';
import List from '../studentes/List';
import { useNavigate ,useParams} from 'react-router-dom';
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

const Edit = () => {
   const classes = useStyle();
   const {id} = useParams();
   const history = useNavigate();
   const [student, setStudent] = useState({
      stuname:"",
      email:""
   })

   useEffect(() => {
      getStudent()
   }, [id])

   const getStudent = async() =>{
      try {
         const student = await axios.get(`http://localhost:3333/student/${id}`)
         setStudent(student.data)
      } catch (error) {
         console.log(error)
      }
   }

   const onTextFieldChange = (e) =>{
      setStudent({
         ...student,
         [e.target.name]: e.target.value
      })
   }

   const onFormUpdate=async (e)=>{
      e.preventDefault()
      try {
        await axios.put(`http://localhost:3333/student/${id}`,student);
        history("/")
      } catch (error) {
         console.log(error)
      }
     
   }
 
   const handleClick =()=>{
      history("/")
   }


   return (
      <>
         <Box textAlign="center" className={classes.headingColor} p={3}>
            <Typography>
               CRUD
            </Typography>
         </Box>
         <Box textAlign="center" p={2} className={classes.addstudentColor} mb={2}>
                  <Typography variant='h4'>Edit Student</Typography>
               </Box>

         <Grid container spacing={2} justifyContent="center">
            <Grid item md={6} xs={12}>
               <form noValidate>
                     <Grid container spacing={2}>
                        <Grid item xs={6}>
                           <TextField autoComplete="id" label="Id" name="id" variant="outlined" fullWidth id="id" value={id} disabled>
                           </TextField>
                        </Grid>

                        <Grid item xs={6}>
                           <TextField autoComplete="stuname" name="stuname" variant="outlined" required fullWidth id="stuname" label="Name" value={student.stuname} onChange={e=>onTextFieldChange(e)} autoFocus>
                           </TextField>
                        </Grid>
                        
                        <Grid item xs={12}>
                           <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email" value={student.email} onChange={e=>onTextFieldChange(e)} autoFocus>
                           </TextField>
                        </Grid>

                        <Box m={2}>
                           <Button type="submit" variant="contained" color="primary" size="large" fullWidth onClick={e=>onFormUpdate(e)}>update</Button>
                        </Box>
                        
                     </Grid>
                  </form>

                  <Box m={2} textAlign="center">
                     <Button type="submit" variant="contained" color="primary" size="large" onClick={handleClick}>Back TO Home</Button>
                  </Box>
            </Grid>
         </Grid>

      </>
   )
}

export default Edit
