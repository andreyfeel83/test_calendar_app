interface CalendarData {
  date: Date
  year: number
  month: string
  days: number
  firstDayOfMonthIndex: number
  prevMonthLastDay: number
  today: Date
}

export const getCalendarData = (date = new Date()): CalendarData => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    
  return {
    date,
    year: date.getFullYear(),
    month: date.toLocaleString('ru-RU', { month: 'long' }),
    days: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
    firstDayOfMonthIndex: (firstDay.getDay() + 6) % 7,
    prevMonthLastDay: new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
    today: new Date
  }
}
