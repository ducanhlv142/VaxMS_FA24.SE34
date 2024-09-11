import Headers from "../header/header";
import Footer from "../footer/footer"
import ChatFrame from "../../../pages/customer/chat"

function DefaultLayout({children}){
    return (
        <div>
            <Headers/>
            <div className="main-content-web">
            {children}
            </div>
            <Footer/>
            <ChatFrame/>
        </div>
    );
}

export default DefaultLayout;