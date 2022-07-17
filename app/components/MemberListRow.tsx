import { RemixBrowser } from '@remix-run/react';
import { FunctionComponent, useState } from 'react';

type MemberListRowProps = {
    key: string
    nickname: string,
    username: string,
    userID: string
}

export const MemberListRow: FunctionComponent<MemberListRowProps> = ({nickname, username, userID}: MemberListRowProps) => {
    const [checkboxSelected, setSelection] = useState(false);

    const handleChange = () => {
        setSelection(!checkboxSelected);
    };
    
    return <tr className={checkboxSelected ? "bg-slate-200 hover:bg-slate-300 hover:cursor-pointer" : "hover:bg-slate-100 hover:cursor-pointer"} onClick={() => {
        console.log({nickname});
    }}>
        <td className="border border-slate-300 pl-3 py-1">
            <input type="checkbox" checked={checkboxSelected} onChange={handleChange} />
        </td>
        <td className="border border-slate-300 pl-3 py-1">{nickname}</td>
        <td className="border border-slate-300 pl-3 py-1">{username}</td>
        <td className="border border-slate-300 pl-3 py-1">{userID}</td>
    </tr>
}