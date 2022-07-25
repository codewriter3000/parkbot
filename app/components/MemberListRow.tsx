import { RemixBrowser } from '@remix-run/react';
import { FunctionComponent, ReactEventHandler, useState } from 'react';

type MemberListRowProps = {
    key: number
    nickname: string,
    username: string,
    userID: string,
    onSelect: () => void,
    onDeselect: () => void
}

export const MemberListRow: FunctionComponent<MemberListRowProps> = ({onSelect, onDeselect, nickname, username, userID}: MemberListRowProps) => {
    const [checkboxSelected, setSelection] = useState(false);

    const handleCheckbox = () => {
        setSelection(!checkboxSelected);
        if(!checkboxSelected){
            onSelect();
        } else {
            onDeselect();
        }
    };
    
    return <tr className={checkboxSelected ? 
        "bg-slate-200 hover:bg-slate-300 hover:cursor-pointer" : 
        "hover:bg-slate-100 hover:cursor-pointer"} 
        onClick={handleCheckbox}
    >
        <td className="border border-slate-300 pl-3 py-1">
            <input type="checkbox" checked={checkboxSelected} onChange={handleCheckbox} />
        </td>
        <td className="border border-slate-300 pl-3 py-1">{nickname}</td>
        <td className="border border-slate-300 pl-3 py-1">{username}</td>
        <td className="border border-slate-300 pl-3 py-1">{userID}</td>
    </tr>
}