import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { QRCode } from "react-qrcode-logo";

const ShareCardModal = ({
  shareModal,
  handleLeadModal,
  handleShareModal,
  downLoadVcf,
  color,
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

  let [showContact, setshowContact] = useState(true);
  let [showQr, setshowQr] = useState(false);

  let toggleShowContact = () => {
    setshowContact(true);
  };
  let toggleHideContact = () => {
    setshowContact(false);
  };
  const currentUrl = window.location.href;

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
            <div className="w-[100%] flex justify-center items-center mt-[30px]">
              <div
                className="h-[50px] w-[270px]   rounded-full flex justify-around items-center"
                style={{ border: `1px solid ${color}` }}
              >
                <div
                  className="w-[45%] h-[85%] rounded-full   flex justify-center items-center text-white font-[500] cursor-pointer"
                  style={{
                    fontFamily: "Inter",
                    backgroundColor: showContact ? color : "white",
                    color: showContact ? "white" : "black",
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
                    backgroundColor: !showContact ? color : "white",
                    color: !showContact ? "white" : "black",
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
                    color,
                  }}
                >
                  Save your contact file
                </div>
                <div className="w-[100%] flex justify-center mt-[10px]">
                  <div
                    className="w-[75%] h-[55px]  rounded-full flex justify-center items-center shadow-lg text-lg text-white font-[500] cursor-pointer"
                    style={{
                      fontFamily: "Inter",
                      backgroundColor: color,
                    }}
                    onClick={() => downLoadVcf()}
                  >
                    Save Contact
                  </div>
                </div>
                <div
                  className="w-[100%] text-center text-[#BCBCBC] text-lg mt-[15px] font-[500]"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  OR
                </div>

                <div className="w-[100%] flex justify-center mt-[10px]">
                  <div
                    className="w-[75%] h-[55px] border  rounded-full flex justify-center items-center shadow-lg text-lg  font-[500] cursor-pointer"
                    style={{
                      border: `1px solid ${color}`,
                      fontFamily: "Inter",
                      color,
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
              <>
                <div
                  className="w-[100%] text-center  text-lg mt-[35px] font-[500]"
                  style={{
                    fontFamily: "Inter",
                    color,
                  }}
                >
                  Save your contact link
                </div>
                <div className="w-[100%] flex justify-center mt-[10px]">
                  <div
                    className="w-[75%] h-[55px] rounded-full flex justify-center items-center shadow-lg text-lg text-white font-[500] cursor-pointer"
                    style={{
                      fontFamily: "Inter",
                      backgroundColor: color,
                    }}
                  >
                    Share Contact
                  </div>
                </div>
                <div
                  className="w-[100%] text-center text-[#BCBCBC] text-lg mt-[15px] font-[500]"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  OR
                </div>

                <div className="w-[100%] flex justify-center mt-[10px]">
                  <div
                    className="w-[75%] h-[55px] border  rounded-full flex justify-center items-center shadow-lg text-lg  font-[500] cursor-pointer"
                    style={{
                      border: `1px solid ${color}`,
                      fontFamily: "Inter",
                      color,
                    }}
                    onClick={() => setshowQr(true)}
                  >
                    Share Qr Code
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="w-[100%] text-center  text-lg mt-[35px] font-[500]"
                  style={{
                    fontFamily: "Inter",
                    color,
                  }}
                >
                  Share your QR Code
                </div>
                <div className="w-[100%] flex justify-center mt-[10px]">
                  <QRCode
                    value={currentUrl}
                    size="100"
                    // logoImage={qrLogo}
                    // fgColor={qrColor ? qrColor : "black"}
                    // logoOpacity="0.9"
                    // logoWidth="90"
                    // logoHeight="90"
                  />
                </div>

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
