import type { FunctionComponent } from 'react';

type MemberListRowProps = {
    key: string
    nickname: string,
    username: string,
    userID: string
}

export const MemberListRow: FunctionComponent<MemberListRowProps> = ({nickname, username, userID}: MemberListRowProps) => 
    // <div className="columns-3 text-center">
    //     <div className="basis-1/3 border-solid border-2">{nickname}</div>
    //     <div className="basis-1/3 border-solid border-2">{username}</div>
    //     <div className="basis-1/3 border-solid border-2">{userID}</div>
    // </div>
    <tr className="hover:bg-slate-100 hover:cursor-pointer" onClick={() => {
        console.log({nickname});
    }}>
        <td className="border border-slate-300 pl-3 py-1">{nickname}</td>
        <td className="border border-slate-300 pl-3 py-1">{username}</td>
        <td className="border border-slate-300 pl-3 py-1">{userID}</td>
    </tr>