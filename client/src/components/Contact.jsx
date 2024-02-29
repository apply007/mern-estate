import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Listing from "../pages/Listing";

export default function Contact(props) {
  const { listing } = props;
  console.log(listing);
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("null");
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);

        const data = await res.json();

        if (!data) {
          console.log(data.message);
        }
        setLandlord(data);
      } catch (error) {}
    };

    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.userName}</span>{" "}
            for
            <span className="font-semibold"> {listing.name.toLowerCase()}</span>
          </p>

          <textarea
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            name=""
            id=""
            cols="30"
            rows="2"
            placeholder="enter your message"
          ></textarea>
          <Link className="bg-slate-700 text-white text-center rounded-lg p-3 mb-3 uppercase font-semibold hover:opacity-80" to={`mailto:${landlord.email}?subject: Regarding ${Listing.name}&body:${message}`}>send message</Link>
        </div>
      )}
    </>
  );
}
