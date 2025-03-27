// frontend/common/pages/Error/index.jsx
import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useErrorContext } from "/features/Error/context";
import { PageLayout, PageCard } from "/common/components";

export function ErrorPage({ error }) {
  const navigate = useNavigate();
  const { clearError } = useErrorContext();

  useEffect(() => {
    if (error) {
      console.error("[Error Detected]", {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      });
    }
    return () => clearError();
  }, [error]);

  const handleRetry = () => {
    clearError();
    navigate(-1);
  };

  return (
    <PageLayout>
      <PageCard>
        <Box
          sx={{
            textAlign: "center",
            padding: "2em",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body1" color="error" paragraph>
            {error?.message || "An unexpected error occurred"}
          </Typography>
          {import.meta.env.NODE_ENV === "development" && (
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {error?.stack}
            </Typography>
          )}
          <Box sx={{ mt: 4 }}>
            <Button onClick={handleRetry} variant="contained" sx={{ mr: 2 }}>
              Try Again
            </Button>
            <Button onClick={() => navigate("/")} variant="outlined">
              Go Home
            </Button>
          </Box>
        </Box>
      </PageCard>
    </PageLayout>
  );
}
