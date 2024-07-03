import React, { useEffect, useRef, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { FormUser } from "../types/types";
import {
  Avatar,
  InputLabel,
  Menu,
  MenuItem,
  TextField,
  alpha,
  styled,
} from "@mui/material";

interface UserImageInputProps {
  label: string;
  name: string;
  setUser: React.Dispatch<React.SetStateAction<FormUser | null>>;
  defaultImage: string;
  required: boolean;
}

const StyledImageInput = styled(InputLabel)(({ theme }) => ({
  position: "relative",
  overflow: "visible",
  marginTop: 20,
  border: "1px solid",
  borderColor:
    theme.palette.mode === "dark" ? alpha("#fff", 0.2) : alpha("#000", 0.2),
  borderRadius: "50rem",
  display: "inline-block",
  textAlign: "center",
  cursor: "pointer",
  width: "8.125rem",
  height: "8.125rem",
  zIndex: 10,
  ":hover": {
    borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
  },
}));

export default function UserImageInput({
  label,
  name,
  setUser,
  defaultImage,
  required,
}: UserImageInputProps) {
  const [bgImage, setBgImage] = useState<string | ArrayBuffer | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setUser((prevUser) => ({
      ...prevUser!,
      [name]: target.files[0],
    }));
    changeBgImage(target.files[0]);
    setAnchorEl(null);
  };

  const changeBgImage = (image: File | undefined) => {
    if (!image) return;

    const reader = new FileReader();

    reader.onload = () => {
      setBgImage(reader.result);
    };

    reader.readAsDataURL(image);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleMenuItemClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoRemove = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setUser((prevUser) => ({
      ...prevUser!,
      [name]: "",
    }));
    setBgImage(null);
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuItemClick} key={"btnUploadPhoto"}>
        Nova Foto
        <TextField
          type="file"
          name={name}
          required={required}
          inputRef={fileInputRef}
          inputProps={{
            accept: "image/*",
            onChange: handleOnChange,
          }}
          sx={{
            display: "none",
          }}
        />
      </MenuItem>
      <MenuItem onClick={handlePhotoRemove}>Remover Foto</MenuItem>
    </Menu>
  );

  useEffect(() => setBgImage(defaultImage), []);

  return (
    <>
      <StyledImageInput onClick={handleMenuOpen}>
        <InputLabel
          sx={{
            position: "absolute",
            top: -22,
            left: "50%",
            transform: "translateX(-50%)",
            color: "inherit",
          }}
        >
          {label}
        </InputLabel>
        {bgImage ? (
          <Avatar
            src={bgImage ? (bgImage as string) : ""}
            onError={() => console.log("Erro na profile picture")}
            sx={{
              width: "8rem",
              height: "8rem",
            }}
          />
        ) : (
          <AddPhotoAlternateIcon
            fontSize="large"
            sx={{
              marginBlock: "35%",
            }}
          />
        )}
        {renderMenu}
      </StyledImageInput>
    </>
  );
}
