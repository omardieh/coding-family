import { Box } from "@mui/material";

export const PageCard = ({ children, ...props }) => {
  const { sx, ...otherProps } = props;
  return (
    <>
      <Box
        name="PageCard"
        component="div"
        sx={{
          background: (theme) => theme.colors.white.mid,
          margin: "auto",
          marginTop: "8em",
          maxWidth: "1200px",
          padding: "2em",
          borderRadius: "14px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease",
          ...sx,
        }}
        {...otherProps}
      >
        {children}
      </Box>
    </>
  );
};
