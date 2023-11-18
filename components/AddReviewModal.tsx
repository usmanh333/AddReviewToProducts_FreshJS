import { useState } from "preact/hooks";
import Label from "./Label.tsx";

export default function AddReviewModal({ showModal, closeModal, id, isProfilePage }: any) {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const handleStarHover = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const postReview = async () => {
    try {
      const res = await fetch(isProfilePage ? "/api/profileReview/post" :"/api/reviews/post", {
        method: "POST",
        body: JSON.stringify({
          id,
          rating,
          remarks: description,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }),
      });
      await res.json();
      closeModal();
      window.location.reload();
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div
      class={`absolute top-5 left-0 right-0 flex justify-center ${
        showModal ? "" : "hidden"
      }`}
    >
      {showModal && (
        <div className="bg-[#191e2bff] p-8 rounded-xl shadow-xl  w-[600px] mx-4">
          <h1 className="text-2xl font-semibold text-white mb-6">
            Add a Review
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4 col-span-2">
              <Label name={"Select Rating"} />
              <div class="flex">
                {[0, 1, 2, 3, 4].map((starIndex) => (
                  <svg
                    key={starIndex}
                    className={`w-8 h-8 ${
                      starIndex < rating
                        ? "text-yellow-300"
                        : "text-gray-300 dark:text-gray-500"
                    } mr-1`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                    onMouseEnter={() => handleStarHover(starIndex)}
                    onMouseLeave={() => handleStarHover(rating - 1)}
                    onClick={() => handleStarClick(starIndex)}
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="col-span-2 mb-4">
              <Label name={"Description"} />
              <textarea
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                rows={4}
                placeholder={`Enter Review description for ${isProfilePage ? "user": "product"}`}
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
              >
              </textarea>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-md focus:outline-none"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
              onClick={postReview}
            >
              Add Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
