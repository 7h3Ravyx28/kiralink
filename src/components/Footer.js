import React from "react";
import { Box, Typography, IconButton, Link, Stack } from "@mui/material";
import { FaTwitter, FaFacebook, FaEnvelope } from "react-icons/fa";
import { styled } from "@mui/system";
import Logo from "../assets/kiralogo.jpg";

// Styled container
const FooterContainer = styled(Box)({
  backgroundColor: "#ffffff",
  padding: "40px 20px",
  borderTop: "1px solid #e0e0e0",
  fontFamily: "'Rajdhani', sans-serif",
  textAlign: "center",
});

const LogoText = styled("span")({
  fontSize: "24px",
  fontWeight: "700",
  display: "inline-block",
});

const GreenText = styled("span")({
  color: "#0D8F6C",
});

const BlackText = styled("span")({
  color: "#000000",
});

const Footer = () => {
  return (
    <FooterContainer>
      <Stack alignItems="center" spacing={2}>
        {/* Logo and name */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            component="img"
            src={Logo}
            alt="Kiralink Logo"
            sx={{ width: 50, height: 50, borderRadius: "50%" }}
          />
          <LogoText>
            <GreenText>KIRA</GreenText>
            <BlackText>LINK</BlackText>
          </LogoText>
        </Stack>

        {/* Info */}
        <Typography color="text.secondary" maxWidth={500}>
          We help landlords easily track rent payments and automatically
          remind tenants before due dates via email.
        </Typography>

        {/* Social Icons */}
        <Stack direction="row" spacing={1.5}>
          <IconButton href="https://twitter.com" target="_blank">
            <FaTwitter color="#4a4a4a" />
          </IconButton>
          <IconButton href="https://facebook.com" target="_blank">
            <FaFacebook color="#4a4a4a" />
          </IconButton>
          <IconButton href="mailto:support@kiralink.com">
            <FaEnvelope color="#4a4a4a" />
          </IconButton>
        </Stack>

        {/* Pages */}
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Pages
          </Typography>
          <Stack spacing={1} direction="row" justifyContent="center" flexWrap="wrap">
            <Link href="/features" underline="hover" color="text.secondary" sx={{ mx: 1 }}>
              Features
            </Link>
            <Link href="/pricing" underline="hover" color="text.secondary" sx={{ mx: 1 }}>
              Pricing
            </Link>
            <Link href="/contact" underline="hover" color="text.secondary" sx={{ mx: 1 }}>
              Contact
            </Link>
          </Stack>
        </Box>

        {/* Bottom copyright */}
        <Box mt={4} color="text.disabled">
          © {new Date().getFullYear()} Kiralink. All rights reserved.
        </Box>
      </Stack>
    </FooterContainer>
  );
};

export default Footer;
