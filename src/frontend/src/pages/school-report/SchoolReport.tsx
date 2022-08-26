import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  Card,
  CardMedia,
  styled,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import { Img, Table } from "@fe/components";
import back from "./images/Back.png";
import edit from "./images/Edit.png";
import avt from "./images/AVT.png";
// import { useMediaQuery } from "react-responsive";
import { GridColDef, GridRowsProp, DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";


const navigate = useNavigate();

    const handleClick = () => {
        navigate("...");
    }

const columns: GridColDef[] = [
  { field: "id", headerName: "Môn học", width: 250 },
  {
    field: "HK1",
    headerName: "Học kỳ 1",
    type: "number",
    width: 120,
    editable: true
  },
  {
    field: "HK2",
    headerName: "Học kỳ 2",
    type: "number",
    width: 120,
    editable: true
  },
  {
    field: "CN",
    headerName: "Cả năm",
    type: "number",
    width: 120,
    editable: true
  }
];

// replace Array.from(Array(10)) with data from API, use rowId from API instead of rowIndex
const rows: GridRowsProp = Array.from(Array(10)).map((_, rowIndex) => ({
  id: rowIndex,
  ...columns.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.field]: `${curr.headerName}__${rowIndex}`
    };
  }, {})
}));

// const rows = [
//   { id: "Toán", HK1: 1, HK2: 7, CN: 35 },
//   { id: "Vật Lí", HK1: 2, HK2: 6, CN: 45 },
//   { id: "Sinh học", HK1: 4, HK2: 5, CN: 16 },
//   { id: "Tin học", HK1: 5, HK2: 5, CN: 12 },
//   { id: "Ngữ Văn", HK1: 6, HK2: 3, CN: 150 },
//   { id: "Lịch sử", HK1: 6, HK2: 5, CN: 44 },
//   { id: "Địa lí", HK1: 2, HK2: 6, CN: 36 },
//   { id: "Ngoại ngữ (Tiếng Anh)", HK1: 1, HK2: 6, CN: 65 },
//   { id: "Giáo dục công dân", HK1: 3, HK2: 5, CN: 65 },
//   { id: "Công nghệ", HK1: 8, HK2: 1, CN: 65 },
//   { id: "Thể dục", HK1: 7, HK2: 3, CN: 65 },
//   { id: "Giáo dục Quốc phòng - An ninh", HK1: 8, HK2: 6, CN: 65 },
//   { id: "Tự chọn (...)", HK1: 9, HK2: 4, CN: 65 },
//   { id: "DTB các môn", HK1: 1, HK2: 5, CN: 65 }
// ];

// const columns = [
//   {
//     field: 'name',
//     headerName: 'Name',
//     editable: true
//   },
//   {
//     field: 'address',
//     headerName: 'Address',
//     editable: true
//   }
// ]

const viewportContext = React.createContext({});

const ViewportProvider = ({ children }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

const useViewport = () => {
  const { width, height } = React.useContext(viewportContext);
  return { width, height };
};

const MobileComponent = () => (
  <p>
    <Box
      className={"main"}
      display={"grid"}
      width={"100%"}
      height={"100vh"}
      bgcolor={"#a8a6fe"}
      color={"#fff"}
      // gridTemplateAreas={`"Info Table"`}
      // gridTemplateColumns={"40% 60%"}
      fontFamily={"Poppins"}
    >
      {/* INFO SIDE gridArea={"Info"}*/}
      <Box bgcolor={"#fff"}>
        <Stack
          direction="column"
          justifyContent="space-evenly"
          alignItems="stretch"
          spacing={0.5}
        >
          {/* EDUBLOCK */}
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            height={"20vh"}
            bgcolor={"#a8a6fe"}
          >
            {/* <p> */}
            {/* <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
            <Typography
              fontSize={"7rem"}
              style={{ fontWeight: "bold" }}
              height={"10%"}
            >
              {"Edu"}
            </Typography> */}
            <Typography
              fontSize={"6rem"}
              style={{ fontWeight: "bold" }}
              color={"#706cb4"}
              height={"60%"}
            >
              {"EduBlock"}
            </Typography>
            {/* </Stack> */}
            {/* </p> */}

            <Typography fontSize="1.5rem" height={"40%"}>
              Học bạ điện tử BlockChain
            </Typography>
          </Stack>
          {/* 2 BUTTONS */}
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="baseline"
            spacing={0.5}
          >
            <Button  onClick={handleClick}
              borderRadius={5}
              sx={{
                background: "#c0c4c4",
                color: "white",
                textTransform: "initial",
                width: "160px"
              }}
            >
              <Typography fontSize="1rem" variant={"subtitle2"}>
                {"Trở lại"} &emsp;&emsp;
              </Typography>
              <Box component={Img} src={back} height={"25px"}></Box>
            </Button>
            <Button
              sx={{
                background: "#f89c14",
                color: "white",
                textTransform: "initial",
                width: "160px"
              }}
            >
              <Typography fontSize="1rem" variant={"subtitle2"}>
                {"Sửa"} &emsp;&emsp;&emsp;
              </Typography>
              <Box component={Img} src={edit} height={"25px"}></Box>
            </Button>
          </Stack>

          {/* 1 AVATAR and 2 INPUT */}
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="baseline"
            spacing={0.5}
            height={"350px"}
            width={"100%"}
            paddingTop={"20px"}
          >
            <Card
              sx={{ display: "flex" }}
              style={{ border: "none", boxShadow: "none" }}
            >
              <Box
                paddingTop={"10%"}
                component={Img}
                src={avt}
                height={"20%"}
                width={"45%"}
              ></Box>
              <Stack
                direction="column"
                justifyContent="space-evenly"
                alignItems="stretch"
                spacing={0.5}
                width={"60vh"}
                paddingTop={"25%"}
                paddingLeft={"10%"}
              >
                <TextField
                  //error
                  id="outlined-error-helper-text"
                  label="Họ và Tên"
                  defaultValue="Nguyễn Văn A"
                  helperText="Incorrect entry."
                />
                {/* <TextField
          //error
          id="outlined-error-helper-text"
          label="Giới tính"
          defaultValue="Nam"
          helperText="Incorrect entry."
        /> */}
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Card>
          </Stack>

          {/* 8 INPUTS */}
          <Stack
            direction="column"
            justifyContent="space-evenly"
            alignItems="stretch"
            spacing={0.5}
            height={"330px"}
            width={"100%"}
          >
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="baseline"
              spacing={0.5}
            >
              <TextField
                //error
                id="outlined-error-helper-text"
                label="Nơi Sinh"
                defaultValue="XX - YY - Cần Thơ"
                helperText="Incorrect entry."
              />
              <TextField
                //error
                id="outlined-error-helper-text"
                label="Ngày Sinh"
                defaultValue="11/02/2001"
                helperText="Incorrect entry."
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="baseline"
              spacing={0.5}
            >
              <TextField
                //error
                id="outlined-error-helper-text"
                label="Họ và Tên mẹ"
                defaultValue="Nguyễn Thị B"
                helperText="Incorrect entry."
              />
              <TextField
                //error
                id="outlined-error-helper-text"
                label="Dân tộc"
                defaultValue="Kinh"
                helperText="Incorrect entry."
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="baseline"
              spacing={0.5}
            >
              <TextField
                //error
                id="outlined-error-helper-text"
                label="Họ và Tên cha"
                defaultValue="Trần Văn C"
                helperText="Incorrect entry."
              />
              <TextField
                //error
                id="outlined-error-helper-text"
                label="Chỗ ở hiện tại"
                defaultValue="Cần Thơ"
                helperText="Incorrect entry."
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {/* TABLE SIDE gridArea={"Table"}*/}
      <Box>
        <Stack
          direction="column"
          justifyContent="space-around"
          alignItems="stretch"
          spacing={0.5}
          height={"100vh"}
        >
          <Stack
            direction="column"
            justifyContent="space-evenly"
            alignItems="stretch"
            spacing={0}
          >
            {/* 2 BUTTONS */}
            <Stack
              direction="column"
              justifyContent="space-around"
              alignItems="stretch"
              spacing={0.5}
              height={"5vh"}
              bgcolor="#fff"
            >
              <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={2}
              >
                <Button
                  sx={{
                    background: "#f89c14",
                    color: "white",
                    textTransform: "initial",
                    width: "160px",
                    alignContent: "flex-start"
                  }}
                >
                  <Typography fontSize="1rem" variant={"subtitle2"}>
                    {"Sửa"}
                  </Typography>
                </Button>
                <Button
                  sx={{
                    background: "#f89c14",
                    color: "white",
                    textTransform: "initial",
                    width: "50px",
                    alignContent: "flex-end"
                  }}
                >
                  <Typography fontSize="1rem" variant={"subtitle2"}>
                    {"Sửa"}
                  </Typography>
                </Button>
              </Stack>
            </Stack>

            {/* TABLE */}
            <Stack
              direction="column"
              justifyContent="space-around"
              alignItems="stretch"
              spacing={0.5}
              height={"75vh"}
              bgcolor="#fff"
              paddingBottom={"35px"}
            >
              {/* TEMP TABLE */}
              {/* <div style={{ height: "100%", width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  hide={false}
                  disableSelectionOnClick
                  hideFooter={true}
                  autoHeight
                />
              </div> */}

              <Stack height={"100%"}>
                <Table
                  columns={columns}
                  rows={rows}
                  loading={false}
                  rowCount={rows.length}
                  page={{
                    page: 0,
                    setPage(page) {
                      // set page for query
                    }
                  }}
                  pageSize={{
                    pageSize: 15,
                    setPageSize(size) {
                      // set page size for query
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
                  hide={false}
                  hideFooter
                  autoHeight
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  </p>
);
const DesktopComponent = () => (
  <Box
    className={"main"}
    display={"grid"}
    width={"100%"}
    height={"100vh"}
    bgcolor={"#a8a6fe"}
    color={"#fff"}
    gridTemplateAreas={`"Info Table"`}
    gridTemplateColumns={"50% 50%"}
    fontFamily={"Poppins"}
  >
    {/* <Helmet>
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        </Helmet> */}
    {/* INFO SIDE */}
    <Box gridArea={"Info"} bgcolor={"#fff"}>
      <Stack
        direction="column"
        justifyContent="space-evenly"
        alignItems="stretch"
        spacing={0.5}
      >
        {/* 2 BUTTONS */}
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="baseline"
          spacing={0.5}
        >
          <Button onClick={handleClick}
            borderRadius={5}
            sx={{
              background: "#c0c4c4",
              color: "white",
              textTransform: "initial",
              width: "160px"
            }}
          >
            <Typography fontSize="1rem" variant={"subtitle2"}>
              {"Trở lại"} &emsp;&emsp;
            </Typography>
            <Box component={Img} src={back} height={"25px"}></Box>
          </Button>
          <Button
            sx={{
              background: "#f89c14",
              color: "white",
              textTransform: "initial",
              width: "160px"
            }}
          >
            <Typography fontSize="1rem" variant={"subtitle2"}>
              {"Sửa"} &emsp;&emsp;&emsp;
            </Typography>
            <Box component={Img} src={edit} height={"25px"}></Box>
          </Button>
        </Stack>

        {/* 1 AVATAR and 2 INPUT */}
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="baseline"
          spacing={0.5}
          height={"350px"}
          width={"100%"}
          paddingTop={"20px"}
        >
          <Card
            sx={{ display: "flex" }}
            style={{ border: "none", boxShadow: "none" }}
          >
            <Box component={Img} src={avt} height={"20%"} width={"45%"}></Box>
            <Stack
              direction="column"
              justifyContent="space-evenly"
              alignItems="stretch"
              spacing={0.5}
              width={"55%"}
              paddingTop={"25%"}
              paddingLeft={"10%"}
            >
              <TextField
                //error
                id="outlined-error-helper-text"
                label="Họ và Tên"
                defaultValue="Nguyễn Văn A"
                helperText="Incorrect entry."
              />
              {/* <TextField
        //error
        id="outlined-error-helper-text"
        label="Giới tính"
        defaultValue="Nam"
        helperText="Incorrect entry."
      /> */}
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Card>
        </Stack>

        {/* 8 INPUTS */}
        <Stack
          direction="column"
          justifyContent="space-evenly"
          alignItems="stretch"
          spacing={0.5}
          height={"330px"}
          width={"100%"}
        >
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="baseline"
            spacing={0.5}
          >
            <TextField
              //error
              id="outlined-error-helper-text"
              label="Nơi Sinh"
              defaultValue="XX - YY - Cần Thơ"
              helperText="Incorrect entry."
            />
            <TextField
              //error
              id="outlined-error-helper-text"
              label="Ngày Sinh"
              defaultValue="11/02/2001"
              helperText="Incorrect entry."
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="baseline"
            spacing={0.5}
          >
            <TextField
              //error
              id="outlined-error-helper-text"
              label="Họ và Tên mẹ"
              defaultValue="Nguyễn Thị B"
              helperText="Incorrect entry."
            />
            <TextField
              //error
              id="outlined-error-helper-text"
              label="Dân tộc"
              defaultValue="Kinh"
              helperText="Incorrect entry."
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="baseline"
            spacing={0.5}
          >
            <TextField
              //error
              id="outlined-error-helper-text"
              label="Họ và Tên cha"
              defaultValue="Trần Văn C"
              helperText="Incorrect entry."
            />
            <TextField
              //error
              id="outlined-error-helper-text"
              label="Chỗ ở hiện tại"
              defaultValue="Cần Thơ"
              helperText="Incorrect entry."
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>

    {/* TABLE SIDE */}
    <Box gridArea={"Table"}>
      <Stack
        direction="column"
        justifyContent="space-around"
        alignItems="stretch"
        spacing={0.5}
        height={"100vh"}
      >
        {/* EDUBLOCK */}
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          height={"20vh"}
        >
          <p>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={0}
            >
              <Typography
                fontSize={"7rem"}
                style={{ fontWeight: "bold" }}
                height={"10%"}
              >
                {"Edu"}
              </Typography>
              <Typography
                fontSize={"7rem"}
                style={{ fontWeight: "bold" }}
                height={"10%"}
                color={"#706cb4"}
              >
                {"Block"}
              </Typography>
            </Stack>
          </p>

          {/* <Typography fontSize="1.5rem">Học bạ điện tử BlockChain</Typography> */}
        </Stack>

        <Stack
          direction="column"
          justifyContent="space-evenly"
          alignItems="stretch"
          height="80vh"
          spacing={0}
        >
          {/* 2 BUTTONS */}
          <Stack
            direction="column"
            justifyContent="space-around"
            alignItems="stretch"
            spacing={0.5}
            height={"10vh"}
            bgcolor="#fff"
          >
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              spacing={2}
            >
              <Button
                sx={{
                  background: "#f89c14",
                  color: "white",
                  textTransform: "initial",
                  width: "160px",
                  alignContent: "flex-start"
                }}
              >
                <Typography fontSize="1rem" variant={"subtitle2"}>
                  {"Sửa"}
                </Typography>
              </Button>
              <Button
                sx={{
                  background: "#f89c14",
                  color: "white",
                  textTransform: "initial",
                  width: "50px",
                  alignContent: "flex-end"
                }}
              >
                <Typography fontSize="1rem" variant={"subtitle2"}>
                  {"Sửa"}
                </Typography>
              </Button>
            </Stack>
          </Stack>

          {/* TABLE */}
          <Stack
            direction="column"
            justifyContent="space-around"
            alignItems="stretch"
            spacing={0.5}
            height={"90vh"}
            bgcolor="#fff"
            paddingBottom={"35px"}
          >
            {/* TEMP TABLE */}
            {/* <div style={{ height: "100%", width: "100%" }} component={DataGrid}>
               <DataGrid
                rows={rows}
                columns={columns}
                hide={false}
                // pageSize={11}
                // rowsPerPageOptions={[11]}
                // checkboxSelection
                disableSelectionOnClick
                hideFooter
                autoHeight
              /> 
            </div> */}
            <Stack height={"100%"}>
              <Table
                columns={columns}
                rows={rows}
                loading={false}
                rowCount={rows.length}
                page={{
                  page: 0,
                  setPage(page) {
                    // set page for query
                  }
                }}
                pageSize={{
                  pageSize: 15,
                  setPageSize(size) {
                    // set page size for query
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
                hide={false}
                hideFooter
                autoHeight
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  </Box>
);
const MyComponent = () => {
  const { width } = useViewport();
  const breakpoint = 620;

  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
};

export default function SchoolReport() {
  return (
    <ViewportProvider>
      <MyComponent />
    </ViewportProvider>
  );
}
