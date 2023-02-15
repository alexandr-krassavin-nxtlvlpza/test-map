import { useCallback, type FC } from 'react'
import {
  Box,
  Drawer as DefaultDrawer,
  Typography,
  Divider,
  useMediaQuery
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from '../../store'
import { isDrawerOpen, toggleDrawer } from '../../slices/drawer'
import { AddProductForm } from './AddProductForm'
import { WishList } from './WishList'
import { InfoBlock } from './InfoBlock'
import { clearSelectedShop } from '../../slices/shop'

export const Drawer: FC = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isOpen = useSelector(isDrawerOpen)
  const closeDrawer = useCallback(() => {
    dispatch(toggleDrawer(false))
    dispatch(clearSelectedShop())
  }, [dispatch])
  return (
        <DefaultDrawer
            anchor={isMobile ? 'bottom' : 'right'}
            open={isOpen}
            onClose={closeDrawer}
        >
            <Box
                role="presentation"
                sx={{
                  width: isMobile ? 'auto' : 400,
                  height: isMobile ? 300 : 'auto',
                  pb: 2
                }}
            >
                <Typography
                    variant="h6"
                    align="center"
                    sx={{ pt: 1, pb: 1 }}
                >
                    Shop Info
                </Typography>
                <Divider />
                <Box sx={{ pl: 2, pr: 2, pt: 1 }}>
                    <InfoBlock />
                </Box>
                <Divider />
                <Typography
                    variant="h6"
                    align="center"
                    sx={{ pt: 1, pb: 1 }}
                >
                    Wish List
                </Typography>
                <Divider />
                <Box sx={{ pl: 2, pr: 2, pt: 1 }}>
                    <WishList />
                </Box>
                <Box sx={{ pl: 2, pr: 2, pt: 1 }}>
                    <AddProductForm />
                </Box>
            </Box>
        </DefaultDrawer>
  )
}
