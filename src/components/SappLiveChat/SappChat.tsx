import React from "react";
import { motion } from "framer-motion";
import {
  Modal,
  IconButton,
  TextField,
  Tooltip,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
} from "@mui/material";
import { Send, Chat, WhatsApp, Close } from "@mui/icons-material";
import ReactWhatsapp from "react-whatsapp";

function SappChat() {
  const [sappMsg, setSappMsg] = React.useState<string>("");
  const [showChatBox, setShowChatBox] = React.useState<boolean>(false);

  const handleSappForm = (e: React.FormEvent) => {
    e.preventDefault();
    setSappMsg("");
  };
  return (
    <div className="flex flex-col ">
      <Modal open={showChatBox} onClose={() => setShowChatBox(false)}>
        <motion.div
          className="flex  flex-col justify-center items-center"
          style={{ height: "100vh" }}
        >
          <div
            className="px-10 py-20 relative rounded h-100 bg-white flex flex-col align-bottom gap-5 m-5"
            style={{ minWidth: "30vw" }}
          >
            <span className="absolute top-5 right-10 z-40">
              <Close color="primary" onClick={() => setShowChatBox(false)} />
            </span>
            <Typography variant="body2">
              Send a message and chat with one of the members of Global Computer
              Network
            </Typography>
            <form
              onSubmit={handleSappForm}
              className="gap-2 px-4 flex justify-center flex-row rounded text-white md:px-2"
            >
              <TextField
                className="text-white"
                type="text"
                value={sappMsg}
                label="Chat On WhatsApp"
                multiline
                size="small"
                color="success"
                onChange={(e) => setSappMsg(e.target.value)}
                sx={{
                  height: "4vh",
                  marginRight: "3px",
                  color: "white",
                }}
              ></TextField>
              <ReactWhatsapp
                element="webview"
                number="+23278514424"
                message={sappMsg}
              >
                {" "}
                <IconButton>
                  <Send color="success"></Send>
                </IconButton>
              </ReactWhatsapp>
            </form>
          </div>
        </motion.div>
      </Modal>
      {/* <Modal open={showChatBox} onClose={()=> setShowChatBox(false)}>
      <motion.div className='flex relative flex-col justify-center items-center h-80 bg-white'>
        <span className='absolute top-5 right-10 z-40'><Close color='primary' onClick = {()=> setShowChatBox(false)}/></span>
        <form onSubmit={handleSappForm} className='gap-2 px-4 flex flex-row rounded text-white md:px-2'>
            <TextField  className='text-white' type="text" value={sappMsg} label='Chat On WhatsApp' multiline size='small' color='success' onChange={e => setSappMsg(e.target.value)} sx={{height:"4vh",marginRight:'3px',color:"white"}}>
            </TextField>
            <ReactWhatsapp element='webview' number='+23279027241'  message={sappMsg}> <IconButton ><Send color='success'></Send></IconButton></ReactWhatsapp>
        </form>
       </motion.div>
      </Modal> */}
      <div className="z-40">
        <Tooltip title="Chat">
          <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            sx={{ position: "fixed", top: "75%", right: 30 }}
            icon={<SpeedDialIcon openIcon={<Chat />} />}
          >
            <SpeedDialAction
              icon={<WhatsApp />}
              onClick={() => setShowChatBox(true)}
              tooltipTitle="Chat on WhatsApp"
            />
          </SpeedDial>
        </Tooltip>
      </div>
    </div>
  );
}

export default SappChat;
