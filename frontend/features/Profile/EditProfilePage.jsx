import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import {
  Alert,
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import validator from "validator";
import countries from "/common/assets/countries.json";
import { useAuthContext } from "/common/contexts/AuthContext";

export default function EditProfilePage() {
  const {
    user,
    authenticateUser,
    updateUserInfo,
    errorMessage,
    setErrorMessage,
  } = useAuthContext();

  useEffect(() => {
    authenticateUser();
  }, []);

  const [formData, setFormData] = useState({
    username: user.username,
    avatar: user.avatar,
    bio: user.bio || "",
    socialMedia: {
      facebook: user.socialMedia?.facebook || "",
      twitter: user.socialMedia?.twitter || "",
      linkedin: user.socialMedia?.linkedin || "",
    },
    country: user.country || "",
    website: user.website || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSocialMediaChange = (e, platform) => {
    setFormData({
      ...formData,
      socialMedia: {
        ...formData.socialMedia,
        [platform]: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const {
      username,
      bio,
      socialMedia: { facebook, twitter, linkedin },
      country,
      website,
    } = formData;

    if (
      !username ||
      !bio ||
      !facebook ||
      !twitter ||
      !linkedin ||
      !country ||
      !website
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!validator.matches(username, /^[a-zA-Z0-9_.]{6,}$/)) {
      setErrorMessage(
        "Usernames can only use letters, numbers, underscores, periods, and 6 characters long."
      );
      return;
    }

    const foundCountry = countries.find((e) => {
      if (e.label === country) return e;
    });

    if (!foundCountry) {
      setErrorMessage("Please choose a valid country.");
      return;
    }

    if (
      !validator.matches(
        facebook,
        /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9_.-]+\/?$/
      )
    ) {
      setErrorMessage("Please enter a valid facebook url.");
      return;
    }

    if (
      !validator.matches(
        twitter,
        /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9_.-]+\/?$/
      )
    ) {
      setErrorMessage("Please enter a valid twitter url.");
      return;
    }

    if (
      !validator.matches(
        linkedin,
        /^(https?:\/\/)?(www\.)?linkedin.com\/[a-zA-Z0-9_.-]+\/?$/
      )
    ) {
      setErrorMessage("Please enter a valid linkedin url.");
      return;
    }

    if (
      !validator.matches(
        website,
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/
      )
    ) {
      setErrorMessage("Please enter a valid website url.");
      return;
    }
    setErrorMessage(null);
    updateUserInfo(formData);
  };

  if (!user) return "loading...";
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        mt: 1,
        p: 4,
        backgroundColor: "white",
        flexDirection: "column",
        rowGap: "2em",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Avatar
            alt={formData.username}
            src={formData.avatar}
            style={{ width: "5em", height: "5em", objectFit: "cover" }}
          />
          <Input
            type="file"
            id="avatar-upload"
            accept="image/*"
            style={{ display: "none" }}
          />
          <label htmlFor="avatar-upload">
            <IconButton
              component="span"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "white",
                width: "1em",
                height: "1em",
              }}
            >
              <AddToPhotosIcon />
            </IconButton>
          </label>
        </Box>
        <Box>
          <Typography>{user.username}</Typography>
          <Typography>{user.email}</Typography>
        </Box>
      </Box>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        autoComplete="username"
        autoFocus
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={countries}
        value={
          countries.find((option) => option.label === formData.country) || null
        }
        sx={{ margin: ".5em 0" }}
        onChange={(event, newValue) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            country: newValue ? newValue.label : "",
          }));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            name="country"
            label="Country"
            value={formData.country}
          />
        )}
      />

      <TextField
        margin="normal"
        fullWidth
        label="Bio"
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        multiline
        minRows={3}
        sx={{ borderRadius: 4 }}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Facebook"
        name="facebook"
        value={formData.socialMedia.facebook}
        onChange={(e) => handleSocialMediaChange(e, "facebook")}
        sx={{ borderRadius: 4 }}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Twitter"
        name="twitter"
        value={formData.socialMedia.twitter}
        onChange={(e) => handleSocialMediaChange(e, "twitter")}
        sx={{ borderRadius: 4 }}
      />
      <TextField
        margin="normal"
        fullWidth
        label="LinkedIn"
        name="linkedin"
        value={formData.socialMedia.linkedin}
        onChange={(e) => handleSocialMediaChange(e, "linkedin")}
        sx={{ borderRadius: 4 }}
      />

      <TextField
        margin="normal"
        fullWidth
        label="Website"
        name="website"
        value={formData.website}
        onChange={handleChange}
        sx={{ borderRadius: 4 }}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, borderRadius: 4 }}
        >
          <NavLink to="/profile">Cancel</NavLink>
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, borderRadius: 4 }}
        >
          Save
        </Button>
      </Box>
      {errorMessage && (
        <Alert style={{ width: "100%", marginTop: "2em" }} severity="error">
          {errorMessage}
        </Alert>
      )}
    </Box>
  );
}
