import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);

  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit4");
        const data = await res.json();
        setOfferListing(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit4");
        const data = await res.json();
        setRentListing(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit4");
        const data = await res.json();
        setSaleListing(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find Your next <span className="text-slate-500">perfect</span>
          <br /> place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Ashif's Estate Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Quibusdam placeat nostrum amet sapiente
          <br />
          quod voluptas delectus iusto, qui enim! Blanditiis minus quos fugit
          cum at alias laborum nulla delectus esse!
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started ...
        </Link>{" "}
      </div>
      {/* swiper */}
      <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((list) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${list.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[350px]"
                key={list._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing offer */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListing && offerListing.length > 0 && (
          <div className="">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Offer</h2>
              <Link className="text-sm hover:underline text-blue-800 font-semibold italic" to={"/search/?offer=true"}>Show more offer</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListing.map((list) => (
                <ListingItem listing={list} key={list._id}></ListingItem>
              ))}
            </div>
          </div>
        )}

        {/*  */}
        {saleListing && saleListing.length > 0 && (
          <div className="">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Sale</h2>
              <Link className="text-sm hover:underline text-blue-800 font-semibold italic" to={"/search/?type=sale"}>Show more offer</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListing.map((list) => (
                <ListingItem listing={list} key={list._id}></ListingItem>
              ))}
            </div>
          </div>
        )}

        {/*  */}
        {rentListing && rentListing.length > 0 && (
          <div className="">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Rent</h2>
              <Link className="text-sm hover:underline text-blue-800 font-semibold italic" to={"/search/?type=rent"}>Show more offer</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListing.map((list) => (
                <ListingItem listing={list} key={list._id}></ListingItem>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
