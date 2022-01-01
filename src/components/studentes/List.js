import React,{useEffect, useState} from 'react';
import { Box } from '@mui/system';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { green, orange } from '@mui/material/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { Create, Delete } from '@mui/icons-material';
import axios from 'axios';


const useStyle = makeStyles({
   stuListColor: {
      backgroundColor: orange[400],
      color: 'white'
   },
   tableHeadSell: {
      backgroundColor: green[400],
      color: 'white'
   },

})

const List = () => {
   const classes = useStyle();
   const [students,setStudents]=useState([]);
   useEffect(() => {
     getAllStudents()
   },[])

   async function getAllStudents(){
      try{
         const students = await axios.get("http://localhost:3333/student")
         console.log(students.data)
         setStudents(students.data);
      }catch(error){
         console.log("Wrong")

      }
   };

   const handleDelete = async (id) =>{
         await axios.delete(`http://localhost:3333/student/${id}`);
         const newStudent = students.filter((item)=>{
           return item.id !==id
         })
         setStudents(newStudent)
   }

   return (
      <>
         <Box textAlign="center" p={2} className={classes.stuListColor} mb={2}>
            <Typography variant='h4'>List of Student</Typography>
         </Box>

         <TableContainer>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell align='center' className={classes.tableHeadSell}>No</TableCell>
                     <TableCell align='center' className={classes.tableHeadSell}>Name</TableCell>
                     <TableCell align='center' className={classes.tableHeadSell}>Email</TableCell>
                     <TableCell align='center' className={classes.tableHeadSell}>Action</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {
                     students.map((student,i)=>{
                        return(
                           <TableRow key={i}> 
                           <TableCell align='center'>{i+1}</TableCell>
                           <TableCell align='center'>{student.stuname}</TableCell>
                           <TableCell align='center'>{student.email}</TableCell>
                           <TableCell align='center'>
                              <Tooltip title="view">
                                 <IconButton><Link to={`/view/${student.id}`}><VisibilityIcon color="primary"></VisibilityIcon></Link></IconButton>
                              </Tooltip>
                              <Tooltip title="edit">
                                 <IconButton><Link to={`/edit/${student.id}`}><Create color="primary"></Create></Link></IconButton>
                              </Tooltip>
      
                              <Tooltip title="delete">
                                 <IconButton onClick={()=>handleDelete(student.id)}><Delete color="primary"></Delete></IconButton>
                              </Tooltip>
                           </TableCell>
                        </TableRow>
                        )
                     })
                  }
              
               </TableBody>
            </Table>

         </TableContainer>
      </>
   )
}

export default List
