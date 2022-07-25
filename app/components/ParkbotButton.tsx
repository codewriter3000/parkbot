import type { ButtonHTMLAttributes, DetailedHTMLProps, FunctionComponent } from 'react';

type ParkbotButtonProps = {
    text: string,
    bgcolor?: string,
    action?: any,
    dataBsToggle?: any,
    dataBsTarget?: string,
}

export const ParkbotButton: FunctionComponent<ParkbotButtonProps> = ({text, bgcolor = "bg-green-700", action = () => {}, dataBsToggle, dataBsTarget}: ParkbotButtonProps) => <button type="button"
className={`inline-block px-6 py-2.5` + ` ${bgcolor} ` + `
text-white
rounded
shadow-md
hover:bg-slate-700
hover:shadow-lg
active:bg-slate-900
active:shadow-lg
transition`} onClick={action}
>{ text }</button>