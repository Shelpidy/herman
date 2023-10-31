import React, { useEffect } from "react";
import {
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import { useReducer } from "react";
import { ContactFormObject, Action, EmailVerifyResp } from "./ContactForm.d";
import {
  MailOutline,
  SmartphoneOutlined,
  PlaceOutlined,
  Close,
  Send,
} from "@mui/icons-material";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  timer: 5000,
  position: "top-right",
  timerProgressBar: true,
  toast: true,
});

const initialState = {
  fullname: "",
  email: "",
  subject: "",
  message: "",
} satisfies ContactFormObject;

const reducer = (state: ContactFormObject = initialState, action: Action) => {
  switch (action.type) {
    case "FULLNAME":
      return { ...state, fullname: action.payload };
    case "EMAIL":
      return { ...state, email: action.payload };
    case "SUBJECT":
      return { ...state, subject: action.payload };
    case "MESSAGE":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

const transport = {
  host: "smtp.mail.yahoo.com",
  secure: true,
  auth: { user: "teax.sl@yahoo.com", pass: "amhg ycxx unqf plrf" },
};

export const ContactEmail = (mailObj: ContactFormObject) => ({
  subject: `👋 ${mailObj.subject}`,
  body: (
    <div>
      <p>
        <strong>From:</strong>
        {mailObj.fullname}
      </p>
      <p>{mailObj.message}</p>
    </div>
  ),
});

//   var mailer:any = Mailer({transport},{ContactEmail})

function ContactForm() {
  const [formObjectState, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = React.useState<boolean>(false);

  // const [showEmailCodeModal,setShowEmailCodeModal] = React.useState<boolean>(false);
  // const [verificationCode,setVerificationCode] = React.useState<number | null>(0);
  // const [emailVerificationRespObj,setEmailVerificationRespObj] = React.useState<NonNullable<EmailVerifyResp>>({});

  // useEffect(()=>{
  //     console.log(formObjectState);
  // },[])

  /// verify Email code

  // const handlEmailCodeVerificationForm = ()=>{
  //     setLoading(true)
  //     let postCodeObj = JSON.stringify({code:verificationCode});
  //     fetch('http://192.168.0.103:5000/verify',

  //     { method:'POST',
  //       headers:{
  //         "message_id":emailVerificationRespObj?.content?.message_id ?? "",
  //         'Content-Type':"application/json"},
  //        body:postCodeObj}).then(res => res.json()).then(result =>{
  //         console.log(result)
  //         if(result?.status === 'error'){
  //             setLoading(false)
  //             Toast.fire(' ',result?.message,'error')
  //         }
  //         else{
  //             setLoading(false)
  //             Toast.fire(' ',"Message Sent",'success')
  //             setShowEmailCodeModal(false)
  //         }
  //        }).catch(err =>{
  //         setLoading(false)
  //         console.log(err)
  //         Toast.fire(' ','Error trying to make request. Make sure you are connected to the internet and try again','error')

  //      });

  // }

  /// Resend Verify Request

  const resendEmailRequest = () => {};

  /// Make a contact Request
  const handleContactForm = async () => {
    console.log("Submitting form");
    setLoading(true);
    const { fullname, message, email, subject } = formObjectState;
    let postObj = { fullname, message, email, subject };
    // debugger
    console.table(postObj);

    // await mailer.send('ContactEmail',postObj, {
    //     to: postObj.email
    //   })
    setLoading(false);
    Toast.fire(" ", "Message Sent", "success");
    // fetch('http://192.168.0.103:5000/message',
    // { method:'POST',
    //   headers:{
    //     'Content-Type':"application/json"},
    //    body:postObj}).then(res => res.json()).then(result =>{
    //     console.log(result);
    //     if(result?.status === 'error'){
    //         setLoading(false)
    //         Toast.fire(' ','Message Sent','error')
    //     }
    //     else{
    //         setLoading(false)
    //         setEmailVerificationRespObj(result)
    //         setShowEmailCodeModal(true)
    //     }
    //    }).catch(err =>{
    //     setLoading(false)
    //     console.log(err)
    //     Toast.fire(' ','Error trying to make request. Make sure you are connected to the internet and try again','error')
    //  });
  };

  return (
    <div className="flex my-4 flex-col p-2 justify-center gap-10  pb-10 md:flex-row md:gap-20">
      {/* <Modal open={showEmailCodeModal} onClose={()=> setShowEmailCodeModal(false)}>
            <motion.div className='flex  flex-col justify-center items-center' style={{height:"100vh"}}>
               
                <div className='px-10 py-20 relative rounded h-100 bg-white flex flex-col align-bottom gap-5 m-5' style={{minWidth:'30vw'}}>
                <span className='absolute top-5 right-10 z-40'><Close color='primary' onClick = {()=> setShowEmailCodeModal(false)}/></span>
                    <Typography variant='body2'>
                        A confirmation code is sent to the email {formObjectState?.email}. Please enter the confirmation below to verify your email
                    </Typography>
                    <TextField  className='text-white mt-4' type="text" placeholder ='__ __ __'  label='Enter Code' size='small' color='success' onChange={e => setVerificationCode(parseInt(e.target.value))} sx={{height:"4vh",marginRight:'3px',color:"white"}}>
                    </TextField>
                    <LoadingButton
                        sx={{marginTop:1}}
                        onClick={handlEmailCodeVerificationForm}
                        loading = {loading}
                        size='small'
                        loadingPosition="start"
                        disableElevation
                        startIcon={<Send/>}
                        variant="contained"
                        >
                        Send
                   </LoadingButton>

                   <LoadingButton
                    loading = {loading}
                    size='small'
                    loadingPosition="start"
                    disableElevation
                    startIcon={<Send/>}
                    variant="text"
                    >
                    Resend Code
                </LoadingButton>
                </div>
                
            </motion.div>
        </Modal> */}
      <div className="pt-1 px-2 grid grid-cols-1 gap-5 md:pt-4 md:grid-cols-2">
        <div className="flex flex-row items-center justify-start gap-3 my-2">
          <PlaceOutlined
            className="text-customPrimary20"
            fontSize="large"
          ></PlaceOutlined>
          <div>
            <Typography className="font-semibold font-inter">
              Location
            </Typography>
            <Typography className="text-md text-gray-500">
              20 Hill Station
            </Typography>
            {/* <Typography className='text-md text-gray-500'>1 Santos Lane,Port Loko, Sierra Leone</Typography> */}
          </div>
        </div>

        <div className="flex flex-row items-center justify-start gap-3 my-2">
          <MailOutline
            className="text-customPrimary20"
            fontSize="large"
          ></MailOutline>
          <div>
            <Typography>Email</Typography>
            <a href="mailto:bubacarrsumudu2020@yahoo.com">
              <Typography className="text-md text-gray-500">
                marrah@gmail.com@yahoo.com
              </Typography>
            </a>
          </div>
        </div>
        <div className="flex flex-row items-center justify-start gap-3 my-2">
          <SmartphoneOutlined
            className="text-customPrimary20"
            fontSize="large"
          ></SmartphoneOutlined>
          <div>
            <Typography>Call Phone One</Typography>
            <a href="tel:+23272414477">
              {" "}
              <Typography className="text-md text-gray-500">
                +23272 112233
              </Typography>
            </a>
          </div>
        </div>
        <div className="flex flex-row items-center justify-start gap-3 my-2">
          <SmartphoneOutlined
            className="text-customPrimary20"
            fontSize="large"
          ></SmartphoneOutlined>
          <div>
            <Typography>Call Phone Two</Typography>
            <a href="tel:+23278514424">
              {" "}
              <Typography className="text-md text-gray-500">
                +23278514424
              </Typography>
            </a>
          </div>
        </div>
        <div className="flex flex-row items-center justify-start gap-3 my-2">
          <SmartphoneOutlined
            className="text-customPrimary20"
            fontSize="large"
          ></SmartphoneOutlined>
          <div>
            <Typography>Call Phone Three</Typography>
            <a href="tel:+23278610610">
              {" "}
              <Typography className="text-md text-gray-500">
                +23278610610
              </Typography>
            </a>
          </div>
        </div>
      </div>
      {/* <div className='pt-1 px-2 md:pt-4 md:px-2'>
            <div className='flex flex-col justify-center items-start gap-5'>
                <div className='flex flex-row items-center justify-center gap-2 md:flex-row'>
                   <TextField onChange={(e)=> dispatch({type:'FULLNAME',payload:e.target.value})} size='small' type='text' fullWidth className='' variant='outlined' label='Full Name' required></TextField>
                   <TextField onChange={(e)=> dispatch({type:'EMAIL',payload:e.target.value})} size='small' type='email' fullWidth variant='outlined' label='Email' required></TextField>
                </div>
                <TextField onChange={(e)=> dispatch({type:'SUBJECT',payload:e.target.value})} size='small'  fullWidth variant='outlined' label='Subject' required></TextField>
                <TextField onChange={(e)=> dispatch({type:'MESSAGE',payload:e.target.value})} size='small' multiline minRows={3} fullWidth variant='outlined' label='Message' required></TextField>
                
                <LoadingButton
                   onClick = {handleContactForm}
                    loading = {loading}
                    size='small'
                    loadingPosition="start"
                    disableElevation
                    startIcon={<Send/>}
                    variant="contained"
                    >
                    Submit
                </LoadingButton>
        
              
            </div>
        </div> */}
    </div>
  );
}

export default ContactForm;
