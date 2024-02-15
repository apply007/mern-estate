import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ0AAACUCAMAAAC+99ssAAAANlBMVEX+/v68vb+9vb26urrk5OW5urz7+/v29vbx8fHHyMrp6enMzMzT09Pf39+1trjPz8/Z2dnDw8MLljLGAAAED0lEQVR4nO2ci27rIAyGCyRAuCTw/i870jZTu9M02AETHfFr0jRpmj5xsY39d7dbV1dXV9f/JpnUmuGj9OCds5NdluAH1ZrmTdpFzsdNgvPoLwNoJiE442wTTxIi6NZcq7QdR/ZBI3PNz6D04iPbg880plsE34NbNbRkUzbdgG90Y2hIN+3u6i+ebwbnxBFcw83138/cpjaRRfHvZ27b26kJ3ZSzcKzR0TOZcIxF+qwmj+/rJuHI6UzOfX2Ic/KUZvPp6E+eyosmT1nixcuMdZuIYx5kY9PW0iYMFSFw1BHZZIeTJx4p3QCkm0kDsoPSkV6L/ETxEG3Ey60AfulIa2QgHBtJU22n63Qt6GCJjPrOWigdaRkQLp0rwHmWtPzUMDjGKOFuGpjKLCndbblybZzeFaC1I35XgN5kI/Wb7GYBt5Z6Y0Eviwa9AJm/eKJBEyo/IDfoQaWgkolHf+pWKZbZ+2wzVBnyokqriVnICcnt5j3H93ZuN6+4SXc062kI98D7Btd0TpZk4v6McWo/otXL3nzWN5/PrtKWC8HflH4Ol5m9K79E8aLohkus2yap9BDcYq113ujLLFtXV9ebtDbDN5lW11eaMEV22ClLvzI5Qxr8VCITc/a7YpzHyRuiRZQh3jNXLtxdgkcC25Y00yzuWRUEx9bUO8fKxrwBOuR505h2uBqaTLXcGbhVgleqD/QiYI2nT0o7bCucP+k5bNi+R5f+TPHxgNov0OEaY9lnpInnN/VNJZ9DfoZGkCOJcqbQMILj2zFeqUY3dMyep3EqEpqhc51svBKr5yvBFfGWmbkWXAp+Z/Ma0LQD1cm0kWWLRetkX1SXyF7f8E5FZVs8zv2hO7N44EEnHO9Exq0V6l7o8FEF4ItFi6Pp6m9sCsnofAb1AKLo0AevXhL7FRdopwrUdYKiQ1+LurHuSYede8uqWWzDw85HNQkdR1YCAwkd9tI6gnOX6JCFwEJBhzW/SUtDt6DoVKShw3ngNQ0d0l+mK1eem3AOfVO5at+Ec+hnWibO06HCMfDDMcR030f+BelQyYKKDvfwOfhYcTk6VL/CdrpO14Du2nc2XDrekeUKVJ6lqgJG1JORqr7DVZ9UlTuyVZFl6zwrgW7zlJwr7gjfqaDp3+GHAqp685OfmdQq2GdQgGRcnIJLGli9OZk4P2ZU4bSRYke8iG1Vuxp85fy+KsSHK7YM2GrssSWdAWqwM9T7tKt04IrbyqS3vMAWjyxWsiLrwbF8Z9sntDmGmm48qb2Nd0dO9jl82rc5j9ar+kZBuTqfp3S09//L16vu7m0bPKGFUUqlTVjiGqzXr4ee+/f8+f6NTUswmmDNPmNqPfgQnFvstMkui3Mh+MG0ovpX8kWtWbq6urr+6gekvTavW+Q2JwAAAABJRU5ErkJggg==",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
