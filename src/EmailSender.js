import React, { useState } from "react";
import emailjs from "emailjs-com";

// Initialize Email.js with your User ID (not your email address)
emailjs.init("Lw8r2ydYqjgpE8pf8"); // Replace 'your_user_id' with your actual User ID

function EmailSender() {
  const [ID, setID] = useState("");
  const [message, setMessage] = useState("");
  const toEmail = [
    "metharaengein@gmail.com",
    "powkub010@gmail.com",
    "auysengakm1@gmail.com",
  ];
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const subjectOptions = [
    { label: "แจ้งปัญหา 1", value: "Subject 1" },
    { label: "แจ้งปัญหา 2", value: "Subject 2" },
    { label: "แจ้งปัญหา 3", value: "Subject 3" },
    { label: "แจ้งปัญหา 4", value: "Subject 4" },
    { label: "แจ้งปัญหา 5", value: "Subject 5" },
  ];

  const statusOptions = [
    { label: "บุคลากรภายใน", value: "Status 1" },
    { label: "นักศึกษา", value: "Status 2" },
    { label: "บุคลากรภายนอก", value: "Status 3" },
  ];

  const handleSubjectChange = (event) => {
    const selectedSubject = event.target.value;

    if (selectedSubjects.includes(selectedSubject)) {
      setSelectedSubjects(
        selectedSubjects.filter((subject) => subject !== selectedSubject)
      );
    } else {
      setSelectedSubjects([...selectedSubjects, selectedSubject]);
    }
  };

  const handleStatusChange = (event) => {
    const selectedStatusValue = event.target.value;

    if (selectedStatus.includes(selectedStatusValue)) {
      setSelectedStatus(
        selectedStatus.filter((status) => status !== selectedStatusValue)
      );
    } else {
      setSelectedStatus([...selectedStatus, selectedStatusValue]);
    }
  };

  const sendEmail = () => {
    const subject = selectedSubjects.join(", ");
    const status = selectedStatus.join(", ");

    emailjs
      .send("service_2vntdka", "template_jyc9mx3", {
        to: toEmail,
        senderName: ID,
        message: message,
        subject: subject,
        status: status,
        name: name,
        phoneNumber: phoneNumber,
      })
      .then(
        function (response) {
          console.log("Email sent:", response);
        },
        function (error) {
          console.error("Email error:", error);
        }
      );
  };

  return (
    <div className="container">
      <h1 className="mt-4">แบบฟอร์ม</h1>
      <div className="space-betweens">
        <div className="form-group">
          <label htmlFor="name">ชื่อ-นามสกุล</label>
          <input
            placeholder="*จำเป็น"
            type="text"
            id="name"
            className="form-control-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">รหัสประจำตัว</label>
          <input
            placeholder="*จำเป็น"
            type="text"
            id="id"
            className="form-control-input"
            value={ID}
            onChange={(e) => setID(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">หมายเลขโทรศัพท์</label>
          <input
            placeholder="*ไม่บังคับ"
            type="tel"
            id="phone"
            className="form-control-input"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        {statusOptions.map((option) => (
          <div key={option.value} className="checkbox-group form-check float-right">
            <input
              type="checkbox"
              className="form-check-input"
              value={option.value}
              onChange={handleStatusChange}
              checked={selectedStatus.includes(option.value)}
            />
            <label className="checkbox-label form-check-label">{option.label}</label>
          </div>
        ))}
      </div>
      <hr />
      <div className="form-group">
        <label>เลือกหัวข้อ</label>
        <br />
        <hr />
        {subjectOptions.map((option) => (
          <div key={option.value} className="checkbox-group form-check float-right">
            <input
              type="checkbox"
              className="form-check-input"
              value={option.value}
              onChange={handleSubjectChange}
              checked={selectedSubjects.includes(option.value)}
            />
            <label className="checkbox-label form-check-label">{option.label}</label>
          </div>
        ))}
      </div>
      <div className="form-group">
        <label htmlFor="message">หมายเหตุ</label>
        <textarea
          placeholder="*ไม่บังคับ"
          id="message"
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>

      <button className="btn btn-send" onClick={sendEmail}>
        ส่ง
      </button>
    </div>
  );
}

export default EmailSender;
