import React from 'react';
import ListMusicComponent from '../music/ListMusicComponent';
import EditMusicComponent from '../music/EditMusicComponent';
import AddMusicComponent from '../music/AddMusicComponent';
import {BrowserRouter, Route} from 'react-router-dom';
const RouterComponent = () => {
    return (
        <div>
        <BrowserRouter>
            <div style={style}>
            <Route path="/" exact={true} component={ListMusicComponent} />
            <Route path="/music" exact={true} component={ListMusicComponent} />
            <Route path="/add-music" exact={true} component={AddMusicComponent} />
            <Route path="/edit-music" exact={true} component={EditMusicComponent} />
            </div>
        
        </BrowserRouter>     
        </div>
    );
};
const style= {
    margin : '10px'

}
export default RouterComponent;