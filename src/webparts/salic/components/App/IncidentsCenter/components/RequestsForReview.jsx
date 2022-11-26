import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../App';
import HistoryNavigation from "../../Global/HistoryNavigation/HistoryNavigation";

const RequestsForReview = () => {
  const { user_data, defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();

  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/incidents-center`)}>Risk Center</a>
        <p>Requests For Review</p>
      </HistoryNavigation>

      <div className='standard-page'>
        RequestsForReview
      </div>

    </>
  )
}



export default RequestsForReview