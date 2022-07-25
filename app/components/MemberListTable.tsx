import { FunctionComponent, useState } from "react";
import BanModal from "./BanModal";
import { MemberListRow } from "./MemberListRow";
import MuteModal from "./MuteModal";
import UnbanModal from "./UnbanModal";

type MemberListTableProps = {
    members: Array<Object>,
    accentColor: string,
    tableType: string,
}

export const MemberListTable: FunctionComponent<MemberListTableProps> = (
{members, accentColor, tableType}: MemberListTableProps) => {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const [showMuteModal, setShowMuteModal] = useState(false);
    const [showChangeMuteModal, setShowChangeMuteModal] = useState(false);
    const [showBanModal, setShowBanModal] = useState(false);
    const [showUnbanModal, setShowUnbanModal] = useState(false);
    
    return  <>
                {showMuteModal ? <MuteModal /> : <></>}
                {showBanModal ? <BanModal /> : <></>}
                {showUnbanModal ? <UnbanModal /> : <></>}
                <div>
                    {accentColor === "green" ? 
                        <div className="flex gap-1">
                            <input type="search" id="default-search" 
                            className="inline-block text-sm text-gray-900 bg-gray-50 
                            rounded-lg border border-gray-300 focus:ring-green-700 
                            focus:border-green-700"
                            placeholder="Search for Username" />
                            <button type="button" className="button">
                                <svg aria-hidden="true" className="w-5 h-5 text-white"
                                fill="none" stroke="currentColor" 
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" 
                                    strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    : accentColor === "yellow" ?
                        <div className="flex gap-1">
                            <input type="search" id="default-search" 
                            className="inline-block text-sm text-gray-900 bg-gray-50 
                            rounded-lg border border-gray-300 focus:ring-yellow-400 
                            focus:border-yellow-400"
                            placeholder="Search for Username" />
                            <button type="button" className="button" style={{backgroundColor: "#EAB308"}}>
                                <svg aria-hidden="true" className="w-5 h-5 text-white"
                                fill="none" stroke="currentColor" 
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" 
                                    strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    : accentColor === "red" ?
                        <div className="flex gap-1">
                            <input type="search" id="default-search" 
                            className="inline-block text-sm text-gray-900 bg-gray-50 
                            rounded-lg border border-gray-300 focus:ring-red-600 
                            focus:border-red-600"
                            placeholder="Search for Username" />
                            <button type="button" className="button" style={{backgroundColor: "#DC2626"}}>
                                <svg aria-hidden="true" className="w-5 h-5 text-white"
                                fill="none" stroke="currentColor" 
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" 
                                    strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    : <></>
                    }
                </div>
                <table className="table-auto border-collapse border border-slate-500">
                    <thead>
                        <tr>
                            <th className="border border-slate-300 pl-3 py-2 text-left"></th>
                            <th className="border border-slate-300 pl-3 py-2 text-left">Nickname</th>
                            <th className="border border-slate-300 pl-3 py-2 text-left">Username</th> 
                            <th className="border border-slate-300 pl-3 py-2 text-left">User ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((user: any, index) => (
                            tableType === "members" ?
                                <MemberListRow key={index}
                                nickname={user.nickname}
                                username={user.username}
                                userID={user.userID}
                                accent="green"
                                onSelect={() => setSelectedRows([...selectedRows, user.username])}
                                onDeselect={() => setSelectedRows(
                                    selectedRows.filter(row => row !== user.username)
                                )} />
                            : tableType === "muted" ?
                                <MemberListRow key={index}
                                nickname={user.nickname}
                                username={user.username}
                                userID={user.userID}
                                accent="yellow"
                                onSelect={() => setSelectedRows([...selectedRows, user.username])}
                                onDeselect={() => setSelectedRows(
                                    selectedRows.filter(row => row !== user.username)
                                )} />
                            : tableType === "banned" ?
                                <MemberListRow key={index}
                                nickname={user.nickname}
                                username={user.username}
                                userID={user.userID}
                                accent="red"
                                onSelect={() => setSelectedRows([...selectedRows, user.username])}
                                onDeselect={() => setSelectedRows(
                                    selectedRows.filter(row => row !== user.username)
                                )} />
                            : <></>
                        ))}
                    </tbody>
                </table>
                {selectedRows.length === 0 ? <></> : 
                <>
                    {tableType === "members" ? 
                        <div className="flex gap-1">
                            <button type="button" className="button" onClick={() => setShowMuteModal(true)}
                                style={{backgroundColor: "#EAB308"}}>Mute</button>
                            <button type="button" className="button" onClick={() => setShowBanModal(true)}
                                style={{backgroundColor: "#DC2626"}}>Ban</button>
                        </div>
                    : tableType === "muted" ?
                        <div className="flex gap-1">
                            <button type="button" className="button" onClick={() => setShowChangeMuteModal(true)}
                                style={{backgroundColor: "#EAB308"}}>Change Mute</button>
                            <button type="button" className="button" onClick={() => setShowBanModal(true)}
                                style={{backgroundColor: "#DC2626"}}>Ban</button>
                        </div>
                    : tableType === "banned" ?
                        <div className="flex gap-1">
                            <button type="button" className="button" onClick={() => setShowUnbanModal(true)}
                                style={{backgroundColor: "#DC2626"}}>Unban</button>
                        </div>
                    : <></>
                    }
                </>
                }
            </>
}