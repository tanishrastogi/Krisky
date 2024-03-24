import { Input, Button } from "../../components/index.ts";
import style from './TrackOrder.module.css'

const TrackOrder = () => {
  return (
    <div className={style.Body}>
      <div className={style.CenterBody}>
        <h2 className={style.heading}>Track Your Order!</h2>
        <p className={style.content}>Enter your email and the Order ID received (Check your mails).</p>
        <div className={style.Input}>
          <Input
            style={{ marginTop: "5px" }}
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className={style.Input}>
          <Input
            style={{ marginTop: "5px" }}
            label="Order ID"
            type="text"
            placeholder="Enter Order ID"
          />
        </div>

        <Button
          className={style.button}
          style={{ backgroundColor: "#131313", color: "white" }}
          type="submit"
        >
          Track Order
        </Button>
      </div>
    </div>
  )
}

export default TrackOrder