import ClassSearch from '@fe/components/class/classSearch'
import ClassTable from '@fe/components/class/classTable'
import useclassList from '@fe/hooks/use-query/use-class/useclassList'
import useclassSearch from '@fe/hooks/use-query/use-class/useclassSearch';
import { Box, Typography } from '@mui/material'

const TEXT = {
  CLASS: 'Class'
}

export function Class() {
  const {
    searchClassesQuery,
    state: {
      search: { searchKey, setSearchKey }
    }
  } = useclassSearch();
  const _ = useclassList();

  return (
    <Box>
      <Typography>{TEXT.CLASS}</Typography>
      <Box padding={1}>
        <ClassSearch />
        <ClassTable data={searchClassesQuery} />
      </Box>
    </Box>
  )
}
  


  

