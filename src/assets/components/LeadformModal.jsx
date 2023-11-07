import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { push, ref, update } from "firebase/database";
import { getDownloadURL, uploadBytes, ref as sRef } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { db, storage } from "../../Firebase";
import axios from "axios";

const LeadformModal = ({
  modal,
  handleModal,
  leadFields,
  color,
  userid,
  updateAnalytics,
}) => {
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 330,
    minHeight: 250,
    bgcolor: "white",
    // border: '2px solid #000',
    boxShadow: 24,
    border: "none",
    outline: "none",
    borderRadius: "18px",
    // p: "32px",
  };

  let [showExtra, setshowExtra] = useState(false);

  let toggleShowExtra = () => {
    setshowExtra(!showExtra);
  };

  let [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    job: "",
    company: "",
    message: "",
  });

  let [img, setimg] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setimg(e.target.files[0]);
    }
  };

  // Get the current date
  const currentDate = new Date();

  // Function to get the abbreviated month name
  function getMonthAbbreviation(date) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[date.getMonth()];
  }

  // Function to add leading zero to single-digit day
  function addLeadingZero(number) {
    return number < 10 ? "0" + number : number;
  }

  // Extract day, month, and year
  const day = addLeadingZero(currentDate.getDate());
  const month = getMonthAbbreviation(currentDate);
  const year = currentDate.getFullYear();

  // Format the date string
  const formattedDate = `${month} ${day},${year}`;

  const addData = async () => {
    try {
      await axios
        .post(`https://vizzapis.link2avicenna.com/api/submitLead/`, {
          userId: userid,
          name: data?.name,
          email: data?.email,
          job: data?.job,
          company: data?.company,
          phone: data?.phone,
          note: data?.message,
        })
        .then((resp) => {
          setData({
            name: "",
            email: "",
            phone: "",
            job: "",
            company: "",
            message: "",
          });
          toast.success("Submited successfuly");
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

  return (
    <div>
      <Modal
        open={modal}
        onClose={() => handleModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <div className="h-[100%] w-[100%] overflow-y-scroll scrollbar-hide flex flex-col items-center pb-2">
            <div className="w-[100%] mt-4 flex justify-center ">
              {/* <div className="w-"> */}
              <h2 className="w-[85%] text-center text-lg font-medium border-b ">
                {leadFields?.formHeader}
              </h2>
              {/* </div> */}
            </div>

            <div class="w-[90%]  mt-[15px] bg-white ">
              {/* <h2 class="font-medium text-lg">Contact me</h2> */}
              {/* <img
            src={img ? URL.createObjectURL(img) : `https://placehold.co/85x85`}
              alt=""
              class="h-[85px] w-[85px] rounded-full object-cover "
            />
            <label for="img">
              <div class="w-[93px] h-[26px] bg-[#0b567f] text-white mt-2 rounded-xl text-sm flex justify-center items-center cursor-pointer">
                Add image
              </div>
              <input
                type="file"
                name="img"
                id="img"
                class="opacity-0 w-[0px] h-[0px]"
                onChange={handleImageChange}
              />
            </label> */}
              {leadFields?.nameVisible && (
                <div class="mt-2">
                  {/* <p class="ml-2">Name*</p> */}
                  <input
                    type="text"
                    placeholder="Enter Name"
                    class="outline-none p-2 w-[100%]  border rounded-3xl mt-[2px]"
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    value={data.name}
                  />
                </div>
              )}
              {leadFields?.emailVisible ? (
                <div class="mt-2">
                  {/* <p class="ml-2">Email*</p> */}
                  <input
                    type="text"
                    placeholder="Enter Email"
                    class="outline-none p-2 w-[100%]  border rounded-3xl mt-[2px]"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    value={data.email}
                  />
                </div>
              ) : null}
              {leadFields?.phoneVisible ? (
                <div class="mt-2">
                  {/* <p class="ml-2">Phone Number*</p> */}
                  <input
                    type="text"
                    placeholder="Enter Phone"
                    class="outline-none p-2 w-[100%]  border rounded-3xl mt-[2px]"
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
                    }
                    value={data.phone}
                  />
                </div>
              ) : null}
              {/* {userdata?.leadForm?.job ||
              userdata?.leadForm?.note ||
              userdata?.leadForm?.company ? (
                <div class="flex items-center ml-2 mt-2 cursor-pointer">
                  More options{" "}
                  {showExtra ? (
                    <MdKeyboardArrowUp onClick={() => toggleShowExtra()} />
                  ) : (
                    <MdKeyboardArrowDown onClick={() => toggleShowExtra()} />
                  )}
                </div>
              ) : null} */}
              {/* {showExtra && ( */}
              <div>
                {leadFields?.jobVisible ? (
                  <div class="mt-2">
                    {/* <p class="ml-2">Job</p> */}
                    <input
                      type="text"
                      placeholder="Enter Job"
                      class="outline-none p-2 w-[100%]  border rounded-3xl mt-[2px]"
                      onChange={(e) =>
                        setData({ ...data, job: e.target.value })
                      }
                      value={data.job}
                    />
                  </div>
                ) : null}

                {leadFields?.companyVisible ? (
                  <div class="mt-2">
                    {/* <p class="ml-2">Company</p> */}
                    <input
                      type="text"
                      placeholder="Enter Company"
                      class="outline-none p-2 w-[100%]  border rounded-3xl mt-[2px]"
                      onChange={(e) =>
                        setData({ ...data, company: e.target.value })
                      }
                      value={data.company}
                    />
                  </div>
                ) : null}

                {leadFields?.noteVisible ? (
                  <div class="mt-2">
                    {/* <p class="ml-2">Message</p> */}
                    <textarea
                      type="text"
                      placeholder="Enter Note"
                      class="outline-none p-2 w-[100%]  border rounded-3xl mt-[2px] h-[150px]"
                      onChange={(e) =>
                        setData({ ...data, message: e.target.value })
                      }
                      value={data.message}
                    ></textarea>
                  </div>
                ) : null}
              </div>
              {/* // )} */}
              <div className="w-[100%] flex justify-center mt-[20px]">
                <div
                  class="w-[45%] border rounded-3xl  h-[46px]  flex justify-center items-center text-white cursor-pointer mr-2"
                  onClick={() => {
                    addData(),
                      updateAnalytics({
                        action: "contact",
                      });
                  }}
                  style={{ backgroundColor: color }}
                >
                  Submit
                </div>
                <div
                  class="w-[45%] border rounded-3xl  h-[46px]  flex justify-center items-center text-white cursor-pointer ml-2"
                  onClick={() => handleModal()}
                  style={{ backgroundColor: color }}
                >
                  Cancel
                </div>
              </div>
            </div>
            <br />

            {/* <ToastContainer position="top-center" autoClose={2000} /> */}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default LeadformModal;
