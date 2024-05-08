import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart } from "../../redux/actions/cartAction";

const SuccessPage = ({ success }) => {
   
   const { orderId } = useParams();

   const dispatch = useDispatch();
   const { user } = useSelector(state => state.authReducer);

   if (success) {
      dispatch(deleteCart(user?.id));
      return <div className="card-flex-center">
         Your Order : {orderId} is successful.
      </div>
   }
   return <div className="card-flex-center">
         Your order : {orderId} has been failed. Please try again. 
      </div>
}

export default SuccessPage;