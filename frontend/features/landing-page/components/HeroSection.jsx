import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { breakpoints } from "/common/assets/breakpoints";
import { useAuthContext } from "../../auth-flow/context";

const { mob, tab } = breakpoints;

const HeroContainer = styled.section`
  width: 100%;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2em;
  background: ${({ theme }) => theme.colors?.white?.bg?.light};
`;

const HeroContentWrapper = styled.div`
  max-width: 1200px;
  width: 90%;

  @media ${mob}, ${tab} {
    width: 95%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1em;
  margin-top: 2em;
  justify-content: center;

  @media ${mob} {
    flex-direction: column;
    align-items: center;
  }
`;

export function HeroSection() {
  const { isLoggedIn } = useAuthContext();

  return (
    <HeroContainer>
      <HeroContentWrapper>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
            fontWeight: "bold",
            mb: 2,
            background: "linear-gradient(45deg, #2563eb 30%, #1e40af 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome to Coding Family
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mb: 4,
            color: "text.secondary",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          Join our community of developers sharing knowledge through interactive
          tutorials
        </Typography>

        <ButtonGroup>
          {!isLoggedIn ? (
            <>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  minWidth: "200px",
                  py: 1.5,
                }}
              >
                Get Started
              </Button>
              <Button
                component={Link}
                to="/tutorials"
                variant="outlined"
                size="large"
                sx={{
                  minWidth: "200px",
                  py: 1.5,
                }}
              >
                Browse Tutorials
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/tutorials/create"
              variant="contained"
              size="large"
              sx={{
                minWidth: "200px",
                py: 1.5,
              }}
            >
              Create Tutorial
            </Button>
          )}
        </ButtonGroup>
      </HeroContentWrapper>
    </HeroContainer>
  );
}
