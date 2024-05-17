import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p></p>
          <p>Data Usage: The collected information is used solely for order fulfillment, communication with customers, and improving our services. We do not sell or share your personal data with third parties for marketing purposes.</p>
          <p>Security Measures: We employ industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure. This includes encryption of sensitive data during transmission and secure storage practices.</p>
          <p>WallArtify uses cookies to enhance user experience and track website traffic. These cookies may collect anonymized data for analytics purposes and are used to personalize content and advertisements.</p>
          
          
          
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
