import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import SelectorIcon from '@heroicons/react/outline/SelectorIcon'

const timeUnits = [
  { id: 1, name: 'Minutes' },
  { id: 2, name: 'Hours' },
  { id: 3, name: 'Days' },
  { id: 4, name: 'Weeks' },
]

export default function TimeUnitDropdown() {
  const [selectedTimeUnit, setSelectedTimeUnit] = useState(timeUnits[0])

  return (
    <div className="top-16 w-72">
      <Listbox value={selectedTimeUnit} onChange={setSelectedTimeUnit}>
        <div className="relative w-full mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white 
          py-2 pl-3 pr-10 text-left shadow-md focus:outline-none 
          focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white 
          focus-visible:ring-opacity-75 focus-visible:ring-offset-2 
          focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectedTimeUnit.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex 
            items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options>
              {timeUnits.map((timeUnit) => (
                <Listbox.Option
                  key={timeUnit.id}
                  value={timeUnit}
                >
                  {timeUnit.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
    </Listbox>
    </div>
  )
}