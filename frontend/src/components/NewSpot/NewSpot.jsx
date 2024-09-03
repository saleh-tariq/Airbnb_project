import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";
import "./NewSpot.css";

function NewSpot({ update }) {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImageInput = (target) => (e) => {
    const updatedImages = { [target]: e.target.value };
    setImages({ ...images, ...updatedImages });
  };

  const checkValidImages = (sample) => {
    const invalidImages = [];

    Object.entries(sample).forEach((e) => {
      const [key, value] = e;
      const processedValue = value.split(".")[value.split(".").length - 1];
      if (
        processedValue !== "jpeg" &&
        processedValue !== "jpg" &&
        processedValue !== "png"
      ) {
        invalidImages.push({
          [key]: "Image URL must end in .png, .jpg, or .jpeg",
        });
      }
    });

    return invalidImages[0] ? invalidImages : false;
  };
  useEffect(() => {
    if (update) {
      dispatch(spotActions.getSpotDetails(spotId));
    }
  }, [dispatch, update, spotId]);
  const spots = Object.values(useSelector((state) => state.spots));
  const spot = spotId ? spots.find((spt) => spt.id === Number(spotId)) : null;

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (spot) {
      setCountry(spot.country);
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setLatitude(spot.lat);
      setLongitude(spot.lng);
      setDescription(spot.description);
      setTitle(spot.name);
      setPrice(spot.price);
      setImages({ prev: spot.previewImage });
      const revisedImages = spot.SpotImages
        ? spot.SpotImages.reduce((acc, el) => {
            if (!el.preview) {
              acc.push(el.url);
            }
            return acc;
          }, [])
        : [];
      spot.SpotImages &&
        revisedImages.forEach((img, id) => {
          setImages({
            ...(() => {
              return images;
            })(),
            [id + 1]: img,
          });
        });
    }
  }, [
    spot,
    setCountry,
    setAddress,
    setCity,
    setState,
    setLatitude,
    setLongitude,
    setDescription,
    setTitle,
    setPrice,
    setImages,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedErrors = {};
    setErrors({});
    if (!country) {
      updatedErrors.country = "Country is required";
    }
    if (!address) {
      updatedErrors.address = "Address is required";
    }
    if (!city) {
      updatedErrors.city = "City is required";
    }
    if (!state) {
      updatedErrors.state = "State is required";
    }
    if (latitude === "") {
      updatedErrors.latitude = "Latitude is required";
    }
    if (latitude > 90 || latitude < -90) {
      updatedErrors.latitude = "Latitude must be between -90 and 90";
    }
    if (longitude === "") {
      updatedErrors.longitude = "Longitude is required";
    }
    if (longitude > 180 || longitude < -180) {
      updatedErrors.longitude = "Longitude must be between -180 and 180";
    }
    if (!description || description.length < 30) {
      updatedErrors.description =
        "Description needs a minimum of 30 characters";
    }
    if (!title) {
      updatedErrors.title = "Name is required";
    }
    if (!price) {
      updatedErrors.price = "Price is required";
    }
    if (price < 0) {
      updatedErrors.price = "Price cannot be negative";
    }
    if (!images.prev) {
      updatedErrors.prev = "Preview is required";
    }
    const invalidImage = checkValidImages(images);
    if (invalidImage) {
      invalidImage.forEach((e) => {
        const [key, value] = Object.entries(e)[0];
        updatedErrors[key] = value;
      });
    }

    if (Object.values(updatedErrors)[0]) {
      setErrors({ ...errors, ...updatedErrors });
    } else {
      let newUrl;
      if (update) {
        newUrl = await dispatch(
          spotActions.editSpot(
            spot,
            {
              address,
              city,
              state,
              country,
              lat: +latitude,
              lng: +longitude,
              name: title,
              description,
              price: +price,
            },
            images
          )
        );
      } else {
        newUrl = await dispatch(
          spotActions.makeSpot(
            {
              address,
              city,
              state,
              country,
              lat: +latitude,
              lng: +longitude,
              name: title,
              description,
              price: +price,
            },
            images
          )
        );
      }
      navigate(newUrl);
    }
  };
  return (
    <div className="create-spot">
      <form className="create-spot-form" onSubmit={handleSubmit}>
        <h2>{update ? "Update your Spot" : "Create a New Spot"}</h2>
        <div className="create-spot-location create-spot-subsection">
          <h3>Where is your place located?</h3>
          <p>
            Guests will only get your exact address once they book a
            reservation.
          </p>
          <div className="country">
            <span className="side-by-side">
              <p>Country</p>
              {errors.country ? (
                <p className="errors smaller">{errors.country}</p>
              ) : null}
            </span>
            <input
              value={country}
              onInput={(e) => setCountry(e.target.value)}
              type="text"
              placeholder="Country"
            />
          </div>
          <div className="address">
            <span className="side-by-side">
              <p>Street Address</p>
              {errors.address ? (
                <p className="errors smaller">{errors.address}</p>
              ) : null}
            </span>
            <input
              value={address}
              onInput={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Address"
            />
          </div>

          <span className="side-by-side">
            <div className="sixty">
              <span className="side-by-side">
                <p>City</p>
                {errors.city ? (
                  <p className="errors smaller">{errors.city}</p>
                ) : null}
              </span>
              <input
                value={city}
                onInput={(e) => setCity(e.target.value)}
                type="text"
                placeholder="City"
              />
            </div>
            <div className="fourty">
              <span className="side-by-side">
                <p>State</p>
                {errors.state ? (
                  <p className="errors smaller">{errors.state}</p>
                ) : null}
              </span>
              <input
                value={state}
                onInput={(e) => setState(e.target.value)}
                type="text"
                placeholder="State"
              />
            </div>
          </span>
          <span className="side-by-side">
            <div className="fifty">
              <span className="side-by-side">
                <p>Latitude</p>
                {errors.latitude ? (
                  <p className="errors smaller">{errors.latitude}</p>
                ) : null}
              </span>
              <input
                value={latitude}
                onInput={(e) => setLatitude(e.target.value)}
                type="number"
                placeholder="Latitude"
              />
            </div>
            <div className="fifty">
              <span className="side-by-side">
                <p>Longitude</p>
                {errors.longitude ? (
                  <p className="errors smaller">{errors.longitude}</p>
                ) : null}
              </span>
              <input
                value={longitude}
                onInput={(e) => setLongitude(e.target.value)}
                type="number"
                placeholder="Longitude"
              />
            </div>
          </span>
        </div>

        <div className="create-spot-description create-spot-subsection">
          <h3>Describe your place to guests</h3>
          <p>
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <div>
            <textarea
              value={description}
              className="text-area"
              style={{ resize: "none" }}
              onInput={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Please write at least 30 characters"
            />
            {errors.description ? (
              <p className="errors smaller">{errors.description}</p>
            ) : null}
          </div>
        </div>

        <div className="create-spot-title create-spot-subsection">
          <h3>Create a title for your spot</h3>
          <p>
            Catch guests&apos; attention with a spot title that highlights what
            makes your place special.
          </p>
          <div>
            <input
              className="hundo"
              value={title}
              onInput={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Name of your spot"
            />
            {errors.title ? (
              <p className="errors smaller">{errors.title}</p>
            ) : null}
          </div>
        </div>

        <div className="create-spot-price create-spot-subsection">
          <h3>Set a base price for your spot</h3>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <div>
            <span className="side-by-side">
              <p>$</p>
              <input
                className="hundo"
                value={price}
                onInput={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="Price per night (USD)"
              />
            </span>
            {errors.price ? (
              <p className="errors smaller">{errors.price}</p>
            ) : null}
          </div>
        </div>

        <div className="create-spot-images create-spot-subsection">
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot</p>
          <div className="create-spot-images">
            <input
              value={images.prev}
              onInput={handleImageInput("prev")}
              type="text"
              placeholder="Preview Image URL"
            />
            {errors.prev ? (
              <p className="errors smaller">{errors.prev}</p>
            ) : null}
            <input
              value={images[1]}
              onInput={handleImageInput("1")}
              type="text"
              placeholder="Image URL"
            />
            {errors["1"] ? (
              <p className="errors smaller">{errors["1"]}</p>
            ) : null}
            <input
              value={images[2]}
              onInput={handleImageInput("2")}
              type="text"
              placeholder="Image URL"
            />
            {errors["2"] ? (
              <p className="errors smaller">{errors["2"]}</p>
            ) : null}
            <input
              value={images[3]}
              onInput={handleImageInput("3")}
              type="text"
              placeholder="Image URL"
            />
            {errors["3"] ? (
              <p className="errors smaller">{errors["3"]}</p>
            ) : null}
            <input
              value={images[4]}
              onInput={handleImageInput("4")}
              type="text"
              placeholder="Image URL"
            />
            {errors["4"] ? (
              <p className="errors smaller">{errors["4"]}</p>
            ) : null}
          </div>
        </div>

        <div className="button-holder">
          <button type="submit">
            {update ? "Update Spot" : "Create Spot"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewSpot;
