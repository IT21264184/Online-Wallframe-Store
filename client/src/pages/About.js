import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          WallArtify is your ultimate destination for transforming your living spaces with captivating visuals. As an e-commerce haven specializing in posters and frames, we curate a diverse collection of art pieces that cater to every taste and style. Whether you're seeking vibrant landscapes, thought-provoking abstracts, or iconic pop culture references, we've got you covered. Our user-friendly platform ensures a seamless shopping experience, allowing you to browse, select, and adorn your walls with ease. With WallArtify, elevate your home or office décor effortlessly, one frame at a time.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
