import type { FunctionComponent } from 'react';

type MemberListRowProps = {
    key: string
    nickname: string,
    username: string,
    userID: string
}

export const MemberListRow: FunctionComponent<MemberListRowProps> = ({key, nickname, username, userID}: MemberListRowProps) => 
    <tr>
        <th>{nickname}</th>
        <th>{username}</th>
        <th>{userID}</th>
    </tr>