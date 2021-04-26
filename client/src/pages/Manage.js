import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';
import Axios from "axios";
import { withRouter } from "react-router-dom";

Axios.defaults.withCredentials = true;



const columns = [
    { key:'ID', name:'ID'},
    { key: 'Name', name: 'Name' },
    { key: 'Professional Development Total Hours', name: 'Professional Development Total Hours' },
    { key: 'Scholarly Activity Total Hours', name: 'Scholarly Activity Total Hours' } 
];


class ManageSite extends Component {
    constructor() {
        super();

        this.state = {
          record_list:[]
        }
    }

    

    async componentDidMount() {

 var response = await fetch("http://localhost:3001/getAllRecord");
        var newList = await response.json();
        this.setState({
            record_list: newList
        });

        console.log(this.state.record_list)
    }

    redirectToIndividual = (id,name) => {
        const { history } = this.props;
        if(history) history.push('/individual',{ user_id: id, name: name });
       }

    render() {
        return (
            <div>
            <ReactDataGrid
                rows={this.state.record_list}
                columns={columns}
                onRowClick={rowid=>this.redirectToIndividual(this.state.record_list[rowid].ID,this.state.record_list[rowid].Name)} 
                rowGetter={i => this.state.record_list[i]}
                rowsCount={this.state.record_list.length}
                minHeight={150} 
                />
</div>
        );
    }
}


export default withRouter(ManageSite);
