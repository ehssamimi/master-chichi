import React, {Component} from 'react';
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "react-persian-calendar-date-picker";
import { Calendar } from "react-persian-calendar-date-picker";




class PersianClassCalender extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedDay:null
        }
    }

    static getDerivedStateFromProps(props, state) {
        // console.log('birthDay');
        // console.log(props.birthDay);
        if (props.birthDay !== state.selectedDay && props.birthDay!==undefined) {
            // console.log(props.birthDay);
            let Birth=  props.birthDay.split("/");
            return {
                selectedDay: {day: Number(Birth[2]), month: Number(Birth[1]), year: Number(Birth[0])}

            };
        }
        // Return null if the state hasn't changed
        return null;
    }
    setSelectedDay(selectedDay){
        // console.log(selectedDay)

        this.setState({
            selectedDay
        });
        // console.log(selectedDay);
        this.props.GetData(selectedDay);
    }

    render() {
        const renderCustomInput = ({ ref, onFocus, onBlur }) => (
            <input
                readOnly
                ref={ref} // necessary
                onFocus={onFocus} // necessary
                onBlur={onBlur} // necessary
                placeholder="تاریخ"
                value={this.state.selectedDay ? `${this.state.selectedDay.year}/${this.state.selectedDay.month}/${this.state.selectedDay.day}`: ''}
                style={{
                    textAlign: 'center',
                    // padding: '1rem 1.2rem',
                    fontSize: '1.2rem',
                    border: '0.2px solid #a0a0a0',
                    // borderRadius: '100px',
                    // boxShadow: '0 1.5rem 2rem rgba(156, 136, 255, 0.2)',
                    color: '#922c88',
                    // color: '#a0a0a0',
                    // outline: 'none',
                    // width:'100%'
                    lineHeight:'2em',
                }}
                className="calenderPersiona w-100" // a styling class
            />
        );
        let{selectedDay}=this.state;
        return (
            <div >
                <DatePicker

                    selectedDay={selectedDay}
                    onChange={date => this.setSelectedDay(date)}
                    inputPlaceholder="انتخاب روز"
                    color="primary"
                    renderInput={renderCustomInput}
                    // calendarClassName={}
                />
            </div>

        );
    }
}

export default PersianClassCalender;