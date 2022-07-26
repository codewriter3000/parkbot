import type { FunctionComponent } from "react";
import { useState } from "react";

import { MemberListRow } from "./MemberListRow";
import { ParkbotButton } from "./ParkbotButton";

type MemberListTableProps = {
  members: Array<Object>;
  accentColor: string;
  tableType: string;
};

export const MemberListTable: FunctionComponent<MemberListTableProps> = ({
  members,
  accentColor,
  tableType,
}: MemberListTableProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  return (
    <>
      <div>
        {accentColor === "purple" ? (
          <div className="flex gap-1">
            <input
              type="search"
              id="default-search"
              className="inline-block text-sm text-gray-900 bg-gray-50
                            rounded-lg border border-gray-300 focus:ring-blue-600
                            focus:border-blue-600"
              placeholder="Search for Username"
              required
            />
            <button
              type="submit"
              className="text-white
                            bg-blue-600 hover:bg-blue-700 focus:ring-4
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg
                            text-sm px-4 py-2"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        ) : accentColor === "yellow" ? (
          <div className="flex gap-1">
            <input
              type="search"
              id="default-search"
              className="inline-block text-sm text-gray-900 bg-gray-50
                            rounded-lg border border-gray-300 focus:ring-yellow-400
                            focus:border-yellow-400"
              placeholder="Search for Username"
              required
            />
            <button
              type="submit"
              className="text-white
                            bg-yellow-500 hover:bg-yellow-600
                            focus:ring-yellow-800 focus:ring-4
                            focus:outline-none font-medium rounded-lg
                            text-sm px-4 py-2"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        ) : accentColor === "red" ? (
          <div className="flex gap-1">
            <input
              type="search"
              id="default-search"
              className="inline-block text-sm text-gray-900 bg-gray-50
                            rounded-lg border border-gray-300 focus:ring-red-600
                            focus:border-red-600"
              placeholder="Search for Username"
              required
            />
            <button
              type="submit"
              className="text-white
                            bg-red-600 hover:bg-red-700 focus:ring-red-800
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg
                            text-sm px-4 py-2"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <table className="table-auto border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-300 pl-3 py-2 text-left"></th>
            <th className="border border-slate-300 pl-3 py-2 text-left">
              Nickname
            </th>
            <th className="border border-slate-300 pl-3 py-2 text-left">
              Username
            </th>
            <th className="border border-slate-300 pl-3 py-2 text-left">
              User ID
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((user: any) => (
            <MemberListRow
              key={user.username}
              nickname={user.nickname}
              username={user.username}
              id={user.id}
              onSelect={() => setSelectedRows([...selectedRows, user.username])}
              onDeselect={() =>
                setSelectedRows(
                  selectedRows.filter((row) => row !== user.username)
                )
              }
            />
          ))}
        </tbody>
      </table>
      {selectedRows.length === 0 ? (
        <></>
      ) : (
        <>
          {tableType === "members" ? (
            <div className="flex gap-1">
              <ParkbotButton text="Mute" bgcolor="bg-yellow-500" />
              <ParkbotButton text="Ban" bgcolor="bg-red-600" />
            </div>
          ) : tableType === "muted" ? (
            <div className="flex gap-1">
              <ParkbotButton text="Change Mute" bgcolor="bg-yellow-500" />
              <ParkbotButton text="Ban" bgcolor="bg-red-600" />
            </div>
          ) : tableType === "banned" ? (
            <div className="flex gap-1">
              <ParkbotButton text="Unban" bgcolor="bg-red-600" />
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};
