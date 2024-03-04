import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[230px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          className="h-[320px] sm:h-[120px] hover:scale-105 transition-scale duration-300 w-full object-cover"
          src={listing.imageUrls[0]}
          alt=""
        />
      </Link>
      <div className="p-3 flex flex-col gap-2 w-full">
        <p className="text-lg font-semibold text-slate-700 truncate">
          {listing.name}
        </p>

        <div className="flex items-center gap-1">
          <MdLocationOn className="h-4 w-4 text-green-700" />
          <p className="text-sm font-semibold text-gray-600 truncate">
            {listing.address}
          </p>
        </div>

        <p className="text-sm text-gray-600 w-full line-clamp-2">
          {listing.description}
        </p>

        <p className="text-slate-600 mt-2 font-semibold">
          <b>BDT </b>
          {listing.offer
            ? listing.discountPrice.toLocaleString("en-US")
            : listing.regularPrice.toLocaleString("en-US")}

            {listing.type==='rent'&& " / month"}
        </p>

<div className="flex gap-4 text-slate-600 font-semibold text-sm">
    <div>
{listing.bedrooms>1?`${listing.bedrooms} Beds`:`${listing.bedrooms} Bed`}

    </div>
    <div>
    {listing.bathrooms>1?`${listing.bathrooms} Baths`:`${listing.bathrooms} Bath`}
    </div>
</div>

      </div>
    </div>
  );
}
