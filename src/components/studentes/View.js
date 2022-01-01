import React,{useState,useEffect} from 'react';
import { Box } from '@mui/system';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { green, orange } from '@mui/material/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link,useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

const useStyle = makeStyles({
   stuListColor: {
      backgroundColor: orange[400],
      color: 'white'
   },
   tableHeadSell: {
      backgroundColor: green[400],
      color: 'white',
      fontWeight:'bold',
      fontSize:16

   },

})

const View = () => {
  const classes = useStyle();
  const {id} = useParams()
  const [student, setStudent] = useState([])
  const history = useNavigate();
  useEffect(() => {
   viewStudetntDetails()
  },[id])
  
  async function viewStudetntDetails(){
     try{
      const student = await axios.get(`http://localhost:3333/student/${id}`)
      console.log(student.data)
      setStudent(student.data)
     }catch(error){
        console.log(error)

     }
  }

  function handleClick(){
   history("/")
  }

   return (
      <>
         <Box textAlign="center" p={2} className={classes.stuListColor} >
            <Typography variant='h4'>Student Details</Typography>
         </Box>

         <TableContainer >
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell align='center' className={classes.tableHeadSell}>No</TableCell>
                     <TableCell align='center' className={classes.tableHeadSell}>Name</TableCell>
                     <TableCell align='center' className={classes.tableHeadSell}>Email</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  <TableRow>
                     <TableCell align='center'>{student.id}</TableCell>
                     <TableCell align='center'>{student.stuname}</TableCell>
                     <TableCell align='center'>{student.email}</TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </TableContainer>
         <Box m={2} textAlign="center">
            <Button type="submit" variant="contained" color="primary" size="large" onClick={handleClick}>Back TO Home</Button>
         </Box>
      </>
   )
}

export default View
