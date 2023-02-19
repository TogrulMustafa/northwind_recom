import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";
import { Switch, Route } from "react-router-dom";
import CartList from "../cart/CartList";
import NotFound from '../common/NotFound'
import AddOrUpdateProduct from "../product/AddOrUpdateProduct";



function App() {
  return (
    <div>
      <Container>
        <Navi/>
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/cart' component={CartList}/>
            <Route exact path='/saveproduct/:productId' component={AddOrUpdateProduct}/>
            <Route exact path='/saveproduct' component={AddOrUpdateProduct}/>
            <Route component={NotFound}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
