import { useState } from "preact/hooks";
import { formatDate } from "../utils/formatDate.ts";
import AddReviewModal from "../components/AddReviewModal.tsx";
import Review from "../components/Review.tsx";

export default function ProfilePage({ data, id }: any) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };
  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * 2); 
    return randomIndex === 0 ? "/download2.jpg" : "/download3.jpg";
  };
  return (
    <div>
      <div
        onClick={handleBackdropClick}
        class={`${
          showModal
            ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
            : ""
        }`}
      >
      </div>
      <div className="items-center flex flex-col rounded-lg bg-[#1f2937] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-full md:flex-row">
        <img
          className="max-h-[350px] w-[350px] object-contain md:h-auto rounded-3xl"
          src={getRandomImage()}
          alt="k"
        />
        <div className="flex flex-col justify-start p-6">
          <h5 className="mb-1 text-xl font-medium text-neutral-800 dark:text-neutral-50">
            {data.username}
          </h5>
          <h5 className="mb-4 text-sm font-light text-gray-800 dark:text-gray-50">
            {data.designation}
          </h5>
          <p class="text-md font-bold mb-2">About User:</p>
          <p className="max-w-[700px] mb-4 text-base text-neutral-600 dark:text-neutral-200">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer. In
            publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before final copy is available. Wikipedia
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-300">
            <span class='font-medium text-sm text-gray-500 dark:text-gray-200'>Last {data.status} :</span> <span class='text-gray-500 dark:text-gray-300'>{formatDate(data.createdAt)}</span> 
          </p>
          <div className="flex my-6">
            <button className="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Message User
            </button>
            <button
              onClick={() => setTimeout(() => setShowModal(true), 100)}
              className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              Add Review
            </button>
            <AddReviewModal
              showModal={showModal}
              closeModal={closeModal}
              id={id}
              isProfilePage={true}
            />
          </div>
        </div>
      </div>
      <div class="bg-[#1f2937] px-4 py-6">
      <hr></hr>
        <Review data={data.reviews} isProfilePage={true} />
      </div>
    </div>
  );
}
