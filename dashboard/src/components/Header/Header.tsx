import React from "react";

function Header() {
  return (
    <>
      <header className="flex py-4">
        <h1 className="text-lg">
          DATA<em className="font-serif">2</em>DECISION{" "}
          <small className="text-gray-800">
            powered by
            <a href="https://wirvsvirushackathon.org/">
              <img
                src="https://wirvsvirushackathon.org/wp-content/uploads/2020/03/12-scaled.jpg"
                alt="wir versus virus hackathon"
                className="w-1/12 inline"
              ></img>
            </a>
          </small>
        </h1>
      </header>
      <hr />
    </>
  );
}

export default Header;
