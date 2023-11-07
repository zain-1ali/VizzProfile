import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { QRCode } from "react-qrcode-logo";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
} from "react-share";
import { IoIosArrowBack } from "react-icons/io";
import { RiWhatsappFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiLogoTelegram } from "react-icons/bi";
import { BiLogoTwitter, BiLogoLinkedin } from "react-icons/bi";
import { toast } from "react-toastify";

const ShareCardModal = ({
  shareModal,
  handleLeadModal,
  handleShareModal,
  downLoadVcf,
  color,
  btnColor,
  textColor,
  linkBgColor,
  linkColor,
  QrSection,
  showContact,
  setshowContact,
  qrLogoUrl,
}) => {
  const style2 = {
    position: "absolute",
    top: "72%",

    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 420,
    width: "100%",
    height: 340,
    // bgcolor: "white",
    // border: '2px solid #000',
    // boxShadow: 24,
    border: "none",
    outline: "none",

    // p: "32px",
  };

  let [showQr, setshowQr] = useState(false);

  let [showShare, setshowShare] = useState(false);
  let toggleShowContact = () => {
    setshowContact(true);
  };
  let toggleHideContact = () => {
    setshowContact(false);
  };
  const currentUrl = window.location.href;
  let shareUrl = window.location.href;
  console.log(shareUrl);
  let sliceString = (str) => {
    if (str?.length > 40) {
      return str?.slice(0, 40) + "...";
    } else {
      return str;
    }
  };

  const downloadQRCode = () => {
    const qrCodeURL = document
      .getElementById("qrCodeEl")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "QR_Code.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };
  return (
    <div>
      <Modal
        open={shareModal}
        onClose={() => handleShareModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <div className="h-[100%] w-[96%] relative border rounded-[30px] bg-white shadow-lg">
            <RxCross2
              className="text-3xl absolute right-[3%] top-[38px] cursor-pointer"
              onClick={() => {
                handleShareModal(), setshowQr(false);
              }}
            />
            {(!showShare && !showQr) || showContact ? null : (
              <IoIosArrowBack
                className="text-3xl absolute left-[3%] top-[38px] cursor-pointer"
                onClick={() => {
                  setshowQr(false), setshowShare(false);
                }}
                // onClick={() => }
              />
            )}
            <div className="w-[100%] flex justify-center items-center mt-[30px]">
              <div
                className="h-[50px] w-[270px]   rounded-full flex justify-around items-center"
                style={{ border: `1px solid ${btnColor}` }}
              >
                <div
                  className="w-[45%] h-[85%] rounded-full   flex justify-center items-center text-white font-[500] cursor-pointer"
                  style={{
                    fontFamily: "Inter",
                    backgroundColor: showContact ? btnColor : "white",
                    color: showContact ? textColor : "black",
                  }}
                  onClick={() => {
                    toggleShowContact(), setshowQr(false);
                  }}
                >
                  Contact
                </div>
                <div
                  className="w-[45%] h-[85%] rounded-full flex justify-center items-center font-[500] cursor-pointer"
                  style={{
                    fontFamily: "Inter",
                    backgroundColor: !showContact ? btnColor : "white",
                    color: !showContact ? textColor : "black",
                  }}
                  onClick={() => toggleHideContact()}
                >
                  Share
                </div>
              </div>
            </div>
            {showContact ? (
              <>
                <div
                  className="w-[100%] text-center text-lg mt-[35px] font-[500]"
                  style={{
                    fontFamily: "Inter",
                    color: textColor,
                  }}
                >
                  Save your contact file
                </div>
                <div className="w-[100%] flex justify-center mt-[10px]">
                  <div
                    className="w-[75%] h-[55px]  rounded-full flex justify-center items-center shadow-lg text-lg  font-[500] cursor-pointer"
                    style={{
                      fontFamily: "Inter",
                      backgroundColor: btnColor,
                      color: textColor,
                    }}
                    onClick={() => {
                      downLoadVcf();
                    }}
                  >
                    Save Contact
                  </div>
                </div>
                <div
                  className="w-[100%] text-center  text-lg mt-[15px] font-[500]"
                  style={{
                    fontFamily: "Inter",
                    color: textColor,
                  }}
                >
                  OR
                </div>

                <div className="w-[100%] flex justify-center mt-[10px]">
                  <div
                    className="w-[75%] h-[55px] border  rounded-full flex justify-center items-center shadow-lg text-lg  font-[500] cursor-pointer"
                    style={{
                      border: `1px solid ${btnColor}`,
                      fontFamily: "Inter",
                      color: textColor,
                    }}
                    onClick={() => {
                      handleLeadModal(), handleShareModal();
                    }}
                  >
                    Exchange Contact
                  </div>
                </div>
              </>
            ) : !showQr ? (
              showShare ? (
                <>
                  <div
                    className="w-[100%] flex flex-col items-center text-lg mt-[35px] font-[500]"
                    style={{
                      fontFamily: "Inter",
                      color: textColor,
                    }}
                  >
                    <div
                      className="w-[90%] h-[40px] border rounded-full relative flex  items-center text-xs"
                      style={{ border: `1px solid ${btnColor}` }}
                    >
                      <p className="ml-[10px]">{sliceString(shareUrl)}</p>

                      <div
                        className="w-[30%] h-[100%] rounded-full absolute  right-[0px] flex justify-center items-center text-sm cursor-pointer"
                        style={{
                          backgroundColor: btnColor,
                          fontFamily: "Inter",
                          color: textColor,
                        }}
                        onClick={() => {
                          navigator.clipboard.writeText(shareUrl),
                            toast.success("Copied to clipboard");
                        }}
                      >
                        Copy Url
                      </div>
                    </div>
                    <div className="w-[100%] flex justify-evenly items-center mt-[20px] ">
                      <WhatsappShareButton
                        id="whatsapp"
                        url={shareUrl}
                        text={"Please find my Profile Link below:"}
                        hashtag="#React"
                      >
                        <div
                          className="w-[100px] rounded-full h-[40px] flex justify-center items-center text-white text-[10px] cursor-pointer"
                          style={{
                            backgroundColor: btnColor,
                            color: textColor,
                          }}
                        >
                          <div
                            className="h-[20px] w-[20px] rounded-full bg-white flex justify-center items-center mr-1"
                            style={{ backgroundColor: linkBgColor }}
                          >
                            <RiWhatsappFill style={{ color: linkColor }} />
                          </div>
                          Whatsapp
                        </div>
                      </WhatsappShareButton>
                      <FacebookShareButton
                        id="whatsapp"
                        url={shareUrl}
                        text={"Please find my Profile Link below:"}
                        hashtag="#React"
                      >
                        <div
                          className="w-[100px] rounded-full h-[40px] flex justify-center items-center text-white text-[10px] cursor-pointer"
                          style={{
                            backgroundColor: btnColor,
                            color: textColor,
                          }}
                        >
                          <div
                            className="h-[20px] w-[20px] rounded-full bg-white flex justify-center items-center mr-1"
                            style={{ backgroundColor: linkBgColor }}
                          >
                            <FaFacebookF style={{ color: linkColor }} />
                          </div>
                          Facebook
                        </div>
                      </FacebookShareButton>
                      <EmailShareButton
                        id="whatsapp"
                        url={shareUrl}
                        text={"Please find my Profile Link below:"}
                        hashtag="#React"
                      >
                        <div
                          className="w-[100px] rounded-full h-[40px] flex justify-center items-center text-white text-[10px] cursor-pointer"
                          style={{
                            backgroundColor: btnColor,
                            color: textColor,
                          }}
                        >
                          <div
                            className="h-[20px] w-[20px] rounded-full bg-white flex justify-center items-center mr-1"
                            style={{ backgroundColor: linkBgColor }}
                          >
                            <MdEmail style={{ color: linkColor }} />
                          </div>
                          Email
                        </div>
                      </EmailShareButton>
                    </div>

                    <div className="w-[100%] flex justify-evenly items-center mt-[20px] ">
                      <TelegramShareButton
                        id="whatsapp"
                        url={shareUrl}
                        text={"Please find my Profile Link below:"}
                        hashtag="#React"
                      >
                        <div
                          className="w-[100px] rounded-full h-[40px] flex justify-center items-center text-white text-[10px] cursor-pointer"
                          style={{
                            backgroundColor: btnColor,
                            color: textColor,
                          }}
                        >
                          <div
                            className="h-[20px] w-[20px] rounded-full bg-white flex justify-center items-center mr-1"
                            style={{ backgroundColor: linkBgColor }}
                          >
                            <BiLogoTelegram style={{ color: linkColor }} />
                          </div>
                          Telegram
                        </div>
                      </TelegramShareButton>
                      <TwitterShareButton
                        id="whatsapp"
                        url={shareUrl}
                        text={"Please find my Profile Link below:"}
                        hashtag="#React"
                      >
                        <div
                          className="w-[100px] rounded-full h-[40px] flex justify-center items-center text-white text-[10px] cursor-pointer"
                          style={{
                            backgroundColor: btnColor,
                            color: textColor,
                          }}
                        >
                          <div
                            className="h-[20px] w-[20px] rounded-full bg-white flex justify-center items-center mr-1"
                            style={{ backgroundColor: linkBgColor }}
                          >
                            <BiLogoTwitter style={{ color: linkColor }} />
                          </div>
                          Twitter
                        </div>
                      </TwitterShareButton>
                      <LinkedinShareButton
                        id="whatsapp"
                        url={shareUrl}
                        text={"Please find my Profile Link below:"}
                        hashtag="#React"
                      >
                        <div
                          className="w-[100px] rounded-full h-[40px] flex justify-center items-center text-white text-[10px] cursor-pointer"
                          style={{
                            backgroundColor: btnColor,
                            color: textColor,
                          }}
                        >
                          <div
                            className="h-[20px] w-[20px] rounded-full bg-white flex justify-center items-center mr-1"
                            style={{ backgroundColor: linkBgColor }}
                          >
                            <BiLogoLinkedin style={{ color: linkColor }} />
                          </div>
                          Linkedin
                        </div>
                      </LinkedinShareButton>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="w-[100%] text-center  text-lg mt-[35px] font-[500]"
                    style={{
                      fontFamily: "Inter",
                      color: textColor,
                    }}
                  >
                    Save your contact link
                  </div>
                  <div className="w-[100%] flex justify-center mt-[10px]">
                    <div
                      className="w-[75%] h-[55px] rounded-full flex justify-center items-center shadow-lg text-lg text-white font-[500] cursor-pointer"
                      style={{
                        fontFamily: "Inter",
                        backgroundColor: btnColor,
                      }}
                      onClick={() => setshowShare(true)}
                    >
                      Share Contact
                    </div>
                  </div>
                  <div
                    className="w-[100%] text-center  text-lg mt-[15px] font-[500]"
                    style={{
                      fontFamily: "Inter",
                      color: textColor,
                    }}
                  >
                    OR
                  </div>

                  <div className="w-[100%] flex justify-center mt-[10px]">
                    <div
                      className="w-[75%] h-[55px] border  rounded-full flex justify-center items-center shadow-lg text-lg  font-[500] cursor-pointer"
                      style={{
                        border: `1px solid ${btnColor}`,
                        fontFamily: "Inter",
                        color: textColor,
                      }}
                      onClick={() => setshowQr(true)}
                    >
                      Share Qr Code
                    </div>
                  </div>
                </>
              )
            ) : (
              <>
                <div
                  className="w-[100%] text-center  text-lg mt-[35px] font-[500]"
                  style={{
                    fontFamily: "Inter",
                    color: textColor,
                  }}
                >
                  Scan QR Code
                </div>
                <div className="w-[100%] flex justify-center mt-[10px]">
                  <QRCode
                    value={currentUrl}
                    size="100"
                    logoImage={qrLogoUrl}
                    // fgColor={qrColor ? qrColor : "black"}
                    logoOpacity="0.9"
                    logoWidth="50"
                    logoHeight="50"
                  />
                  <div style={{ display: "none" }}>
                    <QRCode
                      value={currentUrl}
                      id="qrCodeEl"
                      size="100"
                      // logoImage={qrLogoUrl}
                      // fgColor={qrColor ? qrColor : "black"}
                    />
                  </div>
                </div>
                <div className="w-[100%] flex justify-center items-center mt-4">
                  <div
                    className="w-[120px] h-[35px] rounded-full flex justify-center items-center text-xs cursor-pointer"
                    style={{
                      backgroundColor: btnColor,
                      fontFamily: "Inter",
                      color: textColor,
                    }}
                    onClick={() => downloadQRCode()}
                  >
                    Download Qr
                  </div>
                </div>
                {/* <div className="w-[100%] flex justify-center items-center">
                  <div>Download</div>
                </div> */}

                {/* <div className="w-[100%] flex justify-center mt-[10px]">
                <div
                  className="w-[75%] h-[55px] border  rounded-full flex justify-center items-center shadow-lg text-lg  font-[500] cursor-pointer"
                  style={{
                    border: `1px solid ${color}`,
                    fontFamily: "Inter",
                    color,
                  }}
                >
                  Share Qr Code
                </div>
              </div> */}
              </>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ShareCardModal;
