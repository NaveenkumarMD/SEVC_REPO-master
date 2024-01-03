import React, { useContext, useEffect, useState } from "react";
import { Button, message, Steps } from "antd";
import Navbar from "../Navbar";
import { Progress } from "antd";
import { red, green } from "@ant-design/colors";
import Footer from "../Footer";
import "../../css/dashboard.css";
import {
  where,
  limit,
  doc,
  collection,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { Context } from "../../App";
//storage
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../Firebase/init";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [current, setCurrent] = useState(0);
  const [teamDetails, setTeamDetails] = useState({});
  const { state, dispatch } = useContext(Context);
  const [teamdetailsDisabled, setTeamdetailsDisabled] = useState(false);
  const [membersdetailsdisabled, setmemberdetailsdeisabled] = useState(true);
  const [phase1disabled, setphase1disabled] = useState(true);
  const [phase2disabled, setphase2disabled] = useState(true);
  const [phase3disabled, setphase3disabled] = useState(true);
  const [initialpaymentpaid, setinitialpaymentpaid] = useState(true);
  useEffect(() => {
    if ("payment" in state.userdata) {
      setinitialpaymentpaid(true);
    } else {
      setinitialpaymentpaid(true);
    }
  }, [state.user]);
  useEffect(() => {
    if (state.userdata) {
      setTeamDetails(state.userdata);
    } else {
      return message.error("Please login to continue");
    }
    // if ('payment' in state.userdata) {
    //     if (state.userdata.payment) {
    //         setCurrent(0)
    //     }
    //     else {
    //         setTeamdetailsDisabled(true)
    //         message.error("Please pay the registration fee  and contat the SEVC team to activate your account")
    //         return
    //     }
    // }
    // else {
    //     setTeamdetailsDisabled(true)
    //     message.error('Please pay the registration fee  and contat the SEVC team to activate your account')
    //     return
    // }

    if ("teamDetails" in state.userdata) {
      setCurrent(1);
      // setTeamdetailsDisabled(true)
    }
    if (initialpaymentpaid && !("teamDetails" in state.userdata)) {
      setTeamdetailsDisabled(false);
    }

    if ("memberDetails" in state.userdata) {
      setCurrent(2);
      setTeamdetailsDisabled(true);
    }
    if (
      "teamDetails" in state.userdata &&
      !("memberDetails" in state.userdata)
    ) {
      setmemberdetailsdeisabled(false);
    }
    if ("phase1" in state.userdata) {
      setCurrent(3);
      setmemberdetailsdeisabled(true);
      setphase1disabled(true);
    }
    if ("memberDetails" in state.userdata && !("phase1" in state.userdata)) {
      setphase1disabled(false);
    }

    if ("phase2" in state.userdata) {
      setCurrent(4);
      setphase1disabled(true);
      setphase2disabled(true);
    }
    if ("phase1" in state.userdata && !("phase2" in state.userdata)) {
      setphase2disabled(false);
    }
    if ("phase3" in state.userdata) {
      setCurrent(4);
      setphase2disabled(true);
      setphase3disabled(true);
      message.success(
        "You have successfully completed the registration process"
      );
    }
    if ("phase2" in state.userdata && !("phase3" in state.userdata)) {
      setphase3disabled(false);
    }
  }, [initialpaymentpaid, state.userdata]);
  useEffect(() => {
    const q1 = query(
      collection(db, "users"),
      where("team_name", "==", state.userdata.team_name),
      limit(1)
    );
    getDocs(q1).then((querySnapshot1) => {

      querySnapshot1.forEach(async (docx) => {
        dispatch({
          type: "LOGIN",
          payload: docx.data(),
        });
      });
    });
  }, []);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  let teamdetailsprops = {
    handlenext: next,
    handleprev: prev,
    disabled: false,
  };
  let paymentprops = {
    handlenext: next,
    disabled: false,
  };
  let phase1props = {
    handlenext: next,
    handleprev: prev,
    disabled: false, //phase1disabled
  };
  let phase2props = {
    handlenext: next,
    handleprev: prev,
    disabled: false, // phase2disabled
  };
  let phase3props = {
    handlenext: next,
    handleprev: prev,
    disabled: false, // phase3disabled
  };
  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-container">
          <Steps
            type="navigation"
            size="default"
            current={current}
            className="site-navigation-steps"
            items={[
              {
                status: "process",
                title: "Team details",
              },
              {
                status: "process",
                title: "Member details",
              },
              {
                status: "process",
                title: "Phase-1",
              },
              {
                status: "process",
                title: "Phase-2",
              },
              {
                status: "process",
                title: "Phase-3",
              },
            ]}
          />
          {current === 0 && <Payment {...paymentprops} />}
          {current === 1 && <Teamdetails {...teamdetailsprops} />}
          {current == 2 && <Phase1 {...phase1props} />}
          {current == 3 && <Phase2 {...phase2props} />}
          {current == 4 && <Phase3 {...phase3props} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

const Payment = (props) => {
  const [teammemberscount, setTeammemberscount] = useState(1);
  const { handlenext } = props;
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    if ("teamDetails" in state.userdata) {
      setcollegeData({
        ...state.userdata.teamDetails.collegedata,
      });
      setbankDetails({
        ...state.userdata.teamDetails.bankdata,
      });
      setfacultyAdvisorDetails(state.userdata.teamDetails.facultydata);
    }
    if (!("team_name" in state.userdata)) {
      message.error("Please fill the team details first");
      return;
    }
  }, []);

  const [collegeData, setcollegeData] = useState({
    institute_full_name: "",
    institute_full_address: "",
    city: "",
    state: "",
    website: "",
    institute_mobile_number: "",
  });
  const [bankDetails, setbankDetails] = useState({
    bank_name: "",
    account_holder_name: "",
    account_number: "",
    ifsc_code: "",
    branch: "",
    micr_code: "",
  });
  const [facultyAdvisorDetails, setfacultyAdvisorDetails] = useState([
    {
      name: "",
      gender: "",
      educational_qualification: "",
      email: "",
      phone_number: "",
      designation: "",
      department: "",
    },
  ]);

  let a = 0;

  // const addteammembers = () => {
  //     return null
  //     if (teammemberscount >= 16) {
  //         return alert('Maximum 16 members allowed')
  //     }
  //     let advisorarray = [...facultyAdvisorDetails]

  //     advisorarray.push({
  //         name: "",
  //         gender: "",
  //         educational_qualification: "",
  //         email: "",
  //         phone_number: "",
  //         designation: "",
  //         department: ""
  //     })
  //     console.log(advisorarray)

  //     setfacultyAdvisorDetails(advisorarray)
  //     setTeammemberscount(teammemberscount + 1)
  // }
  useEffect(() => {
    setTeammemberscount(a);
  }, [a]);

  const institutedatachange = (e) => {
    setcollegeData({ ...collegeData, [e.target.name]: e.target.value });
  };
  const bankdatachange = (e) => {
    setbankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  };
  const facultydatachange = (e, index) => {
    let advisorarray = [...facultyAdvisorDetails];
    advisorarray[index][e.target.name] = e.target.value;
    setfacultyAdvisorDetails(advisorarray);
  };

  const handlesubmit = async () => {
    if (props.disabled && state.userdata.initialpaymentpaid) {
      handlenext();
      return;
    }
    let data = {
      collegedata: collegeData,
      bankdata: bankDetails,
      facultydata: facultyAdvisorDetails,
    };

    if (
      Object.values(collegeData).includes("")
      // || Object.values(bankDetails).includes('') || Object.values(facultyAdvisorDetails[0]).includes('')
    ) {
      return message.error("Please fill the college data");
    }

    const q = query(
      collection(db, "users"),
      where("team_name", "==", state.userdata.team_name),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    let docid = "";
    if (querySnapshot.docs.length == 0) {
      return message.error("Contact SEVC team");
    }
    querySnapshot.forEach(async (docx) => {
      docid = docx.id;
      await updateDoc(doc(db, "users", docid), {
        teamDetails: data,
      });
    });
    const q1 = query(
      collection(db, "users"),
      where("team_name", "==", state.userdata.team_name),
      limit(1)
    );
    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach(async (docx) => {
      dispatch({
        type: "LOGIN",
        payload: docx.data(),
      });
    });
    handlenext();
  };
  return (
    <div className="dashboard-data">
      <div
        className="contact-form"
        style={{
          filter: props.disabled ? "blur(1px)" : "none",
          pointerEvents: props.disabled ? "none" : "all",
        }}
      >
        <>
          <div className="text3">Institute details</div>
          <div className="input-containerx">
            <label>Institute Full Name</label>
            <br />
            <textarea
              name="institute_full_name"
              value={collegeData.institute_full_name}
              onChange={institutedatachange}
              style={{ height: "50px", padding: "10px 20px " }}
              placeholder="any questions...."
            ></textarea>
          </div>
          <div className="input-containerx">
            <label>Institute Full Address</label>
            <br />
            <textarea
              name="institute_full_address"
              value={collegeData.institute_full_address}
              onChange={institutedatachange}
              style={{ height: "100px", padding: "10px 20px " }}
              placeholder="any questions...."
            ></textarea>
          </div>
          <div className="input-container">
            <label>City</label>
            <br />
            <input
              name="city"
              value={collegeData.city}
              onChange={institutedatachange}
            />
          </div>
          <div className="input-container">
            <label>State</label>
            <br />
            <input
              name="state"
              value={collegeData.state}
              onChange={institutedatachange}
            />
          </div>
          <div className="input-container">
            <label>Website</label>
            <br />
            <input
              name="website"
              value={collegeData.website}
              onChange={institutedatachange}
            />
          </div>
          <div className="input-container">
            <label>Mobile number</label>
            <br />
            <input
              name="institute_mobile_number"
              value={collegeData.institute_mobile_number}
              onChange={institutedatachange}
            />
          </div>
        </>
        <>
          <div className="text3">Bank Account details</div>
          <div className="input-containerx">
            <label>Account Holder Name</label>
            <br />
            <textarea
              name="account_holder_name"
              value={bankDetails.account_holder_name}
              onChange={bankdatachange}
              style={{ height: "50px", padding: "10px 20px " }}
              placeholder="any questions...."
            ></textarea>
          </div>
          <div className="input-containerx">
            <label>Account Number</label>
            <br />
            <textarea
              name="account_number"
              value={bankDetails.account_number}
              onChange={bankdatachange}
              style={{ height: "50px", padding: "10px 20px " }}
              placeholder="any questions...."
            ></textarea>
          </div>
          <div className="input-container">
            <label>Bank Name</label>
            <br />
            <input
              name="bank_name"
              value={bankDetails.bank_name}
              onChange={bankdatachange}
            />
          </div>
          <div className="input-container">
            <label>Branch</label>
            <br />
            <input
              name="branch"
              value={bankDetails.branch}
              onChange={bankdatachange}
            />
          </div>
          <div className="input-container">
            <label>IFSC code</label>
            <br />
            <input
              name="ifsc_code"
              value={bankDetails.ifsc_code}
              onChange={bankdatachange}
            />
          </div>
          <div className="input-container">
            <label>MICR code</label>
            <br />
            <input
              name="micr_code"
              value={bankDetails.micr_code}
              onChange={bankdatachange}
            />
          </div>
        </>
        <div className="text3">
          Facult Advisor's Details ({teammemberscount})
        </div>

        <>
          {[...Array(teammemberscount)].map((e, i) => {
            a += 1;
            return (
              <>
                <div className="input-container">
                  <label>Name</label>
                  <br />
                  <input
                    name="name"
                    value={facultyAdvisorDetails[i].name}
                    onChange={(e) => facultydatachange(e, i)}
                  />
                </div>
                <div className="input-container">
                  <label>Gender</label>
                  <br />
                  <input
                    name="gender"
                    value={facultyAdvisorDetails[i].gender}
                    onChange={(e) => facultydatachange(e, i)}
                  />
                </div>
                <div className="input-containerx">
                  <label>Educational qualification</label>
                  <br />
                  <textarea
                    name="educational_qualification"
                    value={facultyAdvisorDetails[i].educational_qualification}
                    onChange={(e) => facultydatachange(e, i)}
                    style={{ height: "50px", padding: "10px 20px " }}
                    placeholder="any questions...."
                  ></textarea>
                </div>

                <div className="input-container">
                  <label>Email ID</label>
                  <br />
                  <input
                    name="email"
                    value={facultyAdvisorDetails[i].email}
                    onChange={(e) => facultydatachange(e, i)}
                  />
                </div>
                <div className="input-container">
                  <label>Phone Number</label>
                  <br />
                  <input
                    name="phone_number"
                    value={facultyAdvisorDetails[i].phone_number}
                    onChange={(e) => facultydatachange(e, i)}
                  />
                </div>
                <div className="input-container">
                  <label>Department</label>
                  <br />
                  <input
                    name="department"
                    value={facultyAdvisorDetails[i].department}
                    onChange={(e) => facultydatachange(e, i)}
                  />
                </div>
                <div className="input-container">
                  <label>Designation</label>
                  <br />
                  <input
                    name="designation"
                    value={facultyAdvisorDetails[i].designation}
                    onChange={(e) => facultydatachange(e, i)}
                  />
                </div>
              </>
            );
          })}
        </>

        {/* <div className='add-member-btn' onClick={addteammembers}>Add member +</div> */}
      </div>
      <div className="add-member-btn" onClick={handlesubmit}>
        Next
      </div>
    </div>
  );
};
const Mentordetails = () => {
  return <div>Mentor</div>;
};
const Teamdetails = (props) => {
  const [teammemberscount, setTeammemberscount] = useState(1);
  const { handlenext, handleprev, disabled } = props;
  const { state, dispatch } = useContext(Context);
  let a = 0;
  useEffect(() => {
    if ("memberDetails" in state.userdata) {
      setTeammemberscount(state.userdata.memberDetails.memberDetails.length);
      setTeamDetails(state.userdata.memberDetails.memberDetails);
    }
  }, []);
  const [teamDetails, setTeamDetails] = useState([
    {
      name: "",
      email: "",
      phone_number: "",
      department: "",
      designation: "team_member",
    },
  ]);
  const teamdatachange = (e, i) => {
    const { name, value } = e.target;
    const list = [...teamDetails];
    list[i][name] = value;
    setTeamDetails(list);
  };

  const addteammembers = () => {
    if (teammemberscount >= 35) {
      return alert("Maximum 35 members allowed");
    }
    let team_array = [...teamDetails];

    team_array.push({
      name: "",
      email: "",
      phone_number: "",
      department: "",
      designation: "team_member",
      yos: "",
    });
    setTeamDetails(team_array);
    setTeammemberscount((prev) => prev + 1);
  };
  const removeteammembers = async () => {
    if (teammemberscount <= 1) {
      return message.error("Team members count can't be less than one");
    }
    let team_array = [...teamDetails];
    team_array.pop();
    setTeamDetails(team_array);
    setTeammemberscount((prev) => prev - 1);
  };
  // useEffect(() => {
  //     setTeammemberscount(a)
  // }, [a])
  const handlesubmit = async () => {
    if (props.disabled && "teamDetails" in state.userdata) {
      handlenext();
      return;
    }
    if (teamDetails.length === 0) {
      return message.error("Please add atleast one team member");
    }
    message.info("Please wait while we are updating your details");
    let team_array = [...teamDetails];
    let flag = false;
    team_array.map((item, i) => {
      if (
        item.name === "" ||
        item.email === "" ||
        item.phone_number === "" ||
        item.department === ""
      ) {
        flag = true;
      }
    });
    if (flag) {
      return message.error("Please fill all the fields");
    }
    let data = {
      memberDetails: teamDetails,
    };
    //update firebase
    const q = query(
      collection(db, "users"),
      where("team_name", "==", state.userdata.team_name),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    let docid = "";
    if (querySnapshot.docs.length === 0) {
      return message.error("Contact SEVC team");
    }
    querySnapshot.forEach(async (docx) => {
      docid = docx.id;
      await updateDoc(doc(db, "users", docid), {
        memberDetails: data,
      });
    });
    const q1 = query(
      collection(db, "users"),
      where("team_name", "==", state.userdata.team_name),
      limit(1)
    );
    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach(async (docx) => {
      dispatch({
        type: "LOGIN",
        payload: docx.data(),
      });
    });
  };

  return (
    <div className="dashboard-data">
      <div className="d-text1">Team members:{teammemberscount}</div>
      <div
        className="contact-form"
        style={{
          filter: disabled ? "blur(1px)" : "none",
          pointerEvents: disabled ? "none" : "auto",
        }}
      >
        {teammemberscount &&
          [...Array(teammemberscount)].map((e, i) => {

            a += 1;
            return (
              <>
                <div className="text3">Team Member {a}</div>
                <div className="input-container">
                  <label>Name</label>
                  <br />
                  <input
                    name="name"
                    value={teamDetails[i].name}
                    onChange={(e) => teamdatachange(e, i)}
                  />
                </div>
                <div className="input-container">
                  <label>E-mail ID</label>
                  <br />
                  <input
                    name="email"
                    value={teamDetails[i].email}
                    onChange={(e) => teamdatachange(e, i)}
                  />
                </div>
                <div className="input-container">
                  <label>Mobile</label>
                  <br />
                  <input
                    name="phone_number"
                    value={teamDetails[i].phone_number}
                    onChange={(e) => teamdatachange(e, i)}
                  />
                </div>
                <div className="input-container">
                  <label>Department</label>
                  <br />
                  <input
                    name="department"
                    value={teamDetails[i].department}
                    onChange={(e) => teamdatachange(e, i)}
                  />
                </div>
                <div className="input-container">
                  <label>Designation</label>
                  <br />
                  <select
                    value={teamDetails[i].designation}
                    name="designation"
                    defaultValue="team_member"
                    onChange={(e) => teamdatachange(e, i)}
                  >
                    <option value="captain">Captain</option>
                    <option value="vice_captain">Vice-Captain</option>
                    <option value="production_head">Production Head</option>
                    <option value="vehicle_quality_head">
                      Vehicle Quality Head(VQH)
                    </option>
                    <option value="marketing_head">Marketing Head</option>
                    <option value="team_member">Team Member</option>
                  </select>
                </div>
                <div className="input-container">
                  <label>Year of Study</label>
                  <br />
                  <input
                    placeholder="ex:2019-2023"
                    name="yos"
                    value={teamDetails[i].yos}
                    onChange={(e) => teamdatachange(e, i)}
                  />
                </div>
              </>
            );
          })}
        <div className="add-member-btn" onClick={removeteammembers}>
          Remove member -
        </div>
        <div className="add-member-btn" onClick={addteammembers}>
          Add member +
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="add-member-btn" onClick={handleprev}>
          Previous
        </div>
        <div className="add-member-btn" onClick={handlesubmit}>
          Next
        </div>
      </div>
    </div>
  );
};
const Phase1 = (props) => {
  const { handlenext, handleprev, disabled } = props;
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const { state, dispatch } = useContext(Context);
  const [data, setData] = useState({
    transactionID: "",
    amountpaid: "",
  });
  const phasedatachange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async () => {
    if (data.transactionID && data.transactionID.length !== 12) {
      return message.error(
        "Transaction ID must be present and be of 12 digits"
      );
    }
    if (props.disabled || "phase1" in state.userdata) {
      if ("phase1" in state.userdata) {
        if (state.userdata.phase1payment) {
          handlenext();
          return;
        } else {
          return message.error("Please wait for approval");
        }
      }
    }
    let url = await handleUpload();
    let data1 = {
      transactionID: data.transactionID,
      amountpaid: data.amountpaid,
      paymentreceipt: url,
      approved: false,
    };
    if (data.transactionID === "" || data.amountpaid === "") {
      return message.error("Please fill all the fields");
    }
    message.info("Processing...");

    if (url === "") {
      return message.error("Please upload the payment receipt");
    }

    //update firebase
    const q = query(
      collection(db, "users"),
      where("team_name", "==", state.userdata.team_name),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    let docid = "";
    if (querySnapshot.docs.length == 0) {
      return message.error("Contact SEVC team");
    }
    querySnapshot.forEach(async (docx) => {
      docid = docx.id;
      await updateDoc(doc(db, "users", docid), {
        phase1: data1,
      });
    });
    const q1 = query(
      collection(db, "users"),
      where("team_name", "==", state.userdata.team_name),
      limit(1)
    );
    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach(async (docx) => {
      dispatch({
        type: "LOGIN",
        payload: docx.data(),
      });
    });
    message.info(
      "Payment details submitted successfully should be approved by the SEVC"
    );
  };
  //handle file input and store it in firebase bucket

  useEffect(() => {
    if ("phase1" in state.userdata) {
      setData(state.userdata.phase1);
    }
  });
  const handleChange = async (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleUpload = () =>
    new Promise((resolve, reject) => {
      if (file === null) {
        return message.error("Please select a file");
      }
      const storageref = ref(
        storage,
        `payment_receipts/${state.userdata.team_name}/phase1`
      );

      const uploadtask = uploadBytesResumable(storageref, file);
      uploadtask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadtask.snapshot.ref).then((url) => {
            message.info("uploaded");
            setUrl(url);
            resolve(url);
          });
        }
      );
    });

  return (
    <div className="dashboard-data">
      <div
        className="phase-desc"
        style={{
          filter: disabled ? "blur(5px)" : "none",
          pointerEvents: disabled ? "none" : "auto",
        }}
      >
        <div className="desc">
          Kindly make the payment of your phase 1 registration fee of ₹11,800
          via UPI ID or by scanning the QR Code and fill the form below. You are
          instructed to upload the payment proof in this form itself.
        </div>
        <div className="payment-details">
          <div className="desc1">
            UPI ID : sevcevent@oksbi
            <br />
            G-Pay Number : 9047648864
            <br />
            For any queries, <br />
            contact
            <br />
            +918148073826
            <br />
            +918148093826
            <br />
          </div>
          <div className="qr">
            <img src={require("../../assets/pay.png")} />
          </div>
        </div>
      </div>
      <div
        className="contact-form"
        style={{
          filter: disabled ? "blur(5px)" : "none",
          pointerEvents: disabled ? "none" : "auto",
        }}
      >
        <div className="input-container">
          <label>
            Transaction ID(must be of 12 digit UTR number/UPI transaction ID)
          </label>
          <br />
          <input
            value={data.transactionID}
            onChange={phasedatachange}
            name="transactionID"
          />
        </div>
        <div className="input-container">
          <label>Amount paid</label>
          <br />
          <input
            value={data.amountpaid}
            onChange={phasedatachange}
            name="amountpaid"
          />
        </div>
        <div className="input-file-container">
          <label>Payment proof</label>
          <br />
          <input onChange={handleChange} type="file" />
        </div>
        <div className="progress">
          <Progress percent={progress} steps={10} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="add-member-btn" onClick={handleprev}>
          Previous
        </div>
        <div className="add-member-btn" onClick={handlesubmit}>
          Next
        </div>
      </div>
    </div>
  );
};
const Phase2 = (props) => {
  const { handlenext, handleprev, disabled } = props;
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const { state, dispatch } = useContext(Context);
  const [data, setData] = useState({
    transactionID: "",
    amountpaid: "",
  });
  const phasedatachange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = async () => {
    if (data.transactionID && data.transactionID.length !== 12) {
      return message.error(
        "Transaction ID must be present and be of 12 digits"
      );
    }
    // if phase 1 not approved
    if (
      !("phase1payment" in state.userdata) ||
      state.userdata.phase1payment == false
    ) {
      return message.error("Phase1 payment not approved by SEVC");
    }
    if (props.disabled || "phase2" in state.userdata) {
      if ("phase2" in state.userdata) {
        if (state.userdata.phase2payment) {
          handlenext();
          return;
        } else {
          return message.error("Payment details not approved by SEVC");
        }
      }
    }
    message.info("Processing...");
    let url = await handleUpload();
    let data1 = {
      transactionID: data.transactionID,
      amountpaid: data.amountpaid,
      paymentreceipt: url,
      approved: false,
    };
    if (data.transactionID === "" || data.amountpaid === "") {
      return message.error("Please fill all the fields");
    }

    if (url === "") {
      return message.error("Please upload the payment receipt");
    }

    //update firebase
    const q = query(
      collection(db, "users"),
      where("team_name", "==", state.userdata.team_name),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    let docid = "";
    if (querySnapshot.docs.length == 0) {
      return message.error("Contact SEVC team");
    }
    querySnapshot.forEach(async (docx) => {
      docid = docx.id;
      await updateDoc(doc(db, "users", docid), {
        phase2: data1,
      });
    });
    const q1 = query(
      collection(db, "users"),
      where("team_name", "==", state.userdata.team_name),
      limit(1)
    );
    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach(async (docx) => {
      dispatch({
        type: "LOGIN",
        payload: docx.data(),
      });
    });
    handlenext();
  };
  //handle file input and store it in firebase bucket

  useEffect(() => {
    if ("phase2" in state.userdata) {
      setData(state.userdata.phase2);
    }
  }, []);
  const handleChange = async (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleUpload = () =>
    new Promise((resolve, reject) => {
      if (file === null) {
        return message.error("Please select a file");
      }
      const storageref = ref(
        storage,
        `payment_receipts/${state.userdata.team_name}/phase2`
      );
      const uploadtask = uploadBytesResumable(storageref, file);
      uploadtask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadtask.snapshot.ref).then((url) => {
            message.info("uploaded");
            setUrl(url);
            resolve(url);
          });
        }
      );
    });

  return (
    <div className="dashboard-data">
      <div className="phase-desc">
        <div className="desc">
          Kindly make the payment of your phase 2 registration fee of ₹17,700 via
          UPI ID or by scanning the QR Code and fill the form below. You are
          instructed to upload the payment proof in this form itself.
        </div>
        <div className="payment-details">
          <div className="desc1">
            UPI ID : sevcevent@oksbi
            <br />
            G-Pay Number : 9047648864
            <br />
            For any queries, <br />
            contact
            <br />
            +918148073826
            <br />
            +918148093826
            <br />
          </div>
          <div className="qr">
            <img src={require("../../assets/pay.png")} />
          </div>
        </div>
      </div>
      <div
        className="contact-form"
        style={{
          filter: disabled ? "blur(1px)" : "none",
          pointerEvents: disabled ? "none" : "auto",
        }}
      >
        <div className="input-container">
          <label>Transaction ID</label>
          <br />
          <input
            value={data.transactionID}
            onChange={phasedatachange}
            name="transactionID"
          />
        </div>
        <div className="input-container">
          <label>Amount paid</label>
          <br />
          <input
            value={data.amountpaid}
            onChange={phasedatachange}
            name="amountpaid"
          />
        </div>
        <div className="input-file-container">
          <label>Payment proof</label>
          <br />
          <input onChange={handleChange} type="file" />
        </div>
        <div className="progress">
          <Progress percent={progress} steps={10} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="add-member-btn" onClick={handleprev}>
          Previous
        </div>
        <div className="add-member-btn" onClick={handlesubmit}>
          Next
        </div>
      </div>
    </div>
  );
};
const Phase3 = (props) => {
  const { handlenext, handleprev, disabled } = props;
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const { state, dispatch } = useContext(Context);
  const [data, setData] = useState({
    transactionID: "",
    amountpaid: "",
  });
  const phasedatachange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = async () => {
    if (data.transactionID && data.transactionID.length !== 12) {
      return message.error(
        "Transaction ID must be present and be of 12 digits"
      );
    }
    if (
      !("phase2payment" in state.userdata) ||
      state.userdata.phase2payment == false
    ) {
      return message.error("Phase2 payment not approved by SEVC");
    }
    if (props.disabled || "phase3payment" in state.userdata) {
      if ("phase3payment" in state.userdata) {
        if (state.userdata["phase3payment"]) {
          message.success("You have already paid for phase 3");
          return;
        } else {
          return message.error("Your phase 3 is not approved yet");
        }
      }
    }
    let url = await handleUpload();
    message.info("Processing");
    let data1 = {
      transactionID: data.transactionID,
      amountpaid: data.amountpaid,
      paymentreceipt: url,
    };
    if (data.transactionID === "" || data.amountpaid === "") {
      return message.error("Please fill all the fields");
    }

    if (url === "") {
      return message.error("Uploaded,submit again");
    }

    //update firebase
    const q = query(
      collection(db, "users"),
      where("team_name", "==", state.userdata.team_name),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    let docid = "";
    if (querySnapshot.docs.length === 0) {
      return message.error("Contact SEVC team");
    }
    querySnapshot.forEach(async (docx) => {
      docid = docx.id;
      await updateDoc(doc(db, "users", docid), {
        phase3: data1,
      });
    });
    const q1 = query(
      collection(db, "users"),
      where("team_name", "==", state.userdata.team_name),
      limit(1)
    );
    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach(async (docx) => {
      dispatch({
        type: "LOGIN",
        payload: docx.data(),
      });
    });
    message.success("Everything completed");
  };
  //handle file input and store it in firebase bucket

  useEffect(() => {
    if ("phase3" in state.userdata) {
      setData(state.userdata.phase2);
    }
  });
  const handleChange = async (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleUpload = () =>
    new Promise((resolve, reject) => {
      if (file === null) {
        return message.error("Please select a file");
      }
      const storageref = ref(
        storage,
        `payment_receipts/${state.userdata.team_name}/phase3`
      );
      const uploadtask = uploadBytesResumable(storageref, file);
      uploadtask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadtask.snapshot.ref).then((url) => {
            message.info("uploaded");
            setUrl(url);
            resolve(url);
          });
        }
      );
    });

  return (
    <div className="dashboard-data">
      <div className="phase-desc">
        <div className="desc">
          Kindly make the payment of your phase 3 registration fee of ₹17,700 via
          UPI ID or by scanning the QR Code and fill the form below. You are
          instructed to upload the payment proof in this form itself.
        </div>
        <div className="payment-details">
          <div className="desc1">
            UPI ID : sevcevent@oksbi
            <br />
            G-Pay Number : 9047648864
            <br />
            For any queries, <br />
            contact
            <br />
            +918148073826
            <br />
            +918148093826
            <br />
          </div>
          <div className="qr">
            <img src={require("../../assets/pay.png")} />
          </div>
        </div>
      </div>
      <div
        className="contact-form"
        style={{
          filter: disabled ? "blur(1px)" : "none",
          pointerEvents: disabled ? "none" : "auto",
        }}
      >
        <div className="input-container">
          <label>Transaction ID</label>
          <br />
          <input
            value={data.transactionID}
            onChange={phasedatachange}
            name="transactionID"
          />
        </div>
        <div className="input-container">
          <label>Amount paid</label>
          <br />
          <input
            value={data.amountpaid}
            onChange={phasedatachange}
            name="amountpaid"
          />
        </div>
        <div className="input-file-container">
          <label>Payment proof</label>
          <br />
          <input onChange={handleChange} type="file" />
        </div>
        <div className="progress">
          <Progress percent={progress} steps={10} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="add-member-btn" onClick={handleprev}>
          Previous
        </div>
        <div className="add-member-btn" onClick={handlesubmit}>
          submit
        </div>
      </div>
    </div>
  );
};
