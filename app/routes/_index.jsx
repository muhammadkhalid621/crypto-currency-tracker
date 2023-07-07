import { fetchCryptocurrencies } from "../api";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useActionData } from "@remix-run/react";

import React, { useState } from "react";

// for loading the data from external api using Remix
export const loader = async () => {
  return json({
    data: await fetchCryptocurrencies(),
  });
};

// Modal
const Modal = ({ data, onClose }) => {
  const data1 = useActionData;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-lg">
        <form method="post" action="/save">
          <h2 className="text-lg font-semibold mb-2">
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              readOnly
            />
          </h2>
          <label>
            Code: &nbsp;
            <input
              type="text"
              name="code"
              id="code"
              value={data.symbol}
              readOnly
            />
          </label>
          <br />
          <label>
            Price: &nbsp;
            <input
              type="number"
              name="priceUsd"
              id="priceUsd"
              value={data.priceUsd}
              readOnly
            />
          </label>
          <br />
          <label>
            Volume: &nbsp;
            <input
              type="number"
              name="volumeUsd24Hr"
              id="volumeUsd24Hr"
              value={data.volumeUsd24Hr}
              readOnly
            />
          </label>
          <br />
          <label>
            Percentage change: &nbsp;
            <input
              type="number"
              name="changePercent24Hr"
              id="changePercent24Hr"
              value={data.changePercent24Hr}
              readOnly
            />
          </label>
          <br />
          <button className="px-4 py-2 mx-4 text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600 float-right">
            Save
          </button>
        </form>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600 float-right"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function Index() {
  const { data } = useLoaderData();

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("symbol");
  const [selectedRow, setSelectedRow] = useState(null);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleItemsPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when changing search term
  };

  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value);
    setSearchTerm(""); // Clear the search term when changing search field
    setCurrentPage(1); // Reset to the first page when changing search field
  };

  const filteredData = data.filter((item) => {
    const fieldValue = item[searchField].toLowerCase();
    return fieldValue.includes(searchTerm.toLowerCase());
  });

  const startItemIndex = (currentPage - 1) * itemsPerPage;
  const endItemIndex = startItemIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startItemIndex, endItemIndex);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-blue-700  p-4 ">
        Crypto Currency Tracker
      </h1>

      <div className="flex items-center justify-center">
        <div className=" p-4 border rounded-md shadow-md overflow-auto">
          <div className="flex items-center justify-between mt-4 mb-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-500">Show</span>
              <select
                className="px-2 py-1 ml-2 border border-gray-300 rounded-md"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>{" "}
              <span className="text-sm text-gray-500"> &nbsp; Entries</span>
            </div>

            <input
              type="text"
              placeholder="Search by name or symbol"
              className="px-2 py-1 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          {paginatedData.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xm font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-center text-xm font-medium text-gray-500 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="px-6 py-3 text-center text-xm font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-center text-xm font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200 cursor-pointer">
                {paginatedData.map((item) => (
                  <tr key={item.id} onClick={() => handleRowClick(item)}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.rank}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.symbol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.priceUsd}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 className="text-center">No Data to display</h3>
          )}
          {selectedRow && (
            <Modal data={selectedRow} onClose={handleCloseModal} />
          )}
          <div className="flex justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing {startItemIndex + 1} to{" "}
              {Math.min(endItemIndex, filteredData.length)} of{" "}
              {filteredData.length} entries
            </div>
            <button
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-md focus:outline-none"
              onClick={handlePreviousPage}
              disabled={!hasPreviousPage}
            >
              Previous
            </button>
            <span className="px-2 py-1 text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-md focus:outline-none"
              onClick={handleNextPage}
              disabled={!hasNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
