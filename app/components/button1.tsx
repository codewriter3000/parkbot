import { React } from 'React';

function Button1(prop){
    return (
        <button type="button" className="inline-block px-6 py-2.5
        bg-indigo-600
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
        ease-in-out">{prop.text}</button>
    );
}

export default Button1;