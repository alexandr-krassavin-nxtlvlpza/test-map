import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik"
import * as Yup from "yup";
import {useDispatch, useSelector} from "../../store";
import {getSelectedShop} from "../../slices/shop";
import {addToWishList} from "../../slices/wishList";
import { v4 as uuid } from "uuid";

export const AddProductForm = () => {
    const dispatch = useDispatch();
    const selectedShop = useSelector(getSelectedShop);
    const { submitForm, values, handleBlur, handleChange, errors } = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        initialValues: {
            title: "",
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required(),
        }),
        onSubmit: ({ title }, { resetForm }) => {
            dispatch(addToWishList({ id: uuid(), title, shopID: selectedShop?.id! }));
            resetForm();
        },
    });
    return (
        <Box>
            <Typography
                variant="h6"
                align="center"
                sx={{ mt: 1, mb: 1 }}
            >
                Add Product
            </Typography>
            <TextField
                sx={{ mb: 1 }}
                label="Text..."
                variant="outlined"
                fullWidth
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.title)}
                helperText={errors.title}
            />
            <Stack direction="row" justifyContent="flex-end">
                <Button onClick={submitForm} variant="contained">Save</Button>
            </Stack>
        </Box>
    )
}