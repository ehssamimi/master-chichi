import React, {Component} from 'react';
// import ReactDOM from 'react-dom'
import Files from 'react-files'
// import FormGroup from "reactstrap/src/FormGroup";
// import Label from "reactstrap/src/Label";
import IntlMessages from "../../../../../helpers/IntlMessages";
// import {Field} from "formik";
import {
    FormGroup,
    Label,
} from "reactstrap";
class MultiFiles extends Component {
    constructor (props) {
        super(props)
        this.state = {
            files: [],imagFile:[]
        }
    }


    onFilesChange = (files) => {
        let index; let imagFile=[]


        function getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }


        //
        for (index in files) {

            // let id=files[index].id;

            getBase64(files[index]).then(
                data => {
                    // console.log(id);
                    imagFile.push( {
                        // id: files[index].id,
                        img: data
                    })
                }
            );


        }
        this.setState({
            files,imagFile
        }, () => {
            // console.log(this.state.files)
        });
        this.props.MultiFile(imagFile)
    };

    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    };

    filesRemoveAll = () => {
        this.refs.files.removeFiles()
    };
    handelDeleteItem( id ){
        console.log(id);
        this.state.files.map((file,index) =>{if(file.id===id){
            // let ID=file.id.replace('files-','');
            // console.log(ID);
            let files=this.state.files;
            files.splice(index,1);
           this.setState({
               files
           });
        }});
    }
    render() {
        return (

            <div className='w-100' dir='rtl'>

                <FormGroup className="form-group has-float-label position-relative " >
                    <Label>
                        <IntlMessages id="گالری" />
                    </Label>
                    <Files
                        ref='files'
                        className='form-control fontSizeInputText'
                        onChange={this.onFilesChange}
                        onError={this.onFilesError}
                        accepts={['image/*']}
                        multiple
                        clickable={true}
                        dragable={true}
                    >

                    </Files>
                    {
                        this.state.files.length > 0
                            ? <div className='files-gallery d-flex flex-wrap '>
                                {this.state.files.map((file) =>
                                    <img className='files-gallery-item col-4 mt-1' src={file.preview.url} key={file.id} id={file.id} onClick={this.handelDeleteItem.bind(this, file.id)} />
                                )}
                            </div>
                            : <div className='d-flex justify-content-start'>کلیک کنید! </div>
                    }
                    <div className='btn btn-danger mt-2 col-2 text-small float-right' onClick={this.filesRemoveAll}>پاک کردن عکس ها  </div>
                </FormGroup>
                {/*<h1>عکس های گالری خود را وارد کنید</h1>*/}
{/*<div className='flex-wrap'></div>*/}
            </div>



        );
    }
}

export default MultiFiles;