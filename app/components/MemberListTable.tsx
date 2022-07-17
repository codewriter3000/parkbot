import type { FunctionComponent } from "react";
import { MemberListRow } from "./MemberListRow";

type MemberListTableProps = {
    members: Array<Object>
}

export const MemberListTable: FunctionComponent<MemberListTableProps> = ({members}: MemberListTableProps) => {

    return  <table className="table-auto border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th className="border border-slate-300 pl-3 py-2 text-left"></th>
                        <th className="border border-slate-300 pl-3 py-2 text-left">Nickname</th>
                        <th className="border border-slate-300 pl-3 py-2 text-left">Username</th> 
                        <th className="border border-slate-300 pl-3 py-2 text-left">User ID</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((user: any) => (
                        <MemberListRow key={user.username} nickname={user.nickname} username={user.username} userID={user.userID} />
                    ))}
                </tbody>
            </table>
}