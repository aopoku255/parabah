import { useCallback, useState } from "react";
import { Button, Checkbox, Box, FormControlLabel } from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { H1, H6, Small } from "../../../src/components/Typography";
import BazaarImage from "../../../src/components/BazaarImage";
import BazaarTextField from "../../../src/components/BazaarTextField";
import { FlexBox, FlexRowCenter } from "../../../src/components/flex-box";
import { Wrapper } from "../../../src/pages-sections/sessions/Login";
import SocialButtons from "../../../src/pages-sections/sessions/SocialButtons";
import EyeToggleButton from "../../../src/pages-sections/sessions/EyeToggleButton";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { useAdminsignupMutation } from "../../../src/app/features/Auth/authApiSlice";
import { useRouter } from "next/router";
// import prisma from "db";
const Index = () => {
  const [signupUser] = useAdminsignupMutation();
  const router = useRouter();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      const response = await signupUser({
        full_name: values.name,
        email: values.email,
        password: values.password,
      }).unwrap();
      if (response?.status === 200) {
        router.push("/admin");
      } else {
        setErrorMessages(response?.message);
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
    <FlexRowCenter>
      <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
        <form onSubmit={handleSubmit}>
          <BazaarImage
            src="/assets/images/bazaar-black-sm.svg"
            sx={{
              m: "auto",
            }}
          />

          <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
            Create An Admin Account
          </H1>
          {errorMessages !== "" ? (
            <FlexRowCenter>
              <Small
                textAlign="centre"
                mb={1}
                display="block"
                fontWeight="600"
                color="error.700"
              >
                {errorMessages}
              </Small>
            </FlexRowCenter>
          ) : (
            ""
          )}
          <BazaarTextField
            mb={1.5}
            fullWidth
            name="name"
            size="small"
            label="Full Name"
            variant="outlined"
            onBlur={handleBlur}
            value={values.name}
            onChange={handleChange}
            placeholder="Ralph Awards"
            error={!!touched.name && !!errors.name}
            helperText={touched.name && errors.name}
          />

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
            mb={1.5}
            fullWidth
            size="small"
            name="password"
            label="Password"
            variant="outlined"
            autoComplete="on"
            placeholder="*********"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
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

          <BazaarTextField
            fullWidth
            size="small"
            autoComplete="on"
            name="re_password"
            variant="outlined"
            label="Retype Password"
            placeholder="*********"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.re_password}
            type={passwordVisibility ? "text" : "password"}
            error={!!touched.re_password && !!errors.re_password}
            helperText={touched.re_password && errors.re_password}
            InputProps={{
              endAdornment: (
                <EyeToggleButton
                  show={passwordVisibility}
                  click={togglePasswordVisibility}
                />
              ),
            }}
          />

          <FormControlLabel
            name="agreement"
            className="agreement"
            onChange={handleChange}
            control={
              <Checkbox
                size="small"
                color="secondary"
                checked={values.agreement || false}
              />
            }
            label={
              <FlexBox
                flexWrap="wrap"
                alignItems="center"
                justifyContent="flex-start"
              >
                By signing up, you agree to
                <a href="/" target="_blank" rel="noreferrer noopener">
                  <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                    Terms & Condition
                  </H6>
                </a>
              </FlexBox>
            }
          />

          <Button
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            disabled={!values?.agreement}
            sx={{
              height: 44,
            }}
          >
            Create Account
          </Button>
        </form>

        <SocialButtons />
        <FlexRowCenter mt="1.25rem">
          <Box>Already have an account?</Box>
          <Link href="/admin">
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Login
            </H6>
          </Link>
        </FlexRowCenter>
      </Wrapper>
    </FlexRowCenter>
  );
};
const initialValues = {
  name: "",
  email: "",
  password: "",
  re_password: "",
  agreement: false,
};
const formSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-type password"),
  agreement: yup
    .bool()
    .test(
      "agreement",
      "You have to agree with our Terms and Conditions!",
      (value) => value === true
    )
    .required("You have to agree with our Terms and Conditions!"),
});
export default Index;
