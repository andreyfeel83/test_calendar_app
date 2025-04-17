import { Calendar } from '../calendar/Calendar'
import cl from './Layout.module.css'

export const Layout = () => {
  return (
    <div className={cl.container}>
      <Calendar/>
    </div>
  )
}
