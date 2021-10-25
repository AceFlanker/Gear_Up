import React from "react";
import Sidebar from "./Sidebar";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Help from "../../pages/Help";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import "./SidebarApp.css"
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

const Pages = styled.div`
  width: 100vw;
  height: 100vh;
`;

function SidebarApp() {
  return (
    <>
      <Router>
        <Sidebar />
        {/* <Pages>
          <AnimatePresence exitBeforeEnter>
            <Switch >
              <Route exact path="/" component={Home} />
              <Route path="/help" component={Help} />
              <Route path="/about" component={About} />
            </Switch>
          </AnimatePresence>
        </Pages> */}
      </Router>
    </>
  );
}

export default SidebarApp;