'use client'
import { TimePicker } from 'react-time-picker'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField'

export function ResponsiveTimePickers() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MultiInputTimeRangeField
                defaultValue={[
                    dayjs('2022-04-17T15:30'),
                    dayjs('2022-04-17T18:30'),
                ]}
            />
        </LocalizationProvider>
    )
}
