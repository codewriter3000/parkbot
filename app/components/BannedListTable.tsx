import type { FunctionComponent } from "react";
import { useState } from "react";
import { MemberListRow } from "./MemberListRow";
import UnbanModal from "./UnbanModal";

type BannedListTableProps = {
  members: Array<Object>;
};

export const BannedListTable: FunctionComponent<BannedListTableProps> = ({
  members,
}: BannedListTableProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [showUnbanModal, setShowUnbanModal] = useState(false);

  return (
    <>
      {showUnbanModal ? <UnbanModal /> : <></>}
      <div>
        <div className="flex gap-1">
          <input
            type="search"
            id="default-search"
            className="inline-block text-sm text-gray-900 bg-gray-50
                        rounded-lg border border-gray-300 focus:ring-red-600
                        focus:border-red-600"
            placeholder="Filter"
          />
          {selectedRows.length > 0 ? (
            <div className="flex gap-1">
              <button
                type="button"
                className="button"
                onClick={() => setShowUnbanModal(true)}
                style={{ backgroundColor: "#DC2626" }}
              >
                Unban
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
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
          {members.map((user: any, index) => (
            <MemberListRow
              key={index}
              nickname={user.nickname}
              username={user.username}
              userID={user.id}
              accent="red"
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
    </>
  );
};
