import { use, useState } from "react";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
import { H3, Paragraph } from "components/Typography";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { useAddShopMutation } from "app/features/Shop/shopApiSlice";
const INITIAL_VALUES = {
  order: 1,
  category: "fashion",
  shopName: "",
  shopPhone: "",
  shopAddress: "",
  description: ``,
};
const validationSchema = Yup.object().shape({
  shopName: Yup.string().required("Shop Name is required!"),
  shopPhone: Yup.string().required("Shop Phone is required!"),
  category: Yup.string().required("Category is required!"),
  description: Yup.string().required("Description is required!"),
  shopAddress: Yup.string().required("Shop Address is required!"),
  order: Yup.number().required("Orders is required!"),
});

// =============================================================================
ShopSettings.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

export default function ShopSettings() {
  const [mainBanner, setMainBanner] = useState([]);
  const [productBanner, setProductBanner] = useState([]);
  const [links, setLinks] = useState([
    {
      id: 1,
      name: "Links",
      value: "https://www.productbanner.com",
    },
  ]);
  const handleAddLink = () => {
    const newLink = {
      id: Date.now(),
      name: "Links",
      value: "https://www.google.com",
    };
    setLinks((state) => [...state, newLink]);
  };

  const [addShop] = useAddShopMutation();

  const handleDeleteLink = (id) => () => {
    setLinks((state) => state.filter((item) => item.id !== id));
  };
  const handleFormSubmit = async (values) => {
    try {
      console.log(values);
      const formData = new FormData();
      const results = await addShop({
        shop_name: values.shopName,
        shop_phone_number: values.shopPhone,
        shop_description: values.description,
        shop_category: values.category,
        shop_address: values.shopAddress,
        min_order: values.order,
      }).unwrap();
      console.log(results);
    } catch (error) {}
  };
  return (
    <Box py={4} maxWidth={740} margin="auto">
      <H3 mb={2}>Shop Settings</H3>

      <Card
        sx={{
          p: 3,
        }}
      >
        <Paragraph fontWeight={700} mb={4}>
          Basic Settings
        </Paragraph>

        <Formik
          onSubmit={(values) => {
            const updatedValues = { ...values, mainBanner, productBanner };
            return handleFormSubmit(updatedValues);
          }}
          initialValues={INITIAL_VALUES}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={3} mb={3}>
                <TextField
                  color="info"
                  size="medium"
                  name="shopName"
                  label="Shop Name *"
                  onBlur={handleBlur}
                  value={values.shopName}
                  onChange={handleChange}
                  error={Boolean(errors.shopName && touched.shopName)}
                  helperText={touched.shopName && errors.shopName}
                />

                <TextField
                  color="info"
                  size="medium"
                  name="shopPhone"
                  label="Shop Phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shopPhone}
                  error={Boolean(errors.shopPhone && touched.shopPhone)}
                  helperText={touched.shopPhone && errors.shopPhone}
                />

                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="category"
                  onBlur={handleBlur}
                  placeholder="Category"
                  label="Select Category"
                  onChange={handleChange}
                  value={values.category}
                  error={Boolean(errors.category && touched.category)}
                  helperText={touched.category && errors.category}
                >
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="fashion">Fashion</MenuItem>
                </TextField>

                <TextField
                  rows={6}
                  multiline
                  fullWidth
                  color="info"
                  size="medium"
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  label="Description (optional)"
                  error={Boolean(errors.description && touched.description)}
                  helperText={touched.description && errors.description}
                />

                <TextField
                  color="info"
                  size="medium"
                  name="shopAddress"
                  label="Shop Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shopAddress}
                  error={Boolean(errors.shopAddress && touched.shopAddress)}
                  helperText={touched.shopAddress && errors.shopAddress}
                />

                <TextField
                  name="order"
                  color="info"
                  size="medium"
                  type="number"
                  onBlur={handleBlur}
                  value={values.order}
                  label="Minimum Order *"
                  onChange={handleChange}
                  error={Boolean(errors.order && touched.order)}
                  helperText={touched.order && errors.order}
                />
              </Stack>

              <Button type="submit" color="info" variant="contained">
                Save Changes
              </Button>
              <Divider
                sx={{
                  my: 4,
                }}
              />

              <Paragraph fontWeight={700} mb={2}>
                Shop Page Settings
              </Paragraph>

              <Stack spacing={3} mb={3}>
                <DropZone
                  onChange={(files) => setMainBanner(files)}
                  title="Main Banner (1920 x 360) *"
                  imageSize="We had to limit height to maintian consistancy. Some device both side of the banner might cropped for height limitation."
                />

                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="features"
                  placeholder="Product Features"
                  label="Product Features"
                  defaultValue="electronics"
                >
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="fashion">Fashion</MenuItem>
                </TextField>

                <DropZone
                  onChange={(files) => setProductBanner(files)}
                  title="All products page banner * (Recommended size 1025x120)"
                  imageSize="We had to limit height to maintian consistancy. Some device both side of the banner might cropped for height limitation."
                />
              </Stack>

              <Box mb={4}>
                {links.map((item) => (
                  <FlexBox gap={2} alignItems="center" mb={2} key={item.id}>
                    <TextField
                      fullWidth
                      color="info"
                      size="medium"
                      label="Links"
                      defaultValue={item.value}
                    />

                    <Box flexShrink={0}>
                      <IconButton onClick={handleDeleteLink(item.id)}>
                        <Delete
                          sx={{
                            color: "grey.600",
                          }}
                        />
                      </IconButton>
                    </Box>
                  </FlexBox>
                ))}

                <Button color="info" variant="outlined" onClick={handleAddLink}>
                  Add Link
                </Button>
              </Box>

              <Button
                color="info"
                variant="contained"
                type="submit"
                onSubmit={handleFormSubmit}
              >
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </Box>
  );
}
