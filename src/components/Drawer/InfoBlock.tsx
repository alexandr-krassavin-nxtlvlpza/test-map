import { Link as DefaultLink, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import TitleIcon from '@mui/icons-material/Title';
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";
import { useSelector } from "../../store";
import { getSelectedShop } from "../../slices/shop";

const Link = styled(DefaultLink)(({ theme }) => ({
    textDecoration: 'none',
    cursor: 'pointer',
    color: theme.palette.text.primary
}));

export const InfoBlock = () => {
    const selectedShop = useSelector(getSelectedShop);
    return (
        <List>
            <ListItem disablePadding>
                <ListItemIcon>
                    <TitleIcon />
                </ListItemIcon>
                <ListItemText primary={selectedShop?.name} />
            </ListItem>
            <ListItem disablePadding>
                <ListItemIcon>
                    <GpsFixedIcon />
                </ListItemIcon>
                <ListItemText primary={selectedShop?.address} />
            </ListItem>
            <ListItem disablePadding>
                <ListItemIcon>
                    <ContactPageIcon />
                </ListItemIcon>
                <ListItemText
                    primary={<Link href={`mailto:${selectedShop?.contacts?.email}`}>{selectedShop?.contacts?.email}</Link>}
                    secondary={<Link href={`tel:${selectedShop?.contacts?.phone}`}>{selectedShop?.contacts?.phone}</Link>}
                />
            </ListItem>
            <ListItem disablePadding>
                <ListItemText secondary={selectedShop?.description} />
            </ListItem>
            <ListItem>
                {selectedShop?.images.length && (
                    <Masonry columns={2} spacing={1}>
                        {selectedShop?.images.map((image) => (
                            <img key={image} src={image} alt="image" />
                        ))}
                    </Masonry>
                )}
            </ListItem>
        </List>
    )
}