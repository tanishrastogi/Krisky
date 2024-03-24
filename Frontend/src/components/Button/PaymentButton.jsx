import React from "react";

const PaymentButton = (props)=>{
    const {amount} = props;
    const checkOutHandler = async()=>{
        const rpay_key = await fetch("http://localhost:3000/api/user/payments/get-key" , {
            method:"get",
            headers:{
                "content-type":'application/json'
            },
            credentials: 'include',
        })
        const key = await rpay_key.json();
        const data = await fetch("http://localhost:3000/api/user/payments/make-payment" , {
          method:"post",
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify({amount:amount})
        })

        const payment = await data.json();
        console.log(payment);
        const options = {
          key,
          amount,
          currency:"INR",
          name:"Charlie",
          description:"Krisksy",
          image:"",
          order_id:payment.data,
          callback_url:"http://localhost:3000/api/user/payments/verify-payment",
          prefill:{
            name:"Tanish Rastogi",
            email:"charliefernandis28@gmail.com",
            contact:"7393819465",
            
          },
          notes:{
            "address":"abcdefghijkl"
          },
          theme:{
            "color":"#3399cc"
          }

        }
        console.log(options)

        const razor = new window.Razorpay(options , function(err , option){
          if(err){
            console.log("line53 "+err)
          }
          else{
            console.log(option)
          }
        });

        razor.open();


        
      }
    return ( <div>
        <button onClick={checkOutHandler}>payment</button>
    </div>
    );
}

// export default PaymentButton;


