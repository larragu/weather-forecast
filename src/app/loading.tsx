import { CircularProgress, Box } from "@mui/material";

const Loading = () => {
  return (
    <Box display="flex" width="100%" justifyContent="center" marginTop={4}>
      <CircularProgress size={100} />
    </Box>
  );
};

export default Loading;
