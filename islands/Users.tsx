import { useEffect } from "preact/hooks";
import { Users } from "../database/Users/schema.ts";
import { formatDate } from "../utils/formatDate.ts";
export default function Users({ data }: any) {
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * 2);
    return randomIndex === 0 ? "/download2.jpg" : "/download3.jpg";
  };

  useEffect(() => {
    const elements = document.querySelectorAll(".tr-class");
    if (elements) {
      elements.forEach((element) => {
        element.addEventListener("click", () => {
          const dataValue: any = element.getAttribute("data-uid");
          window.location.href = dataValue;
        });
      });
    }
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8 bg-[#1f2937]">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-bold leading-tight text-white">
            Users
          </h2>
        </div>
        <div className="my-2 flex sm:flex-row flex-col">
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created at
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((pro: Users) => {
                  return (
                    <tr
                      class="tr-class cursor-pointer hover:font-medium"
                      data-uid={`/users/${pro._id}`}
                    >
                      <td className="px-5 py-5 border-b border-gray-200 bg-[#1f2937] text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src={getRandomImage()}
                              alt={"image-profile"}
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-100 whitespace-no-wrap">
                              {pro.username}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-[#1f2937] text-sm">
                        <p className="text-gray-100 whitespace-no-wrap">
                          {pro.designation}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-[#1f2937] text-sm">
                        <p className="text-gray-100 whitespace-no-wrap">
                          {formatDate(Number(pro.createdAt))}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-[#1f2937] text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-200 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-800 opacity-50 rounded-full"
                          />
                          <span className="relative">{pro.status}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
