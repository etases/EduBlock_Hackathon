import { Table } from '@fe/components'
import { useDebounce } from '@fe/hooks'
import { useClassQuery } from '@fe/hooks/use-query'
import { Box, Stack, TextField, Typography } from '@mui/material'
import { GridColDef, GridRowsProp } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'

const TEXT = {
  CLASS: 'Class'
}


const columns: GridColDef[] = [
  {
    field: 'classId',
    headerName: 'ClassId',
    editable: false
  },
  {
    field: 'className',
    headerName: 'Class Name',
    editable: false
  },
  {
    field: 'grade',
    headerName: 'Grade'
  },
  {
    field: 'teacher',
    headerName: 'Teacher'
  },
  {
    field: 'year',
    headerName: 'Year'
  }
]

export function Class() {

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)


  const {
    queryResult,
    state: {
      apiData: {
        classes: { classes },
      },
      queryOptions: {
        search: { setSearch, search }
      } }
  } = useClassQuery({
    initialProps: {
      page: page,
      pageSize: pageSize,
      search: null
    },
  })

  const { debouncedValue: searchDebounced } = useDebounce({
    value: search,
    delay: 1000
  })


  const rows: GridRowsProp = classes.map((_, rowIndex) => ({
    id: rowIndex,
    ...columns.reduce((prev, curr) => {
      return {
        ...prev,
        [curr.field]: `${curr.headerName}__${rowIndex}`
      }
    }, {})
  }))

  useEffect(() => {
    console.log(searchDebounced)
    queryResult.refetch()
  }, [searchDebounced])

  return (
    <Stack height={'100%'}>

      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} padding={1}>
        <TextField
          id="search-class"
          variant='outlined'
          label="Year"
          value={search || ''}
          onChange={(e) => { setSearch(e.target.value || ''); setPage(0) }}
          fullWidth={false}
          sx={{ width: '30%' }} />
      </Stack>

      <Table
        columns={columns}
        rows={rows}
        loading={false}
        rowCount={rows?.length}
        page={{
          page: page,
          setPage(page) {
            setPage(page)
          }
        }}
        pageSize={{
          pageSize: pageSize,
          setPageSize(size) {
            setPageSize(size)
          }
        }}
        sort={{
          onSortModelChange(gridSortModel) {
            // set query here
          }
        }}
        filter={{
          onFilterModelChange(gridFilterModel) {
            // set query here
          }
        }}
      />

    </Stack>
  )
}
