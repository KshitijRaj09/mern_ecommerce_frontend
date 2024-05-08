import { useEffect } from "react";
import { CheckoutCart } from "../../styledComponents/cartDetails.style";
import { StyledButton } from '../../styledComponents/styledButton.style';
import { loadScript } from "../../util/util";
import { useDispatch, useSelector } from "react-redux";
import { checkout } from "../../redux/actions/orderAction";

const Checkout = ({ totalCartPrice, totalItems }) => {
   const dispatch = useDispatch();
   useEffect(() => {
      loadScript("https://checkout.razorpay.com/v1/checkout.js");
   }, []);

   const { user } = useSelector((state) => state.authReducer);
     
   return (
     <CheckoutCart>
       <h4>Total Items : {totalItems} </h4>
       <h4>Total Price : ₹ {totalCartPrice}</h4>
         <StyledButton width='140px' onClick={()=>dispatch(checkout(user?.id, {amount: totalCartPrice}))}>Checkout</StyledButton>
     </CheckoutCart>
   );
};

export default Checkout;