import { useCallback, useState } from "react";
import { Button, Card, Box, styled } from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { H1, H6 } from "../../src/components/Typography";
import BazaarImage from "../../src/components/BazaarImage";
import BazaarTextField from "../../src/components/BazaarTextField";
import SocialButtons from "../../src/pages-sections/sessions/SocialButtons";
import EyeToggleButton from "../../src/pages-sections/sessions/EyeToggleButton";
import { FlexBox, FlexRowCenter } from "../../src/components/flex-box";
import { useLoginMutation } from "app/features/Auth/authApiSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { credentials } from "app/features/Auth/authSlice";
const fbStyle = {
  background: "#3B5998",
  color: "white",
};
const googleStyle = {
  background: "#4285F4",
  color: "white",
};
export const Wrapper = styled(({ children, passwordVisibility, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme, passwordVisibility }) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  ".passwordEye": {
    color: passwordVisibility
      ? theme.palette.grey[600]
      : theme.palette.grey[400],
  },
  ".facebookButton": {
    marginBottom: 10,
    ...fbStyle,
    "&:hover": fbStyle,
  },
  ".googleButton": {
    ...googleStyle,
    "&:hover": googleStyle,
  },
  ".agreement": {
    marginTop: 12,
    marginBottom: 24,
  },
}));
const Index = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loginUser] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);
  const handleFormSubmit = async (values) => {
    try {
      const response = await loginUser({ ...values }).unwrap();
      console.log(response);
      if (response?.status === 200) {
        dispatch(credentials({ ...response }));
        router.push("/vendor/dashboard");
      }
    } catch (error) {}
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });
  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh">
      <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
        <form onSubmit={handleSubmit}>
          <BazaarImage
            src="/assets/images/bazaar-black-sm.svg"
            sx={{
              m: "auto",
            }}
          />

          <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
            Welcome To Enfoni
          </H1>

          <BazaarTextField
            mb={1.5}
            fullWidth
            name="email"
            size="small"
            type="email"
            variant="outlined"
            onBlur={handleBlur}
            value={values.email}
            onChange={handleChange}
            label="Email"
            placeholder="exmple@mail.com"
            error={!!touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          />

          <BazaarTextField
            mb={2}
            fullWidth
            size="small"
            name="password"
            label="Password"
            autoComplete="on"
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            placeholder="*********"
            type={passwordVisibility ? "text" : "password"}
            error={!!touched.password && !!errors.password}
            helperText={touched.password && errors.password}
            InputProps={{
              endAdornment: (
                <EyeToggleButton
                  show={passwordVisibility}
                  click={togglePasswordVisibility}
                />
              ),
            }}
          />

          <Button
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            sx={{
              height: 44,
            }}
          >
            Login
          </Button>
        </form>

        <SocialButtons />

        <FlexRowCenter mt="1.25rem">
          <Box>Don&apos;t have account?</Box>
          <Link href="admin/signup">
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Sign Up
            </H6>
          </Link>
        </FlexRowCenter>

        <FlexBox
          justifyContent="center"
          bgcolor="grey.200"
          borderRadius="4px"
          py={2.5}
          mt="1.25rem"
        >
          Forgot your password?
          <Link href="/reset-password">
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Reset It
            </H6>
          </Link>
        </FlexBox>
      </Wrapper>
    </FlexRowCenter>
  );
};
const initialValues = {
  email: "",
  password: "",
};
const formSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup.string().email("invalid email").required("Email is required"),
});
export default Index;
