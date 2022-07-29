import { useState } from 'react'
import { Listbox } from '@headlessui/react'

const timeUnits = [
  { id: 1, name: 'Minutes' },
  { id: 2, name: 'Hours' },
  { id: 3, name: 'Days' },
  { id: 4, name: 'Weeks' },
]

export default function TimeUnitDropdown() {
  const [selectedTimeUnit, setSelectedTimeUnit] = useState(timeUnits[0])

  return (
    <Listbox value={selectedTimeUnit} onChange={setSelectedTimeUnit}>
      <Listbox.Button>{selectedTimeUnit.name}</Listbox.Button>
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
    </Listbox>
  )
}