import type { FunctionComponent } from 'react';

type ParkbotButtonProps = {
    text: string,
    bgcolor?: string
}

export const ParkbotButton: FunctionComponent<ParkbotButtonProps> = ({text, bgcolor = "indigo-600"}: ParkbotButtonProps) => <button type="button" className={`inline-block px-6 py-2.5
bg-` + `${bgcolor} ` + `
text-white
font-medium
text-md
leading-tight
rounded
shadow-md
hover:bg-slate-700
hover:shadow-lg
focus:bg-slate-900
focus:shadow-lg
focus:outline-none
focus:ring-0
active:bg-slate-900
active:shadow-lg
transition
duration-150
ease-in-out`}>{ text }</button>