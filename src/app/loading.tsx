import { CircularProgress, Box } from "@mui/material";

const Loading = () => {
  return (
    <Box display="flex" width="100%" justifyContent="center">
      <CircularProgress size={100} />
    </Box>
  );
};

export default Loading;
