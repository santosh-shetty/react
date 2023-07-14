import React from 'react'
import { ReactComponent as Notification } from '../../Icons/DashboardIcons/Notification.svg'

const Notifications = () => {
  return (
    <>
     <p className='sectionTitle'>
        <Notification className='activeIcon' />
        Notifications
    </p>
    <div className='p20'></div>
    <div className='userDetailsBlock'>
      <div className='scrollTable'>
      <table className='stripTable'>
        <tbody>
          <tr>
            <td>
              <p>1.</p>
            </td>
            <td>
              <p>Lorem ipsum dolor sit amet</p>
              </td>
            <td>
              <p>17 April 2023 10:14 AM</p>
              </td>
          </tr>
          <tr>
            <td>
              <p>2.</p>
            </td>
            <td>
              <p>Lorem ipsum dolor sit amet</p>
              </td>
            <td>
              <p>17 April 2023 10:14 AM</p>
              </td>
          </tr>
          <tr>
            <td>
              <p>3.</p>
            </td>
            <td>
              <p>Lorem ipsum dolor sit amet</p>
              </td>
            <td>
              <p>17 April 2023 10:14 AM</p>
              </td>
          </tr>
          <tr>
            <td>
              <p>4.</p>
            </td>
            <td>
              <p>Lorem ipsum dolor sit amet</p>
              </td>
            <td>
              <p>17 April 2023 10:14 AM</p>
              </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
    </>
  )
}

export default Notifications