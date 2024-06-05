import React from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import { AiOutlineUser } from "react-icons/ai";
import { RxCube } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../Redux/Auth/Action';
import { useDispatch } from 'react-redux';
import  { toast,Toaster } from 'react-hot-toast';

const buttonStyles = "bg-blue-500 text-white p-2 rounded";
const iconStyles = "w-[30px] mr-4 rounded-full";
const titleStyles = "font-bold text-black";
const descriptionStyles = " text-zinc-600";

const RightModal = ({ open, toggleModal }) => {
  const jwt=localStorage.getItem("jwt");
  const navigate=useNavigate();
const dispatch=useDispatch();
  return (
    <Drawer anchor="right" open={open} onClose={toggleModal}>
      <Toaster/>
      <div className="w-80">
        <div className="bg-red-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center h-10 w-10 justify-center  text-black border-box pl-2 rounded-full">
              <AiOutlineUser className={iconStyles} />
            </div>
            <span className={titleStyles}>Welcome</span>
          </div>
          <IconButton onClick={toggleModal} aria-label="close">
            <CloseIcon className="text-white" />
          </IconButton>
        </div>
        <List>
          <CustomListItem
            imageSrc="/target-logo.png"
            altText="Join Target"
            title="Join Target today"
            description={
              <span >
              Enjoy quick and easy shopping   <div style={{display: "flex", alignItems: "center"}}> <img src="/onepass.png" alt="OnePass" className="w-20 " /> online account </div>
            </span>
            }
          />
          <Divider />
          {jwt?<div onClick={()=>{
            dispatch(logout())
            toast.success("Logout Successfully")
            navigate("/")
            window.location.reload()
            }}>
            <CustomListItem
            imageSrc="/button.svg"
            altText="Log out"
            title="Log Out"
            // description="with Target or OnePass account."
          />
          </div>:<Link to="/sign-in">
          <CustomListItem
            imageSrc="/button.svg"
            altText="Log in"
            title="Log in"
            description="with Target or OnePass account."
          />
          </Link> }
          
          <Divider />
          <CustomListItem
          icon={<RxCube className={iconStyles} />}
            altText="Track my order"
            title="Track my order"
          />
          <Divider />
          <CustomListItem
            imageSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAMFBMVEVHcEyZAPGZAPGZAPGZAPGZAPGSAPD///+WAPH05/2zYPXq1vy9evbKlvjcu/qkNvP915pXAAAABXRSTlMAS9vaSuJ8hkcAAACWSURBVCiRxZLBDoAgDEMHSJkD5f//VkAOEgZXeyHspcnSleiwXpUzREZHVYbcGloavsz8/X4hvKQMViHuUHQKFIgzvBKeIGKZx2aenI0JUN+LR9hZ2TcXPwbYdklthrLTAPllrMKcRK4YE6tOZqS+yAQr/wNKCLceQqXr+HpIi+D3J9sfe18TPxdsUekqty81mUWtraEHj1AR+MyuHzwAAAAASUVORK5CYII="
            altText="Join OnePass"
            title={
              <span style={{display: "flex", alignItems: "center"}}>
                Join <img src="/onepass.png" alt="OnePass" className="w-20" />
              </span>
            }
            description="Get free standard delivery on eligible items"
          />
          <Divider />
        </List>
      </div>
    </Drawer>
  );
};

const CustomListItem = ({ imageSrc, icon, altText, title, description }) => {
  return (
    <ListItem className="cursor-pointer">
      <ListItemIcon>
        {icon ? (
          icon
        ) : (
          imageSrc && <img src={imageSrc} alt={altText} className={`${iconStyles} ml-2 rounded-full`} />
        )}
      </ListItemIcon>

      <ListItemText
        primary={<span className={titleStyles}>{title}</span>}
        secondary={<span className={descriptionStyles}>{description}</span>}
      />
      <ChevronRightIcon className="text-zinc-400" />
    </ListItem>
  );
};

export default RightModal;
