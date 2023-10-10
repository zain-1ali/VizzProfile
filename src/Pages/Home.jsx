import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase";
import { onValue, ref, update } from "firebase/database";
import { returnIcons } from "../assets/ReturnSocialIcons";
import Loader from "../assets/components/Loader";
import VCard from "vcard-creator";
import NotFound from "./NotFound";
import LeadformModal from "../assets/components/LeadformModal";
import ShareCardModal from "../assets/components/ShareCardModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { FaShareSquare } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import axios from "axios";

const Home = () => {
  let { userid } = useParams();
  let [userdata, setuserdata] = useState(null);
  let [sociallink, setsociallink] = useState([]);
  let [loading, setloading] = useState(false);
  let [profileData, setprofileData] = useState({});

  // console.log(sociallink);

  // ------------------getting Data--------------------

  let [usersdata, setusersdata] = useState(null);

  let [modal, setModal] = useState(0);

  let handleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    let getTheUser = async () => {
      setloading(true);
      try {
        await axios
          .get(
            `https://vizzapis.link2avicenna.com/api/getEmpLiveData/${userid}`
          )
          .then((resp) => {
            console.log("test", resp?.data?.data);
            setprofileData(resp?.data?.data);
            setModal(resp?.data?.data?.leadMode);
            setloading(false);
            // console.log(resp?.response?.data?.message);
            // toast.success(resp?.data?.message);
          });

        // console.log(res);
      } catch (error) {
        // console.log(error.response.data.message);
        // toast.error(error?.response?.data?.message);
      }
    };
    getTheUser();
  }, []);

  let [notfound, setnotfound] = useState(false);

  let [shareModal, setShareModal] = useState(false);
  let handleShareModal = () => {
    setShareModal(!shareModal);
  };

  let currentDate = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  console.log(userdata?.Analytics?.updatedAt);

  // ----------------------------------------->Analytics<-------------------------------------

  // ----------------------------------------->Link Analytics<-------------------------------------

  // -----------------------------------------hex to rgba for bg color-------------------------------------

  let hexToRGBA = (hex) => {
    // Remove the '#' character if present
    hex = hex?.replace("#", "");

    // Convert the hex value to RGB
    const red = parseInt(hex?.substring(0, 2), 16);
    const green = parseInt(hex?.substring(2, 4), 16);
    const blue = parseInt(hex?.substring(4, 6), 16);

    // Convert RGB to RGBA with alpha value 0.1
    const rgba = `rgba(${red}, ${green}, ${blue}, 0.1)`;

    return rgba;
  };

  // Download Vcf file

  console.log(sociallink);

  let returnSplitString = (string) => {
    if (string) {
      if (string?.length <= 151) {
        return string;
      } else {
        return string?.slice(0, 150) + "...";
      }
    }
  };
  let thebio =
    "This is my bio.I am react js developer, and want to pursue this field for a long run. This is my bio.I am react js developer, and want to pursue this field for a long run abc abc ab.";
  let directMode = false;

  let downLoadVcf = async () => {
    try {
      await axios
        .get(`https://vizzapis.link2avicenna.com/api/downloadVcf/${userid}`)
        .then((resp) => {
          console.log(resp);
          // setprofileData(resp?.data?.data);
          // setloading(false);
          // console.log(resp?.response?.data?.message);
          // toast.success(resp?.data?.message);
        });

      // console.log(res);
    } catch (error) {
      // console.log(error.response.data.message);
      // toast.error(error?.response?.data?.message);
    }
  };

  let returnSocialUrl = (links, linkid) => {
    let theLink = links?.find((elem) => {
      return elem?.linkId === linkid;
    });
    return theLink?.value;
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {notfound ? (
            <NotFound />
          ) : !profileData?.directMode ? (
            <div className="min-h-[100vh] max-w-[420px] w-[100%] flex flex-col items-center rounded-md  relative">
              {/* <ToastContainer position="top-center" autoClose={2000} /> */}

              <LeadformModal
                modal={modal}
                handleModal={handleModal}
                leadFields={profileData?.leadFields}
                color={profileData?.color}
                userid={userid}
                // userdata={userdata}
              />

              <ShareCardModal
                shareModal={shareModal}
                handleLeadModal={handleModal}
                handleShareModal={handleShareModal}
                downLoadVcf={() =>
                  window.open(
                    `https://vizzapis.link2avicenna.com/api/downloadVcf/${userid}`
                  )
                }
                color={profileData?.color}
              />

              <div
                className="w-[96%] shadow-lg min-h-[100vh] relative"
                style={{ backgroundColor: hexToRGBA(profileData?.color) }}
              >
                <div className="min-h-[245px] w-[100%] relative  object-cover">
                  <img
                    src={
                      profileData?.coverUrl
                        ? profileData?.coverUrl
                        : `https://placehold.co/390x185`
                    }
                    alt="background"
                    className="h-[185px] w-[100%] "
                  />

                  <div className="h-[130px] w-[100%] absolute top-[110px] flex">
                    <div className="h-[100%] w-[130px] relative ml-6">
                      <img
                        src={
                          profileData?.profileUrl
                            ? profileData?.profileUrl
                            : `https://placehold.co/130x130`
                        }
                        alt="profile"
                        className="h-[130px] w-[130px] rounded-full"
                      />
                    </div>
                  </div>

                  {/* <div className="w-[100%] flex justify-center mt-[70px] ">
                    <h2 className="text-2xl font-medium">{userdata?.name}</h2>
                  </div> */}
                </div>
                <div className="w-[100%] flex justify-center mt-[5px]">
                  <div className="w-[90%]">
                    <h2
                      className="font-[600] text-[25px] "
                      style={{ color: profileData?.color, fontFamily: "Inter" }}
                    >
                      {profileData?.name}
                    </h2>
                    <div className="w-[100%] flex justify-between">
                      <div
                        className=" w-[4px] h-[135px]"
                        style={{ backgroundColor: profileData?.color }}
                      ></div>
                      <div className="w-[97%]">
                        <h2
                          style={{ fontFamily: "Inter" }}
                          className="font-[500] text-[18px]"
                        >
                          React js developer
                        </h2>
                        <p
                          style={{ fontFamily: "Inter" }}
                          className="font-[400]  text-[#cccccc] text-[18px]"
                        >
                          Avicenna Enterprises Solutions
                        </p>
                        <p
                          style={{ fontFamily: "Inter" }}
                          className="font-[300]  text-[#cccccc] text-[14px] mt-[2px]"
                        >
                          {returnSplitString(profileData?.bio)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[100%] flex justify-evenly mt-3">
                  <button
                    style={{
                      backgroundColor: profileData?.color,
                      fontFamily: "Inter",
                    }}
                    className="w-[50%] h-[50px] rounded-full  flex justify-center items-center text-white font-[700] "
                    onClick={() =>
                      window.open(
                        `https://vizzapis.link2avicenna.com/api/downloadVcf/${userid}`
                      )
                    }
                  >
                    <IoMdDownload
                      style={{
                        marginRight: "6px",
                        fontSize: "18px",
                      }}
                    />
                    Save Contact
                  </button>
                  <button
                    className="w-[35%] h-[50px] rounded-full bg-black flex justify-center items-center text-white font-[700]"
                    onClick={() => handleShareModal()}
                  >
                    <FaShareSquare
                      style={{ marginRight: "6px", fontSize: "16px" }}
                    />{" "}
                    Share
                  </button>
                </div>

                <div className="w-[100%] flex flex-col items-center mt-3">
                  {/* absolute bottom-[2%] */}
                  {/* <div className="w-[90%] border"></div> */}
                  <div className="max-w-[90%] w-[100%]  border-t border-b h-[140px] flex justify-center items-center">
                    <div className="w-[95%] h-[94%]  flex  flex-wrap overflow-y-scroll scrollbar-hide">
                      {profileData?.links?.map((elm) => {
                        return (
                          <div className="h-[70px] w-[20%] flex flex-col justify-center items-center ">
                            <div
                              className="h-[45px] w-[45px] rounded-full  flex justify-center items-center text-xl"
                              style={{ backgroundColor: profileData?.color }}
                              onClick={() => window.open(elm?.value)}
                            >
                              {returnIcons(elm?.name)}
                            </div>
                            <p className="mt-1 text-[10px]">{elm?.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <p
                    // style={{ color }}

                    style={{ color: profileData?.color, fontFamily: "Inter" }}
                    className="font-[600] text-[12px] mt-3"
                  >
                    Powered by{" "}
                    <span className="font-[700] text-[14px] text-black">
                      VIZZ
                    </span>
                  </p>
                  <div
                    style={{ color: profileData?.color, fontFamily: "Inter" }}
                    className="font-[400] text-[10px] "
                  >
                    www.vizz.store
                  </div>
                </div>
              </div>
            </div>
          ) : (
            window.open(
              returnSocialUrl(profileData?.links, profileData?.directLinkId)
            )
          )}
        </>
      )}
    </>
  );
};

export default Home;
