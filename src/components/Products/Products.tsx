import {
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  Modal,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import React from "react";
import ProductProps from "./Products.d";
import { PRODUCTS } from "../Data/Products";
import { LoadingButton } from "@mui/lab";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Send, WhatsApp } from "@mui/icons-material";

const ProductComponent = ({
  name,
  price,
  imageUrl,
  description,
  category,
  id,
}: ProductProps) => {
  const mytheme = useTheme();
  const lessThanTab = useMediaQuery(mytheme.breakpoints.down("md"));

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [modalContent, setModalContent] = React.useState<ProductProps>({});
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleOpen = (item: ProductProps) => {
    setModalContent(item);
    setShowModal(true);
  };
  const handleClose = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    console.log("Closing modal...");
    setShowModal(false);
  };

  let aboutImgWidth = lessThanTab ? "100vw" : "40vw";
  return (
    <Tooltip
      title={!showModal ? "Click on the card to view more details" : ""}
      arrow
    >
      <div
        data-aos="zoom-in"
        onClick={() =>
          handleOpen({ name, price, imageUrl, description, category, id })
        }
        className="shadow-md pb-2 rounded flex flex-col hover:opacity-60"
      >
        <Modal open={showModal} closeAfterTransition onClose={handleClose}>
          <div>
            <Box
              sx={{ height: "100vh" }}
              className="flex flex-col items-center justify-center p-5"
            >
              <Box
                sx={{ maxWidth: aboutImgWidth }}
                className="shadow-md pb-2 overflow-y-auto rounded flex flex-col bg-white"
              >
                <img
                  alt="About Us Image"
                  className="rounded"
                  style={{ height: "55vh" }}
                  src={imageUrl}
                />
                <Box className="flex flex-row justify-between my-4 mx-6">
                  <p className="text-gray-600 font-poppinsLight">{name}</p>
                  <Typography
                    color="primary"
                    sx={{ fontFamily: "Poppins-Medium" }}
                    variant="body1"
                    className="my-3"
                  >
                    {price}
                  </Typography>
                </Box>
                <p>{description}</p>
                <p className="mx-4 my-1 font-poppinsLight font-lg">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Consequuntur sed, pariatur nulla aperiam laboriosam minima.
                  Aliquid, blanditiis, alias eligendi aperiam asperiores animi
                  quis maxime quaerat tempore assumenda obcaecati, nulla nam!
                </p>
                <div className="mx-4 mt-3 mb-4 flex flex-row items-center gap-4 justify-center">
                  <LoadingButton
                    loading={loading}
                    size="small"
                    loadingPosition="start"
                    disableElevation
                    startIcon={<WhatsApp />}
                    variant="contained"
                  >
                    Buy
                  </LoadingButton>
                  <Button
                    onClick={handleClose}
                    title="cancel"
                    size="small"
                    variant="text"
                  >
                    cancel
                  </Button>
                </div>
              </Box>
            </Box>
          </div>
        </Modal>

        <img
          alt="About Us Image"
          className="rounded"
          style={{ width: aboutImgWidth, height: "55vh" }}
          src={imageUrl}
        />
        <Box sx={{ margin: "8px" }} className="flex flex-row justify-between">
          <p className="text-gray-600 font-poppinsLight">{name}</p>
          <Typography
            color="primary"
            sx={{ fontFamily: "Poppins-Medium" }}
            variant="body1"
            className="my-3"
          >
            {price}
          </Typography>
        </Box>
      </div>
    </Tooltip>
  );
};
function Services() {
  const [products, setProducts] = React.useState<ProductProps[]>(PRODUCTS);
  const [_searchValue, setSearchValue] = React.useState<string>("");

  const handleSearch = (e: any) => {
    let searchValue = String(e.target.value).toLowerCase();
    setSearchValue(searchValue);
    console.log(e.target.value);
    let newProducts: ProductProps[] = PRODUCTS.filter(
      (product) =>
        product.description?.toString().toLowerCase().includes(searchValue) ||
        product.name?.toString().toLowerCase().includes(searchValue) ||
        product.category?.toString().toLowerCase().includes(searchValue) ||
        product.price?.toString().toLowerCase().includes(searchValue),
    );
    setProducts(newProducts);
  };

  const handleSearchBtn = () => {
    let newProducts: ProductProps[] = PRODUCTS.filter(
      (product) =>
        product.description?.toString().toLowerCase().includes(_searchValue) ||
        product.name?.toString().toLowerCase().includes(_searchValue) ||
        product.category?.toString().toLowerCase().includes(_searchValue) ||
        product.price?.toString().toLowerCase().includes(_searchValue),
    );
    setProducts(newProducts);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-center m-4">
        <TextField
          variant="outlined"
          label="search"
          size="small"
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search></Search>
              </InputAdornment>
            ),
          }}
        ></TextField>
        <Button onClick={handleSearchBtn}>Search</Button>
      </div>
      <div className="pt-5 px-2 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((item: ProductProps, index: number) => {
          return <ProductComponent key={item?.id} {...item} />;
        })}
      </div>
    </div>
  );
}

export default Services;
