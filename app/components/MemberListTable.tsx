import type { FunctionComponent } from "react";
import { useState } from "react";
import BanModal from "./BanModal";
import { MemberListRow } from "./MemberListRow";
import { MuteModal } from "./MuteModal";

type MemberListTableProps = {
  members: Array<Object>;
};

export const MemberListTable: FunctionComponent<MemberListTableProps> = ({
  members,
}: MemberListTableProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [showMuteModal, setShowMuteModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);

  return (
    <>
      {showMuteModal ? (
        <MuteModal
          openHook={[showMuteModal, setShowMuteModal]}
          selectedUsers={selectedRows}
        />
      ) : (
        <></>
      )}
      {showBanModal ? <BanModal /> : <></>}
      <div>
        <div className="flex gap-1">
          <input
            type="search"
            id="default-search"
            className="inline-block text-sm text-gray-900 bg-gray-50
                            rounded-lg border border-gray-300 focus:ring-green-700
                            focus:border-green-700"
            placeholder="Filter"
          />
          {selectedRows.length > 0 ? (
            <div className="flex gap-1">
              <button
                type="button"
                className="button"
                onClick={() => setShowMuteModal(true)}
                style={{ backgroundColor: "#EAB308" }}
              >
                Mute
              </button>
              <button
                type="button"
                className="button"
                onClick={() => setShowBanModal(true)}
                style={{ backgroundColor: "#DC2626" }}
              >
                Ban
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
              accent="green"
              onSelect={() => setSelectedRows([...selectedRows, user.id])}
              onDeselect={() =>
                setSelectedRows(selectedRows.filter((row) => row !== user.id))
              }
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
