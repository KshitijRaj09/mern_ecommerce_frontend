import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from '../../components/authComponents/LoginModal';
import {
  CartCard,
  MainCartPage,
} from '../../styledComponents/cartDetails.style';
import { Message } from '../../styledComponents/modalBox.style';
import SingleCartDetails from './SingleCartDetails';
import { getCart, localStorageCartToDB } from '../../redux/actions/cartAction';
import { calculateTotalItems } from '../../util/util';
import { Loader } from '../../styledComponents/Loader.style';
const Checkout = lazy(() => import("../checkoutPages/Checkout"));

const CartDetails = () => {
  const { cart, loading } = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id) {
      dispatch(localStorageCartToDB(user?.id));
      dispatch(getCart(user.id));
    }
  }, [user?.id, dispatch]);

  const renderItems = () =>
    cart?.items.map((singleCart) => (
      <SingleCartDetails cartDetails={singleCart} key={singleCart.productId} />
    ));

  return (
    <>
      {!user?.id ? (
        <Message>
          <h3>Please login to Continue</h3>
          <span>
            <LoginModal />
          </span>
        </Message>
      ) : (
        <>
          {cart?.items?.length > 0 ? (
            <MainCartPage>
                <CartCard>{renderItems()}</CartCard>
                <Suspense fallback={<Loader />}>
                  <Checkout
                    totalCartPrice={cart?.bill}
                    totalItems={calculateTotalItems(cart?.items)}
                  />
                </Suspense>
            </MainCartPage>
          ) : (
            <Message>
              <h3>Your Cart is Empty</h3>
            </Message>
          )}
        </>
      )}
    </>
  );
};



export default CartDetails;
