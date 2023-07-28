import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import{ Button,Pagination,Stack,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TextField} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'

import axios from 'axios';
import { fetchUsers } from '../store/reducer';

 const Home = () => {
    const [hitPage, setHitPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] =useState(0)
    const navigate = useNavigate();
    
    const data = useSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchUsers(currentPage))
   
    }, [dispatch,currentPage])

    const changePage = (event, value) => {
        setCurrentPage(value - 1)
                                       //Display current page
    }
    const handleClick = (ele) => {
        navigate('./details', { state: { ele } })
    }

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    }

    return ( <>

        <h1 data-testid="home-heading">Pagination</h1>
        <TextField id="filled-basic" label="Search by Title" variant="filled" onChange={handleSearchChange} />

{
  ( !data.loading && <TableContainer sx={{ my: 5, mx: "auto", width: 700 }}>
    <Table sx={{ width: 680, mx: "auto" }} aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell>CREATE AT</TableCell>
                <TableCell>TITLE</TableCell>
                <TableCell>AUTHOR</TableCell>
                <TableCell>URL</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
               !data.loading && data?.users?.hits?.map((ele) => {
                        return <TableRow key={ele.objectID} style={{cursor:"pointer"}} onClick={() => handleClick(ele)}>
                            <TableCell >{ele.created_at}</TableCell>
                            <TableCell >{ele.title}</TableCell>
                            <TableCell >{ele.author}</TableCell>
                            <TableCell>{ele.url}</TableCell>
                        </TableRow>
                    })
            }
        </TableBody>
    </Table>
</TableContainer>)
}
{ console.log( data?.users)}
{
    !data.loading  && (<Stack spacing={2} sx={{ my: 2, position: 'fixed', bottom: 0, bgcolor: 'warning.main', mx: 10 }}>
    <Pagination count={data?.users?.nbPages} page={currentPage + 1} onChange={changePage} color="primary" sx={{ mx: "auto", fontSize: 30 }} />
    {/* display current page with all page count */}
</Stack>)
}
        
    </>)
}
export default Home