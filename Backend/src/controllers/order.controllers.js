import { Order } from "../models/order.models.js";
import { Product } from "../models/product.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const addOrder = async (req, res) => {
    const { userID, qty, productID, paymentMethod ,addressID} = req.body;
    /*
    * in case of buying from cart :
    * no value will be given to variable 'qty' and instead
    * productID will be an array of objects containing id and qty 
    * 
    * sample obj:
    * const productID  = { productID:<id> , qty:<Number> }
    */
    try {
        const user = await User.findOne({ _id: userID })
        if (!user) throw new ApiError(404, "user not found")

        if (typeof (productID) === 'object') {
            const order = new Order({
                customer: userID,
                orderItems: [],
                paymentMethod: paymentMethod,
                address: addressID
            })
            await order.save()
            productID.forEach(async (item) => {
                const product = await Product.findOne({ _id: item['productID'] });
                if (!product) return new ApiResponse(404, "product not found");
                const update = await Order.findOne({ _id: order._id })
                update.orderPrice += product.price;
                update.orderItems.push(item)
                await update.save();
            })
            const id = order._id;
            user.orders.push(id);
            await user.save();
            res.json(new ApiResponse(200, user._id, "order placed!"));
        }
        else if (typeof (productID) === 'string') {
            const product = await Product.findOne({ _id: productID });
            if (!product) return new ApiResponse(404, "Product not found");
            const order = new Order({
                customer: userID,
                orderItems: {
                    productId: productID,
                    quantity: qty
                },
                paymentMethod,
                address: addressID,
                orderPrice: product.price
            })
            await order.save();
            user.orders.push(order._id);
            await user.save();
            res.json(new ApiResponse(200, user._id, "order placed!"));
        }
        else {
            res.json(new ApiError(400, "invalid product type"))
        }
    }
    catch (err) {
        throw new ApiError(400, "error", err.message)
    }
}


const orderTracking = async (req, res) => {
    const { email, orderID } = req.body;
    try {
    
        const user = await User.findOne({ email: email });

        if (!user) return res.json(new ApiResponse(404, "No user exists with this email"))
        if (!user.orders.includes(orderID)) return res.json(new ApiResponse(404, "no order found with this order id."))

        const order = await Order.findOne({ _id: orderID })
        return res.json(new ApiResponse(200, order, "order fetched successfully"));
    
    }
    catch (err) {
        return res.json(new ApiError(400, err.message));
    }

}



export {
    addOrder,
    orderTracking
};
