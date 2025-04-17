import cl from './Calendar.module.css'
import avatar from '../../assets/avatar.svg'
import arrow from '../../assets/arrow.svg'
import { getCalendarData } from '../../utils/getCalendarData'
import { useState } from 'react'
import { classNames } from '../../utils/classNames'

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  const { days, month, year, firstDayOfMonthIndex, prevMonthLastDay, today } =
    getCalendarData(currentDate)

  const getPrevMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() - 1)
    setCurrentDate(newDate)
  }

  const getNextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + 1)
    setCurrentDate(newDate)
  }

  const getNow = () => {
    const now = new Date()
    setCurrentDate(now)
    setSelectedDate(now) 
  }

  const handleDayClick = (date: Date) => {
    setSelectedDate(date)
  }

  const emptyDays = Array.from({ length: firstDayOfMonthIndex }, (_, index) => {
    const day = prevMonthLastDay - firstDayOfMonthIndex + index + 1
    return (
      <div
        key={`prev-${index}`}
        className={classNames(cl.day, cl.another_month_day)}>
        {day}
      </div>
    )
  })

  const currentMonthDays = Array.from({ length: days }, (_, index) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      index + 1
    )
    const isToday =
      !selectedDate && date.toDateString() === today.toDateString()
    const isSelected = selectedDate?.toDateString() === date.toDateString()

    return (
      <div
        key={`curr-${index}`}
        className={classNames(
          cl.day,
          isToday ? cl.today : '',
          isSelected ? cl.selected : ''
        )}
        onClick={() => handleDayClick(date)}>
        {index + 1}
      </div>
    )
  })

  const totalRenderedDays = emptyDays.length + currentMonthDays.length
  const nextMonthDaysCount =
    (totalRenderedDays <= 35 ? 35 : 42) - totalRenderedDays

  const nextMonthDays = Array.from(
    { length: nextMonthDaysCount },
    (_, index) => {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        index + 1
      )
      return (
        <div
          key={`next-${index}`}
          className={classNames(cl.day, cl.another_month_day)}>
          {date.getDate()}
        </div>
      )
    }
  )

  return (
    <div className={cl.container}>
      <div className={cl.header}>
        <p className={cl.header__date}>
          {month} {year}
        </p>
        <div className={cl.header__controls}>
          <img
            className={cl.header__controls_avatar}
            src={avatar}
            alt="avatar"
          />
          <div className={cl.header__controls_buttons}>
            <button
              className={classNames(cl.header__controls_button, cl.button_left)}
              onClick={getPrevMonth}>
              <img
                src={arrow}
                alt="arrow left"
              />
            </button>
            <button
              className={cl.header__controls_button}
              onClick={getNextMonth}>
              <img
                src={arrow}
                alt="arrow right"
              />
            </button>
            <button
              onClick={getNow}
              className={classNames(
                cl.header__controls_button,
                cl.button_right
              )}>
              Сегодня
            </button>
          </div>
        </div>
      </div>

      <div className={cl.days}>
        {daysOfWeek.map(day => (
          <div
            key={day}
            className={classNames(cl.day, cl.week_day)}>
            {day}
          </div>
        ))}
      </div>

      <div className={cl.days}>
        {[...emptyDays, ...currentMonthDays, ...nextMonthDays]}
      </div>
    </div>
  )
}
