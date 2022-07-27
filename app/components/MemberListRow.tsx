import type { FunctionComponent } from "react";
import { useState } from "react";

type MemberListRowProps = {
    key: number
    nickname: string,
    username: string,
    userID: string,
    onSelect: () => void,
    onDeselect: () => void,
    accent: string,
}

export const MemberListRow: FunctionComponent<MemberListRowProps> = 
({onSelect, onDeselect, nickname, username, userID, accent}: MemberListRowProps) => {
    const [checkboxSelected, setSelection] = useState(false);

  const handleCheckbox = () => {
    setSelection(!checkboxSelected);
    if (!checkboxSelected) {
      onSelect();
    } else {
      onDeselect();
    }
  };

  return (
    <tr
      className={
        checkboxSelected
          ? "bg-slate-200 hover:bg-slate-300 hover:cursor-pointer"
          : "hover:bg-slate-100 hover:cursor-pointer"
      }
      onClick={handleCheckbox}
    >
        {accent === "green" ? 
            <td className="border border-slate-300 pl-3 py-1">
                <input type="checkbox" className="text-green-700 focus:ring-green-700" checked={checkboxSelected} onChange={handleCheckbox} />
            </td>
        : accent === "yellow" ?
            <td className="border border-slate-300 pl-3 py-1">
                <input type="checkbox" className="text-yellow-400 focus:ring-yellow-400" checked={checkboxSelected} onChange={handleCheckbox} />
            </td>
        : accent === "red" ?
            <td className="border border-slate-300 pl-3 py-1">
                <input type="checkbox" className="text-red-600 focus:ring-red-600" checked={checkboxSelected} onChange={handleCheckbox} />
            </td>
        : <></>}
        <td className="border border-slate-300 pl-3 py-1">{nickname}</td>
        <td className="border border-slate-300 pl-3 py-1">{username}</td>
        <td className="border border-slate-300 pl-3 py-1">{userID}</td>
    </tr>
  );
};
