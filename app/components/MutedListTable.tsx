import type { FunctionComponent } from "react";
import { useState } from "react";
import BanModal from "./BanModal";
import { ChangeMuteModal } from "./ChangeMuteModal";
import { MemberListRow } from "./MemberListRow";

type MutedListTableProps = {
  members: Array<Object>;
};

export const MutedListTable: FunctionComponent<MutedListTableProps> = ({
  members,
}: MutedListTableProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [showChangeMuteModal, setShowChangeMuteModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);

  // an example of what data you can display for mutes
  members.forEach((member: any) => {
    const remaining =
      member.muteDuration - (Date.now() - Date.parse(member.muteSince)) / 1000;
    console.log(
      member.nickname,
      ":",
      remaining,
      "seconds -",
      member.muteReason
    );
  });

  return (
    <>
      {showChangeMuteModal ? (
        <ChangeMuteModal
          openHook={[showChangeMuteModal, setShowChangeMuteModal]}
          selectedMembers={members.filter((member: any) =>
            selectedRows.includes(member.id)
          )}
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
                        rounded-lg border border-gray-300 focus:ring-yellow-400
                        focus:border-yellow-400"
            placeholder="Filter"
          />
          {selectedRows.length > 0 ? (
            <div className="flex gap-1">
              <button
                type="button"
                className="button"
                onClick={() => setShowChangeMuteModal(true)}
                style={{ backgroundColor: "#EAB308" }}
              >
                Change Mute
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
              accent="yellow"
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
