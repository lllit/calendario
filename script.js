const createCalendar = ({ locale, year}) => {
    const weekdays = [...Array(7).keys()]
    const intlWeekDay = new Intl.DateTimeFormat(locale, { weekday: 'short' })

    const el = document.querySelector('div')

    document.getElementById('up').addEventListener('click', () => {
        el.scrollTo({top: el.scrollTop - window.innerHeight, behavior: 'smooth'})     
    })

    document.getElementById('down').addEventListener('click', () => {
        el.scrollTo({top: el.scrollTop + window.innerHeight, behavior: 'smooth'})     
    }) 

    const weekDaysNames = weekdays.map((_,weekDayIndex) => {
        const date = new Date(2024, 3, weekDayIndex + 1)
        const weekDayName = intlWeekDay.format(date)
        return weekDayName
    })

    const renderedWeekDays = weekDaysNames.map
    (weekDayName => `<li class='day-name'>${weekDayName}</li>`).join('')

    const months = [...Array(12).keys()]
    const intl = new Intl.DateTimeFormat(locale, {month: 'long' })

    const calendar = months.map(monthKey => {
        const monthName = intl.format(new Date(year, monthKey))

        const nextMonthIndex = monthKey + 1   
        const daysOfMonth = new Date(year, nextMonthIndex, 0).getDate()

    const startsOn = new Date(year, monthKey, 1).getDay()

    return {
        monthName,
        daysOfMonth,
        startsOn
    }
})

const html = calendar.map(({daysOfMonth, monthName, startsOn}) => {
    const days = [...Array(daysOfMonth).keys()]
    
    const firstDayAttributes = `class='first-day' style='--first-day-start: ${startsOn}'` 

    const renderedDays = days.map((day, index) => 
        `<li ${index == 0 ? firstDayAttributes : ''}>${day + 1}</li>`
    ).join('')

    const title = `<h1>${monthName} ${year}</h1>`

    return `<div class='month'>${title}<ol>${renderedWeekDays} ${renderedDays}</ol></div>`   
}).join('')

el.innerHTML = html
}

createCalendar({year: 2024, locale: 'ja'})