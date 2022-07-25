import { FunctionComponent, useState } from "react";
import { MemberListRow } from "./MemberListRow";
import { ParkbotButton } from "./ParkbotButton";

type MemberListTableProps = {
    members: Array<Object>,
    accentColor: string,
    tableType: string,
}

export const MemberListTable: FunctionComponent<MemberListTableProps> = (
    {members, accentColor, tableType}: MemberListTableProps) => {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    
    return  <>
                <div>
                    {accentColor === "purple" ? 
                        <div className="flex gap-1">
                            <input type="search" id="default-search" 
                            className="inline-block text-sm text-gray-900 bg-gray-50 
                            rounded-lg border border-gray-300 focus:ring-green-700 
                            focus:border-green-700"
                            placeholder="Search for Username" />
                            <button className="button">
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
                            <button className="button">
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
                            <button className="button">
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
                            <MemberListRow key={index}
                            nickname={user.nickname}
                            username={user.username}
                            userID={user.userID}
                            onSelect={() => setSelectedRows([...selectedRows, user.username])}
                            onDeselect={() => setSelectedRows(
                                selectedRows.filter(row => row !== user.username)
                            )} />
                        ))}
                    </tbody>
                </table>
                {selectedRows.length === 0 ? <></> : 
                <>
                    {tableType === "members" ? 
                        <div className="flex gap-1">
                            <button className="button" style={{backgroundColor: "#EAB308"}} data-bs-toggle="modal" data-bs-target="#exampleModal">Mute</button>
                            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                                id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog relative w-auto pointer-events-none">
                                    <div
                                    className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                                    <div
                                        className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">Modal title</h5>
                                        <button type="button"
                                        className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                        data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body relative p-4">
                                        Modal body text goes here.
                                    </div>
                                    <div
                                        className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                        <button type="button" className="px-6
                                        py-2.5
                                        bg-green-700
                                        text-white
                                        font-medium
                                        text-xs
                                        leading-tight
                                        uppercase
                                        rounded
                                        shadow-md
                                        hover:bg-purple-700 hover:shadow-lg
                                        focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
                                        active:bg-purple-800 active:shadow-lg
                                        transition
                                        duration-150
                                        ease-in-out" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="px-6
                                    py-2.5
                                    bg-blue-600
                                    text-white
                                    font-medium
                                    text-xs
                                    leading-tight
                                    uppercase
                                    rounded
                                    shadow-md
                                    hover:bg-blue-700 hover:shadow-lg
                                    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                                    active:bg-blue-800 active:shadow-lg
                                    transition
                                    duration-150
                                    ease-in-out
                                    ml-1">Save changes</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <button className="button" style={{backgroundColor: "#DC2626"}}>Ban</button>
                        </div>
                    : tableType === "muted" ?
                        <div className="flex gap-1">
                            <button className="button" style={{backgroundColor: "#EAB308"}}>Change Mute</button>
                            <button className="button" style={{backgroundColor: "#DC2626"}}>Ban</button>
                        </div>
                    : tableType === "banned" ?
                        <div className="flex gap-1">
                            <button className="button" style={{backgroundColor: "#DC2626"}}>Unban</button>
                        </div>
                    : <></>
                    }
                </>
                }
            </>
}