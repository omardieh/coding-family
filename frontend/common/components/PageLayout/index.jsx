import { Box } from "@mui/material";

export const PageLayout = ({ children, ...props }) => {
  const { sx, ...otherProps } = props;
  return (
    <>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          top: "4em",
          ...sx,
        }}
        {...otherProps}
      >
        {children}
      </Box>
    </>
  );
};
