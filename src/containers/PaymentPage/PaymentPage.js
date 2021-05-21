import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import OutstandingInvoice from '../../components/OutstandingInvoice/OutstandingInvoice';
import SpinnerDots from '../../components/SpinnerDots/SpinnerDots';

import { fetchOrderHistory } from '../../store/actions/orderHistory';
import './PaymentPage.scss';

const PaymentPage = ({
  orderHistory,
  fetchOrderHistory,
  userId,
  isOrderHistoryLoading,
}) => {
  useEffect(() => {
    //fetch order history if missing (direct access to /payment)
    if (userId && orderHistory.length === 0) {
      fetchOrderHistory(userId);
    }
  }, [fetchOrderHistory, userId, orderHistory]);

  const anyOutstandingInvoices = () => {
    return orderHistory.some((order) => order.orderTotal.paid === false);
  };
  const outstandingInvoices = () => {
    return orderHistory
      .filter((order) => order.orderTotal.paid === false)
      .map(({ ticketId, createdAt, orderTotal: { total }, orderId }, i) => (
        <OutstandingInvoice
          key={i}
          ticketId={ticketId}
          createdAt={createdAt}
          total={total}
          orderId={orderId}
          userId={userId}
          orderHistory={orderHistory}
        />
      ));
  };
  return (
    <div className='PaymentPage'>
      <div className='PaymentPage__summary'>
        <h2>Your outstanding invoices </h2>
        {isOrderHistoryLoading ? (
          <SpinnerDots />
        ) : (
          <div className='PaymentPage__outstandingInvoices'>
            {anyOutstandingInvoices() ? (
              outstandingInvoices()
            ) : (
              <div>{`${
                orderHistory.length > 0
                  ? 'All your invoices are paid in full'
                  : 'No records found'
              } `}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ orderHistory, auth }) => ({
  orderHistory: orderHistory.orderHistory,
  isOrderHistoryLoading: orderHistory.loading,
  userId: auth.currentUser?.id,
});

export default connect(mapStateToProps, { fetchOrderHistory })(PaymentPage);
