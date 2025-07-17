import React, { useEffect, useState } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography,
  TextField,
  Box,
  InputAdornment,
  TableSortLabel,
  TablePagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setMembers } from '../redux/membersSlice';
import { loadUsers } from '../data/userStorage';

type Order = 'asc' | 'desc';

interface Column {
  id: 'username' | 'firstName' | 'lastName' | 'emailId' | 'phoneNumber' | 'dob';
  label: string;
}

const columns: Column[] = [
  { id: 'username', label: 'Username' },
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'emailId', label: 'Email' },
  { id: 'phoneNumber', label: 'Phone' },
  { id: 'dob', label: 'Date of Birth' }
];

const MemberList: React.FC = () => {
  const members = useAppSelector(state => (state as any).members.members);
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [orderBy, setOrderBy] = useState<Column['id']>('username');
  const [order, setOrder] = useState<Order>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const users = loadUsers();
    dispatch(setMembers(users));
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property: Column['id']) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortMembers = (a: any, b: any) => {
    if (order === 'desc') {
      return b[orderBy].localeCompare(a[orderBy]);
    }
    return a[orderBy].localeCompare(b[orderBy]);
  };

  const filteredMembers = members.filter((member: any) => 
    member.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>Member List</Typography>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by username or name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell 
                  key={column.id}
                  align="center"
                  sx={{ fontWeight: 'bold' }}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[...filteredMembers]
              .sort(sortMembers)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((member: any) => (
                <TableRow 
                  key={member.username}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    },
                    '&:nth-of-type(even)': {
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <TableCell align="center">{member.username}</TableCell>
                  <TableCell align="center">{member.firstName}</TableCell>
                  <TableCell align="center">{member.lastName}</TableCell>
                  <TableCell align="center">{member.emailId}</TableCell>
                  <TableCell align="center">{member.phoneNumber}</TableCell>
                  <TableCell align="center">{member.dob}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredMembers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default MemberList;
