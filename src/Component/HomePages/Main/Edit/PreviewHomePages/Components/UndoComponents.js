import React, {Component} from 'react';

class UndoComponents extends Component {
    hanelundo(){
        this.props.handelDeleteUndo(this.props.id)
    }

    render() {
        return (
            <div>
                <h3 onClick={this.hanelundo.bind(this)} className='alert alert-primary'>this item was deleted</h3>
            </div>
        );
    }
}

export default UndoComponents;