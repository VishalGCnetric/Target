import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const sharedClasses = {
  flex: 'flex',
  flexCol: 'flex-col',
  flexRow: 'flex-row',
  itemsCenter: 'items-center',
  border: 'border',
  p4: 'p-4',
  spaceY4: 'space-y-4',
  spaceY2: 'space-y-2',
  spaceX4: 'space-x-4',
  spaceX2: 'space-x-2',
  justifyBetween: 'justify-between',
  mt2: 'mt-2',
  mt4: 'mt-4',
  w24: 'w-24',
  hAuto: 'h-auto',
  textLg: 'text-lg',
  fontSemibold: 'font-semibold',
  textXl: 'text-xl',
  fontBold: 'font-bold',
  textSm: 'text-sm',
  borderRounded: 'border rounded',
  p1: 'p-1',
  borderR: 'border-r',
  borderL: 'border-l',
  w8: 'w-8',
  textCenter: 'text-center',
  px2: 'px-2',
  flex1: 'flex-1',
  hoverTextBlack: 'hover:text-black',
  textZinc500: 'text-zinc-500',
};

const CartItem = ({ item, handleRemoveItemFromCart, handleUpdateCartPlus, handleUpdateCartMinus }) => {
  return (
    <div className={`${sharedClasses.flex} ${sharedClasses.flexCol} md:flex-row ${sharedClasses.itemsCenter} ${sharedClasses.border} ${sharedClasses.p4} ${sharedClasses.spaceY4} md:space-y-0 md:space-x-4 relative`}>
      <img src={item.images[0]} alt="Product Image" className={`w-44`} />
      <div className={sharedClasses.flex1}>
        <div className={`${sharedClasses.flex} ${sharedClasses.justifyBetween} ${sharedClasses.itemsStart}`}>
          <div>
            <h2 className={`${sharedClasses.textLg} ${sharedClasses.fontSemibold}`}>{item.name}</h2>
            <p className={`${sharedClasses.textXl} ${sharedClasses.fontBold} ${sharedClasses.mt2}`}>${item.price}</p>
          </div>
          {/* <IconButton onClick={(e) => handleRemoveItemFromCart(e, item.id)} className={`absolute top-0 right-0 ${sharedClasses.hoverTextBlack}`}>
            <DeleteIcon />
          </IconButton>
          <IconButton className={`absolute top-0 right-0   ${sharedClasses.hoverTextBlack}`}>
          <FavoriteIcon />
        </IconButton> */}
        </div>
        <div className={`${sharedClasses.flex} ${sharedClasses.flexCol} md:flex-row ${sharedClasses.itemsCenter} ${sharedClasses.mt4} ${sharedClasses.spaceY2} md:space-y-0 md:space-x-4`}>
          <div className={`${sharedClasses.flex} ${sharedClasses.itemsCenter} ${sharedClasses.spaceX2}`}>
            <label htmlFor="colour" className={sharedClasses.textSm}>Colour</label>
            <select id="colour" className={`${sharedClasses.border} ${sharedClasses.borderRounded} ${sharedClasses.p1}`}>
              {item.colors.map((color, index) => (
                <option key={index} value={color}>{color}</option>
              ))}
            </select>
          </div>
          <div className={`${sharedClasses.flex} ${sharedClasses.itemsCenter} ${sharedClasses.spaceX2}`}>
            <label htmlFor="size" className={sharedClasses.textSm}>Size</label>
            <select id="size" className={`${sharedClasses.border} ${sharedClasses.borderRounded} ${sharedClasses.p1}`}>
              {item.sizes.map((size, index) => (
                <option key={index} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={`${sharedClasses.flex} ${sharedClasses.itemsCenter} ${sharedClasses.mt4} ${sharedClasses.spaceX4}`}>
          <IconButton onClick={(e) => handleUpdateCartMinus(e, item.id, 1)} className={`${sharedClasses.textZinc500} ${sharedClasses.hoverTextBlack}`}>
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className={`${sharedClasses.borderL} ${sharedClasses.borderR} ${sharedClasses.w8} ${sharedClasses.textCenter}`}>1</span>
          <IconButton onClick={(e) => handleUpdateCartPlus(e, item.id, 1)} className={`${sharedClasses.textZinc500} ${sharedClasses.hoverTextBlack}`}>
            <AddCircleOutlineIcon />
          </IconButton>

          <IconButton onClick={(e) => handleRemoveItemFromCart(e, item.id)} className={`${sharedClasses.hoverTextBlack}`}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <div className={`absolute top-2 right-0 ${sharedClasses.flex} ${sharedClasses.itemsCenter} $`}>
      {/* <IconButton onClick={(e) => handleRemoveItemFromCart(e, item.id)} className={`${sharedClasses.hoverTextBlack}`}>
            <DeleteIcon />
          </IconButton> */}
        {/* <IconButton className={`   ${sharedClasses.hoverTextBlack}`}>
          <FavoriteIcon />
        </IconButton> */}
      </div>
    </div>
  );
};

export default CartItem;
