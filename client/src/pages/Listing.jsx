import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";

import { useSelector } from "react-redux";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [contact, setContact] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="px-4">
      {loading && <p className="my-7 text-center text-2xl">Loading...</p>}
      {error && (
        <p className="text-red-800 text-center text-2xl">
          {" "}
          Something went wrong....
        </p>
      )}

      {listing && !error && !loading && (
        <div>
          <div className="">
            <Swiper navigation>
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[250px] w-full"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex justify-center">
            <h1 className="w-full max-w-[200px] text-2lg font-bold text-center p-2 rounded-md">
              {listing.name} -{" "}
            </h1>
            <h1 className="w-full max-w-[200px] text-2lg font-bold text-center p-2 rounded-md">
              BDT {listing.regularPrice.toLocaleString('en-US')} / Month
            </h1>
          </div>

          <div className="flex justify-center gap-4">
            <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
              {listing.type === "rent" ? "For Rent" : "For Sale"}
            </p>

            {listing.offer && (
              <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                BDT {(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-US')}
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-items-center p-5">
            <p className="text-slate-700">
              {" "}
              <b>Description - </b>
              {listing.description} Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Illum nisi voluptas, rerum dicta reprehenderit
              nihil totam! Molestias eius id fugiat enim, qui explicabo
              incidunt. Beatae iusto aspernatur ullam magni vitae!
            </p>

            <ul className="flex flex-wrap text-green-700 text-sm font-semibold gap-4 sm:gap-6">
              <li className="flex gap-1 items-center whitespace-nowrap">
                <FaBed />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Beds`
                  : `${listing.bedrooms} Bed`}
              </li>
              <li className="flex gap-1 items-center whitespace-nowrap">
                <FaBath />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : `${listing.bathrooms} Bath`}
              </li>
              <li className="flex gap-1 items-center whitespace-nowrap">
                <FaParking />
                {listing.parking ? "Parking spot" : "No Parking spot"}
              </li>
              <li className="flex gap-1 items-center whitespace-nowrap">
                <FaChair />
                {listing.furnished ? `Furnished` : `Not Furnished`}
              </li>
            </ul>
          </div>
          {currentUser && listing.userRef !== currentUser._id && !contact && (
            <button
              onClick={() => setContact(true)}
              className="uppercase flex justify-center border p-2 sm:w-[50%] ml-28 sm:ml-72 font-semibold italic hover:opacity-80 rounded-lg text-white bg-slate-700 items-center"
            >
              Contact LandLord
            </button>
          )}

          {contact && <Contact listing={listing}/>}
        </div>
      )}
    </main>
  );
}
