import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Drawer, Button } from "antd";
import logo from "../../assets/yard-sale.jpg";

const CartDrawer = () => {
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const showDrawer = () => {
    dispatch({
      type: "SET_VISIBLE",
      payload: true,
    });
  };

  const closeDrawer = () => {
    dispatch({
      type: "SET_VISIBLE",
      payload: false,
    });
  };

  return (
    <>
      {/* <Button className="float-right" type="danger" onClick={showDrawer}>
        {cart.length}
      </Button> */}
      <Drawer
        visible={drawer}
        title={`${cart.length} Items`}
        width={350}
        zIndex={1500}
        keyboard={true}
        onClose={closeDrawer}
      >
        {cart.map((p) => (
          <div key={p._id} className="row">
            <div className="col mb-3">
              {p.images[0] ? (
                <>
                  <img src={p.images[0].url} width={"100%"} height={"auto"} />
                  <p className="bg-dark text-light">
                    <span className="pl-2">
                      {p.name} x {p.count}
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <img src={logo} width={"100%"} height={"auto"} />
                  <p className="bg-danger text-light">
                    <span className="pl-2">
                      {p.name} x {p.count}
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
        <Link
          to={"/cart"}
          className="btn btn-block btn-primary"
          onClick={closeDrawer}
        >
          Proceed to Cart
        </Link>
      </Drawer>
    </>
  );
};

export default CartDrawer;
