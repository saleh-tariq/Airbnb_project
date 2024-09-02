import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";

function NewSpot({ update }) {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  console.log(spot);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedErrors = {};
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
    if (!latitude) {
      updatedErrors.latitude = "Latitude is required";
    }
    if (!longitude) {
      updatedErrors.longitude = "Longitude is required";
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
    <>
      <form onSubmit={handleSubmit}>
        <h2>{update ? "Update your Spot" : "Create a New Spot"}</h2>
        <div className="create-spot-location create-spot-subsection">
          <h3>Where is your place located?????????</h3>
          <p>
            Guests will only get your exact address once they book a
            reservation.
          </p>
          <div>
            <span>
              <p>Country</p>
              {errors.country ? (
                <p className="errors">{errors.country}</p>
              ) : null}
            </span>
            <input
              onInput={(e) => setCountry(e.target.value)}
              type="text"
              placeholder="Country"
            />
          </div>
          <div>
            <span>
              <p>Street Address</p>
              {errors.address ? (
                <p className="errors">{errors.address}</p>
              ) : null}
            </span>
            <input
              onInput={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Address"
            />
          </div>

          <span>
            <div>
              <span>
                <p>City</p>
                {errors.city ? <p className="errors">{errors.city}</p> : null}
              </span>
              <input
                onInput={(e) => setCity(e.target.value)}
                type="text"
                placeholder="City"
              />
            </div>
            <p>, </p>
            <div>
              <span>
                <p>State</p>
                {errors.state ? <p className="errors">{errors.state}</p> : null}
              </span>
              <input
                onInput={(e) => setState(e.target.value)}
                type="text"
                placeholder="State"
              />
            </div>
          </span>
          <span>
            <div>
              <span>
                <p>Latitude</p>
                {errors.latitude ? (
                  <p className="errors">{errors.latitude}</p>
                ) : null}
              </span>
              <input
                onInput={(e) => setLatitude(e.target.value)}
                type="number"
                placeholder="Latitude"
              />
            </div>
            <div>
              <span>
                <p>Longitude</p>
                {errors.longitude ? (
                  <p className="errors">{errors.longitude}</p>
                ) : null}
              </span>
              <input
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
            <input
              onInput={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Please write at least 30 characters"
            />
            {errors.description ? (
              <p className="errors">{errors.description}</p>
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
              onInput={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Name of your spot"
            />
            {errors.title ? <p className="errors">{errors.title}</p> : null}
          </div>
        </div>

        <div className="create-spot-price create-spot-subsection">
          <h3>Set a base price for your spot</h3>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <div>
            <p>$</p>
            <input
              onInput={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Price per night (USD)"
            />
            {errors.price ? <p className="errors">{errors.price}</p> : null}
          </div>
        </div>

        <div className="create-spot-images create-spot-subsection">
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot</p>
          <div>
            <input
              onInput={handleImageInput("prev")}
              type="text"
              placeholder="Preview Image URL"
            />
            {errors.prev ? <p className="errors">{errors.prev}</p> : null}
            <input
              onInput={handleImageInput("1")}
              type="text"
              placeholder="Image URL"
            />
            {errors["1"] ? <p className="errors">{errors["1"]}</p> : null}
            <input
              onInput={handleImageInput("2")}
              type="text"
              placeholder="Image URL"
            />
            {errors["2"] ? <p className="errors">{errors["2"]}</p> : null}
            <input
              onInput={handleImageInput("3")}
              type="text"
              placeholder="Image URL"
            />
            {errors["3"] ? <p className="errors">{errors["3"]}</p> : null}
            <input
              onInput={handleImageInput("4")}
              type="text"
              placeholder="Image URL"
            />
            {errors["4"] ? <p className="errors">{errors["4"]}</p> : null}
          </div>
        </div>

        <button type="submit">Create Spot</button>
      </form>
    </>
  );
}

export default NewSpot;
