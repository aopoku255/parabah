import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { ProductForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { useAddProductMutation } from "../../../src/app/features/products/productsApiSlice";

// =============================================================================
CreateProduct.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

export default function CreateProduct() {
  const INITIAL_VALUES = {
    name: "",
    tags: "",
    stock: "",
    price: "",
    files: [],
    category: [],
    sale_price: "",
    description: "",
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    category: yup.array().min(1).required("required"),
    description: yup.string().required("required"),
    stock: yup.number().required("required"),
    price: yup.number().required("required"),
    sale_price: yup.number().required("required"),
    tags: yup.string().required("required"),
    // files: yup.array().min(1).required("required"),
  });

  const [addProduct] = useAddProductMutation();

  const handleFormSubmit = async (values) => {
    try {
      const response = await addProduct({ ...values }).unwrap();
      console.log(response);
    } catch (error) {}
  };
  return (
    <Box py={4}>
      <H3 mb={2}>Add New Product</H3>

      <ProductForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}
