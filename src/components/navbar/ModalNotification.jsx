/* eslint-disable */

const ModalNotification = () => {
    return (
        <>
                  <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-neutral shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </>
    )
}

export default ModalNotification;