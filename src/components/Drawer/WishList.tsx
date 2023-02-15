import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useCallback, type FC } from 'react'
import { removeFromWishList, selectAllProductsOfShop } from '../../slices/wishList'
import { type RootState, useDispatch, useSelector } from '../../store'
import { getSelectedShop } from '../../slices/shop'

export const WishList: FC = () => {
  const dispatch = useDispatch()
  const selectedShop = useSelector(getSelectedShop)
  const wishList = useSelector((state: RootState) => selectAllProductsOfShop(state, selectedShop?.id!))
  const handleRemoveFromWishList = useCallback((id: string) => {
    dispatch(removeFromWishList(id))
  }, [dispatch])
  return (
        <List>
            {wishList.map(({ title, id }) => (
                <ListItem key={id}>
                    <ListItemText primary={title} />
                    <ListItemSecondaryAction>
                        <IconButton onClick={handleRemoveFromWishList.bind(this, id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
  )
}
