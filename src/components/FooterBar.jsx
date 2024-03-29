import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterCinema = () => {
  return (
    <MDBFooter className="font-small pt-4" style={{color: 'black', backgroundImage: "url(" + "https://www.unpluginfinity.com/wp-content/uploads/2019/02/Unplginfinity-Website-Background.jpg" + ")",flexWrap: 'wrap', fontFamily: 'Bebas Neue, cursive', fontSize: '30px', backgroundPosition: 'center'}}>
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="8" className='container justify-content-space-in-between'>
            <h5 className="title">Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </MDBCol>
          <MDBCol md="4">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 2</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 3</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="/"> AthenaCinema </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterCinema;